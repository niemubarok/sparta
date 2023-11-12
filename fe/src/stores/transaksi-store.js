import { defineStore } from "pinia";
import { capitalize, ref } from "vue";
import { format } from "quasar";

export const useTransaksiStore = defineStore("transaksi", {
  state: () => ({
    transaksi: [],
    jenisKendaraan: ref(""),
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
  },
});
