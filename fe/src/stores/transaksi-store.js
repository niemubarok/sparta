import { defineStore } from "pinia";
import { capitalize, ref } from "vue";
import { format } from "quasar";
import ls from "localstorage-slim";
import axios from "axios";

export const useTransaksiStore = defineStore("transaksi", {
  state: () => ({
    transaksi: ref([]),
    lokasiPos: ref(ls.get("lokasiPos") || "-"),
    jenisKendaraan: [
      {
        id: "M",
        nama: "Motor",
      },
      {
        id: "C",
        nama: "Mobil",
      },
      {
        id: "D",
        nama: "Truck / Box",
      },
      {
        id: "B",
        nama: "Bajai / Becak",
      },
    ],
    selectedJenisKendaraan: ref(""),
    platNomor: ref(),
    nomorTiket: ref(""),
    isMember: ref(true),
    isCheckedIn: ref(false),
    waktuMasuk: ref(""),
    waktuKeluar: ref(""),
    durasi: ref(0),
    biaya: ref(0),
    bayar: ref(0),
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
    setPlatNomor(platNomor) {
      this.platNomor.value = platNomor.toUpperCase();
    },

    setCheckIn(isCheckedIn) {
      this.isCheckedIn = isCheckedIn;
    },
    async getJenisKendaraan() {
      const localData = ls.get("jenisKendaraan");
      if (localData) {
        this.jenisKendaraan = JSON.parse(localData);
      } else {
        const response = await fetch(process.env.API + "/vehicles/all");
        const data = await response.json();
        console.log(data);
        this.jenisKendaraan = data;
        ls.set("jenisKendaraan", JSON.stringify(data));
      }
    },
    async getTransaksiByNopol(no_pol) {
      const response = await axios.post(
        process.env.API + "/transactions/nopol",
        {
          no_pol: no_pol,
        }
      );
      const data = response.data;
      console.log(data);
      this.transaksi.value = data;
    },

    async getLokasiPos() {
      // const localData = ls.get("lokasiPos");
      // if (localData) {
      //   this.lokasiPos.value = JSON.parse(localData);
      // } else {
      const response = await fetch(process.env.API + "/locations/all");
      const data = await response.json();
      console.log(data);
      // this.lokasiPos.value = data;
      // ls.set("lokasiPos", JSON.stringify(data));
      // }
    },
  },
});
