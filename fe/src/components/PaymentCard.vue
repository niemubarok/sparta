<template>
  <div>
    <!-- card untuk transaksi pembayaran -->
    <q-card
      flat
      rounded
      class="gradient-primary q-ma-md fixed-top relative"
      style="top: 5vh; width: 95vw; height: 85vh; border-radius: 10px"
    >
      <div>
        <q-avatar
          size="40px"
          class="cursor-pointer z-top absolute-top-left q-ma-sm"
          text-color="grey-7"
          color="grey-2"
          icon="close"
          @click="transaksiStore.isCheckedIn = false"
        >
        </q-avatar>
        <q-tooltip v-model="buttonBatal"> Batal </q-tooltip>
      </div>
      <q-card-section>
        <q-card
          flat
          bordered
          class="glass q-mt-xl"
          style="width: 60vw; height: 40vh"
        >
          <MemberRibbon />
          <div>
            <q-chip square class="glass text-primary text-h6"
              >Detail Parkir</q-chip
            >
          </div>

          <q-card-section>
            <div class="flex row">
              <div class="col-5">
                <q-timeline color="secondary" class="q-ma-xl">
                  <q-timeline-entry
                    title="20:32:00"
                    subtitle="Waktu Masuk"
                    icon="schedule"
                    body="Pos 2"
                  />

                  <q-timeline-entry
                    title="3 Jam"
                    subtitle="Lama Parkir"
                    icon="timer"
                  />
                </q-timeline>
              </div>
              <div class="col-6">
                <div class="column">
                  <div class="col q-mb-md">
                    <!-- <div class="col"> -->
                    <!-- NOMOR TIKET -->
                    <q-chip
                      square
                      outline
                      class="bg-transparent q-py-lg text-h6 text-dark q-mb-md relative full-width"
                      :label="transaksiStore.nomorTiket"
                    >
                      <!-- style="border-color: ;" -->
                      <q-badge
                        color="primary"
                        text-color="white"
                        label="No. Tiket "
                        class="q-mb-md absolute-top-left"
                        style="top: -8px; left: 5px"
                      />
                    </q-chip>
                    <!-- JENIS KENDARAAN  -->
                    <q-chip
                      square
                      outline
                      class="bg-transparent q-py-lg text-h6 text-dark q-mb-md relative full-width"
                      :label="transaksiStore.jenisKendaraan"
                    >
                      <!-- style="border-color: ;" -->
                      <!-- floating -->
                      <q-badge
                        color="primary"
                        text-color="white"
                        label="Jenis Kendaraan"
                        class="q-mb-md absolute-top-left"
                        style="top: -8px; left: 5px"
                      />
                    </q-chip>
                  </div>

                  <div class="flex justify-end q-mr-xl q-mt-md">
                    <!-- PLAT NOMOR  -->

                    <PlatNomor style="transform: scale(1.5)" />
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-card-section>
        <div class="flex row justify-start">
          <q-btn
            outline
            class="rounded-corner q-mt-xl text-right text-grey-5 text-h4 bg-transparent"
            label="BUKA MANUAL"
            size="sm"
            style="width: 10vw; height: 5vh"
          />
          <!-- TOTAL BAYAR  -->
          <q-card
            flat
            bordered
            class="glass text-dark q-mx-xl q-px-xl relative"
            style="width: 34vw"
          >
            <!-- style="width: 50vw" -->
            <!-- <div class="ribbon"></div> -->
            <!-- <div class="ribbon ribbon-top-left"><span>Member</span></div> -->
            <q-card-section>
              <div class="text-h6 text-right">Tarif Parkir</div>
              <div
                class="text-right text-weight-bold"
                style="
                  font-size: clamp(3rem, 5vw, 5rem);
                  font-family: 'Courier Prime', monospace;
                "
              >
                Rp. 0
              </div>
            </q-card-section>
          </q-card>

          <q-btn
            push
            class="text-right text-dark text-weight-bolder text-h4 bg-yellow"
            label="BAYAR"
            style="width: 10vw"
            @click="onClickBayar()"
          >
            <!-- floating -->
            <q-btn
              push
              color="grey-9"
              text-color="white"
              label="F12"
              class="q-pa-md text-weight-bolder text-body"
            />
          </q-btn>
        </div>
      </q-card-section>
      <div class="col-4">
        <div class="column q-mt-lg q-mb-md q-mr-md fixed-top-right">
          <FotoKendaraan title="Foto Masuk" type="image" />

          <!-- <q-card class="bg-transparent text-center q-mt-md justify-center">
            <div style="top: 5px" class="absolute">
              <q-chip
                dense
                square
                icon="image"
                label="Kamera Keluar"
                class="glass"
                />
            </div>
          </q-card> -->
          <FotoKendaraan title="Kamera Keluar" type="video">
            <template v-slot:video>
              <q-skeleton
                v-if="cameraOut == null || cameraOut === '-'"
                height="40vh"
                width="30vw"
                class="relative"
              >
                <h4 class="absolute-center text-center text-grey-5">
                  <q-icon name="videocam_off" size="lg" />
                  Tidak ada Kamera
                </h4>
              </q-skeleton>
              <CameraOut
                v-else
                :style="{ width: '30vw' }"
                class="q-mt-sm glass"
              />
            </template>
            <!-- width: '42vw', -->
          </FotoKendaraan>
        </div>
      </div>
    </q-card>
    <Clock class="fixed-top-left q-ma-md" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTransaksiStore } from "src/stores/transaksi-store";
import FotoKendaraan from "src/components/FotoKendaraan.vue";
import { format, useQuasar } from "quasar";
import CameraOut from "./CameraOut.vue";
import Clock from "./Clock.vue";
import PaymentDialog from "./PaymentDialog.vue";
import ls from "localstorage-slim";
import PlatNomor from "./PlatNomor.vue";
import MemberRibbon from "./MemberRibbon.vue";

const { capitalize } = format;
const $q = useQuasar();
const transaksiStore = useTransaksiStore();
const buttonBatal = ref(false);
const cameraOut = ls.get("cameraOut") || null;
const bayarParkir = () => {
  // logika bayar parkir
};

const onClickBayar = (type) => {
  const dialog = $q.dialog({
    component: PaymentDialog,
    noBackdropDismiss: true,
    persistent: true,
    // componentProps: {
    //   title: type === "car" ? "Mobil" : type === "bike" ? "Motor" : "Truk",
    //   icon:
    //     type === "car"
    //       ? "directions_car"
    //       : type == "bike"
    //       ? "two_wheeler"
    //       : "local_shipping",
    //   type: type === "car" ? "car" : type === "bike" ? "bike" : "bus",
    // },
  });

  dialog.update();
};

// console.log(event.key);
let pressedKeys = "";
const targetKeys = "BUKA MANUAL";

const handleKeyDown = (event) => {
  // console.log(event.key);
  if (event.key === "F12") {
    event.preventDefault();
    onClickBayar();
  }
  // Add the pressed key to the string of pressed keys
  pressedKeys += event.key.toUpperCase();

  // Check if the pressed keys match the target keys
  if (pressedKeys === targetKeys) {
    // Call the function to execute
    console.log("Buka Manual");
  }

  // Reset the pressed keys string if it doesn't match the target keys
  if (!targetKeys.startsWith(pressedKeys)) {
    pressedKeys = "";
  }
};

window.addEventListener("keydown", handleKeyDown);
</script>

<style scoped>
.glass {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.76);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.125);
}

.gradient-primary {
  background-color: hsla(239, 100%, 80%, 1);
  background-image: radial-gradient(
      at 24% 1%,
      hsla(275, 100%, 28%, 1) 0px,
      transparent 50%
    ),
    radial-gradient(at 19% 98%, hsla(258, 96%, 28%, 1) 0px, transparent 50%),
    radial-gradient(at 24% 48%, hsla(292, 56%, 54%, 1) 0px, transparent 50%),
    radial-gradient(at 9% 13%, hsla(225, 86%, 64%, 1) 0px, transparent 50%),
    radial-gradient(at 64% 45%, hsla(275, 80%, 37%, 1) 0px, transparent 50%),
    radial-gradient(at 49% 37%, hsla(225, 42%, 48%, 1) 0px, transparent 50%),
    radial-gradient(at 76% 5%, hsla(14, 74%, 66%, 1) 0px, transparent 50%);
}
</style>
