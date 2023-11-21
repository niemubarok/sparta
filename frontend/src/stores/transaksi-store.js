import { defineStore } from "pinia";
import { capitalize, ref } from "vue";
import { format } from "quasar";
import ls from "localstorage-slim";
import axios from "axios";

export const useTransaksiStore = defineStore("transaksi", {
  state: () => ({
    dataCustomer: ref(""),
    transaksi: ref([]),
    lokasiPos: ref(ls.get("lokasiPos") || "-"),
    jenisKendaraan: [],
    selectedJenisKendaraan: ref(""),
    platNomor: ref(""),
    nomorTiket: ref(""),
    isMember: ref(false),
    isMemberExpired: ref(false),
    isCheckedIn: ref(false),
    waktuMasuk: ref(""),
    waktuKeluar: ref(""),
    durasi: ref(0),
    biayaParkir: ref(0),
    bayar: ref(),
    pic_body_keluar: ref(null),
    // detailTransaksi: ref({
    //   platNomor: ref(""),
    //   nomorTiket: ref(""),
    //   isMember: ref(false),
    // }),
  }),
  actions: {
    setTransaksi(transaksi) {
      this.transaksi = transaksi;
    },
    // setPlatNomor(platNomor) {
    //   this.platNomor.value = platNomor.toUpperCase();
    // },

    setCheckIn(isCheckedIn) {
      this.isCheckedIn = isCheckedIn;
    },
    async getJenisKendaraan() {
      // const localData = ls.get("jenisKendaraan");
      // if (localData) {
      //   this.jenisKendaraan = JSON.parse(localData);
      // } else {
      const response = await fetch(process.env.API_URL + "/vehicles/all");
      const data = await response.json();
      // console.log(data);
      this.jenisKendaraan = data;
      ls.set("jenisKendaraan", JSON.stringify(data));
      // }
    },
    async getTransaksiByNopol(no_pol) {
      // console.log(no_pol);
      const response = await axios.post(
        process.env.API_URL + "/transactions/nopol",
        {
          no_pol: no_pol,
        }
      );
      const data = response.data;
      // console.log(data);
      this.transaksi.value = data;
      return data;
    },

    async getLokasiPos() {
      // const localData = ls.get("lokasiPos");
      // if (localData) {
      //   this.lokasiPos.value = JSON.parse(localData);
      // } else {
      const response = await fetch(process.env.API_URL + "/locations/all");
      const data = await response.json();
      const lokasiPos = data.map((data) => {
        return {
          label: data.nama,
          value: data.id,
          jenis: data.jenis,
        };
      });
      return lokasiPos;
      // console.log(data);
      // this.lokasiPos.value = data;
      // ls.set("lokasiPos", data);
      // }
    },
    async getCustomerByNopol() {
      console.log(this.platNomor);
      const res = await axios.post(process.env.API_URL + "/customers/nopol", {
        no_pol: this.platNomor?.toUpperCase(),
      });

      if (res.data) {
        this.isMember = true;
        this.dataCustomer = res.data;
        console.log(res.data);
        return res.data;
      } else {
        this.isMember = false;
      }

      // return res;
    },

    async getTarifJenisKendaraan() {
      const response = await axios.post(process.env.API_URL + "/prices/type", {
        id_jenis_kendaraan: this.selectedJenisKendaraan?.value,
      });
      const data = response.data[0];
      console.log(data);
      return data;
    },

    async calculateParkingFee(waktuMasuk, waktuKeluar) {
      if (this.isMember && !this.isMemberExpired) {
        return 0;
      } else {
        const tarif = await this.getTarifJenisKendaraan();
        const tarifAwal = parseInt(tarif?.tarif);
        const tarifBerikutnya = parseInt(tarif?.tarif_interval);
        const tarifMaksimal = parseInt(tarif?.maksimum);
        const interval = parseInt(tarif?.interval);

        // Calculate the duration in minutes
        const durationInMinutes = Math.ceil(
          (waktuKeluar - waktuMasuk) / (1000 * 60)
        );
        // console.log("durationInMinutes", durationInMinutes);

        // Calculate the number of additional hours
        const additionalHours = Math.round(
          Math.max(durationInMinutes - interval, 0) / 60
        );
        // console.log("additionalHours", additionalHours);

        // Calculate the additional fee
        let additionalFee = additionalHours * tarifBerikutnya;
        if (additionalFee > tarifMaksimal) {
          additionalFee = tarifMaksimal;
        }

        // console.log("additionalFee", additionalFee);

        // Calculate the total fee and round it
        let totalFee = tarifAwal + additionalFee;
        if (totalFee > tarifMaksimal) {
          totalFee = tarifMaksimal;
        }

        // console.log("maksimal", tarifMaksimal);

        totalFee = Math.round(totalFee);
        this.biayaParkir = totalFee;
        console.log("totalFee", totalFee);
        return totalFee;
      }
    },
  },
});
