import { defineStore } from "pinia";
import { capitalize, ref } from "vue";
import { format } from "quasar";
import ls from "localstorage-slim";

export const useTransaksiStore = defineStore("transaksi", {
  state: () => ({
    transaksi: [],
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
    ],
    selectedJenisKendaraan: ref(""),
    platNomor: ref(),
    nomorTiket: ref(""),
    isMember: ref(false),
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
  },
});
