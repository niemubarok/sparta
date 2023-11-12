<template>
  <div v-if="$q.platform.is.mobile" class="text-h2">
    <q-card class="fixed-center">
      <img src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-card-section>
        <div class="text-h6">Silahkan buka halaman ini di Komputer</div>
        <q-btn
          color="primary"
          icon="home"
          label="Home"
          @click="$router.push('/')"
        />
      </q-card-section>
    </q-card>
  </div>
  <div v-else class="relative">
    <div
      v-show="!transaksiStore.isCheckedIn"
      class="flex row justify-between q-pl-lg fixed-top"
    >
      <q-img
        src="/logo.png"
        spinner-color="primary"
        spinner-size="82px"
        width="250px"
        style="margin-top: -40px; margin-left: -30px"
      />

      <div class="q-mt-lg">
        <Quotes />
      </div>
      <div class="column">
        <div class="flex row q-mt-md q-mr-sm">
          <q-chip class="" icon="account_circle" label="Husni Mubarok" />
          <q-chip
            class=""
            icon="place"
            :label="transaksiStore.lokasiPos.label"
          />
          <!-- </div> -->

          <Clock />
        </div>
        <!-- v-show="!transaksiStore.isCheckedIn" -->
        <div class="flex row justify-end q-mt-md q-mr-sm">
          <!-- <ShinyCard class="q-mt-md" title="Total Kendaraan" /> -->
          <ShinyCard
            class="bg-indigo-10"
            title="Kendaraan Masuk"
            shortkey="F3"
            jumlah="200"
          />
          <ShinyCard
            class="bg-teal-10 q-mx-md"
            title="Kendaraan Keluar"
            shortkey="F4"
            jumlah="200"
          />
          <ShinyCard
            class="bg-deep-orange-10"
            title="Kendaraan Parkir"
            shortkey="F5"
            jumlah="200"
          />
        </div>
      </div>
      <!-- </div> -->
    </div>

    <div class="row justify-center items-center" style="height: 100vh">
      <div>
        <div
          v-show="!transaksiStore.isCheckedIn"
          ref="cardVideo"
          class="row justify-evenly items-center q-mt-lg q-py-sm fixed-center relative bg-transparent"
          style="width: 100vw; height: 100vh"
        >
          <div class="relative">
            <q-chip
              class="absolute bg-transparent"
              icon="camera"
              label="Kamera Pintu Masuk"
            />
            <q-skeleton
              v-if="cameraIn == null || cameraIn == '-'"
              height="62vh"
              width="49vw"
            />
            <CaemeraIn
              v-else
              :style="{
                cursor: 'pointer',
                width: '46vw',
              }"
              class="rounded-corner"
            />
          </div>
          <div class="relative">
            <q-chip
              class="absolute bg-transparent"
              icon="camera"
              label="Kamera Pintu Keluar"
            />
            <q-skeleton
              v-if="cameraOut == null || cameraOut == '-'"
              height="62vh"
              width="49vw"
            />
            <CaemeraOut
              v-else
              :style="{
                cursor: 'pointer',
                width: '46vw',
              }"
              class="rounded-corner"
            />
          </div>
        </div>
      </div>

      <!-- <q-space /> -->
      <div
        :class="!transaksiStore.isCheckedIn ? 'col-12' : ''"
        class="col-8 justify-center items-start"
      >
        <PaymentCard v-show="transaksiStore.isCheckedIn" />
      </div>
      <!-- <div
        v-show="transaksiStore.isCheckedIn"
        class="col-4 q-mt-lg fixed-top-right"
      >
        <div class="column q-mb-md q-mr-md">
          <FotoKendaraan title="Foto Masuk" />
          <FotoKendaraan title="Foto Keluar" />
        </div>
      </div> -->
    </div>

    <div
      class="flex row justify-center fixed full-width no-wrap"
      style="bottom: 20px"
    >
      <div class="col-8">
        <!-- style="width: 60vw; height: 10vh" -->
        <q-input
          v-show="
            !componentStore.hideInputPlatNomor && !transaksiStore.isCheckedIn
          "
          class="input-box bg-secondary rounded-corner relative z-top"
          input-class="input-box text-h3 text-white text-uppercase text-weight-bolder"
          input-style="height:10vh"
          label-color="yellow text-h4"
          color="bg-secondary"
          outlined
          item-aligned
          borderless
          v-model="transaksiStore.platNomor"
          label="Masukkan Plat Nomor"
          ref="inputPlatNomorRef"
          autofocus
          :rules="[
            (val) =>
              val ? val.length <= 9 || 'Plat nomor terlalu banyak' : true,
          ]"
          @blur="() => onBlurPlatNomor()"
        >
          <!-- @hasError="platNomorModel = ''" -->
          <!-- @input="(val) => onInputPlatNomor(val)" -->
          <!-- @keydown.enter="inputRef.blur()" -->
          <template v-slot:prepend>
            <!-- <div> -->
            <q-chip square label="F1" class="glass text-weight-bold q-mt-md" />
            <!-- </div> -->
          </template>
          <template v-slot:append>
            <!-- BUTTON MOTOR  -->
            <!-- v-morph:btn:bike:300.tween="morphStore.morphBikeModel" -->
            <q-btn
              :disable="
                !transaksiStore.platNomor ||
                transaksiStore.platNomor?.length > 9
              "
              icon="two_wheeler"
              push
              :class="
                isHover.bike ? 'bg-yellow text-dark' : 'bg-white text-dark'
              "
              class="q-mt-md"
              size="lg"
              @blur="isHover.bike = false"
              @focus="isHover.bike = true"
              @click="onClickTicket('bike')"
            />

            <!-- BUTTON MOBIL  -->
            <!-- v-morph:btn:car:300.tween="morphStore.morphCarModel" -->
            <q-btn
              :disable="
                !transaksiStore.platNomor ||
                transaksiStore.platNomor?.length > 9
              "
              icon="directions_car"
              push
              class="q-mt-md q-mx-md"
              size="lg"
              :class="
                isHover.car ? 'bg-yellow text-dark' : 'bg-white text-dark'
              "
              @blur="isHover.car = false"
              @focus="isHover.car = true"
              @click="onClickTicket('car')"
            />

            <!-- BUTTON BUS  -->
            <q-btn
              :disable="
                !transaksiStore.platNomor ||
                transaksiStore.platNomor?.length > 9
              "
              v-morph:btn:bus:300.tween="morphStore.morphBusModel"
              icon="local_shipping"
              push
              :class="
                isHover.bus ? 'bg-yellow text-dark' : 'bg-white text-dark'
              "
              class="q-mt-md"
              size="lg"
              @blur="isHover.bus = false"
              @focus="isHover.bus = true"
              @click="onClickTicket('bus')"
            />
          </template>
        </q-input>
      </div>

      <q-btn
        flat
        class="fixed-bottom-left q-mb-md"
        color="primary"
        icon="logout"
        label="Keluar"
        @click="onClickSettings()"
      >
        <q-badge
          color="primary"
          text-color="white"
          label="shift + K"
          class="q-ml-xs"
        />
      </q-btn>
      <q-btn
        flat
        class="absolute-bottom-right q-mb-lg"
        color="primary"
        size="sm"
        icon="summarize"
        label="Laporan"
        @click="onClickKendaraanKeluar()"
      >
        <q-badge
          color="primary"
          text-color="white"
          label="shift + L"
          class="q-ml-xs"
        />
      </q-btn>
      <q-btn
        flat
        class="fixed-bottom-right q-mb-md"
        color="primary"
        size="sm"
        icon="settings"
        label="Settings"
        @click="onClickSettings()"
      >
        <q-badge
          color="primary"
          text-color="white"
          label="shift + S"
          class="q-ml-xs"
        />
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { Notify, useQuasar } from "quasar";
import FotoKendaraan from "../components/FotoKendaraan.vue";
import JenisKendaraanCard from "../components/JenisKendaraanCard.vue";
import Clock from "../components/Clock.vue";
import { useMorphStore } from "src/stores/morph-store";
import { useTransaksiStore } from "src/stores/transaksi-store";
import { useComponentStore } from "src/stores/component-store";
import NomorTiketCard from "src/components/CarMorph.vue";
import PaymentCard from "src/components/PaymentCard.vue";
import Quotes from "src/components/Quotes.vue";
import InfoCard from "src/components/InfoCard.vue";
import PetugasCard from "src/components/PetugasCard.vue";
import SettingsDialog from "src/components/SettingsDialog.vue";
import TicketDialog from "src/components/TicketDialog.vue";
import ShinyCard from "src/components/ShinyCard.vue";
import { getTime } from "src/utils/time-util";
import CaemeraOut from "src/components/CameraOut.vue";
import CaemeraIn from "src/components/CameraIn.vue";
import ls from "localstorage-slim";
import KendaraanKeluarDialog from "src/components/KendaraanKeluarDialog.vue";

const transaksiStore = useTransaksiStore();
const componentStore = useComponentStore();
const $q = useQuasar();

const inputRef = ref(null);
const isTransaksi = ref(true);
const isHover = ref({
  car: false,
  bike: false,
  bus: false,
});
const cardVideo = ref(null);

const cameraIn = ls.get("cameraIn") || null;
const cameraOut = ls.get("cameraOut") || null;

const router = useRouter();

// MORPH

const morphStore = useMorphStore();

const inputPlatNomorRef = ref(null);

const onClickSettings = () => {
  const settingsDialog = $q.dialog({
    component: SettingsDialog,
    noBackdropDismiss: true,
    persistent: true,
  });

  settingsDialog.update();
};
const onClickKendaraanKeluar = () => {
  const settingsDialog = $q.dialog({
    component: KendaraanKeluarDialog,
    noBackdropDismiss: true,
  });
  // persistent: true,

  settingsDialog.update();
};
const onClickTicket = (type) => {
  // transaksiStore.setCheckIn(true);
  const dialog = $q.dialog({
    component: TicketDialog,
    noBackdropDismiss: true,
    persistent: true,
    componentProps: {
      title: type === "car" ? "Mobil" : type === "bike" ? "Motor" : "Truk",
      icon:
        type === "car"
          ? "directions_car"
          : type == "bike"
          ? "two_wheeler"
          : "local_shipping",
      type: type === "car" ? "car" : type === "bike" ? "bike" : "bus",
    },
  });

  dialog.update();
  componentStore.hideInputPlatNomor = true;
};

const onFocusPlatNomor = () => {
  console.log("focus");
};
const onBlurPlatNomor = () => {
  const firstCharacter = transaksiStore.platNomor?.charAt(0);

  if (!isNaN(firstCharacter)) {
    transaksiStore.platNomor = "B" + transaksiStore.platNomor?.toUpperCase();
  } else {
    transaksiStore.platNomor = transaksiStore.platNomor?.toUpperCase();
  }
  // console.log(platNomorModel.value.toUpperCase());
};

const areaCode = ref("B");
const areaCodeOptions = ref([]);

onMounted(() => {
  // inputPlatNomorRef ? inputPlatNomorRef.value.focus() : "";
  const handleKeyDown = (event) => {
    // console.log(event.key);
    if (event.key === "F1") {
      event.preventDefault();
      inputPlatNomorRef.value.focus();
    } else if (event.key === "F4") {
      event.preventDefault();
      onClickKendaraanKeluar();
    } else if (event.shiftKey === true && event.key === "S") {
      event.preventDefault();
      onClickSettings();
    } else if (event.shiftKey === true && event.key === "L") {
      event.preventDefault();
      onClickKendaraanKeluar();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  // if ($q.platform.is.mobile) {
  //   router.push("/");
  // }
});
</script>

<style>
:deep(.q-dialog__backdrop.fixed-full) {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.rounded-corner {
  border-radius: 10px;
}

/* } */
</style>

<style scoped>
:deep(.input-box .q-field__control),
:deep(.input-box .q-field__append .q-field__marginal) {
  height: 10vh;
  width: 80vw;
  padding-top: 10px;
  font-size: 80px;
  font-family: "Courier New", Courier, monospace;
}
</style>
