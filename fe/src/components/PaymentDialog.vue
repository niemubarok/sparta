<template>
  <!-- :maximized="true" -->
  <q-dialog
    ref="dialogRef"
    persistent
    transition-show="scale"
    @hide="onDialogHide"
    class="q-pa-xl"
    :content-css="{ 'background-color': 'rgba(0, 0, 0, 0.9)' }"
  >
    <!-- <struk-card /> -->
    <q-card
      style="width: 50vw; height: fit-content; border-radius: 20px"
      class="q-px-md q-pt-xl q-pb-xl glass rounded-corner relative"
    >
      <q-item class="absolute-top-left full-width">
        <q-item-section avatar>
          <q-icon name="payment" size="md" color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label style="margin-left: -15px" class="q-mt-xs text-white"
            >Bayar Parkir</q-item-label
          >
        </q-item-section>
      </q-item>
      <div class="font-courier flex justify-center absolute-top-right q-mr-md">
        <!-- style="width: 200px" -->
        <q-chip
          class="glass q-my-md rounded-corner text-h4 text-grey-10 justify-center relative"
        >
          <q-badge
            style="top: -10px; left: 20px"
            class="bg-primary absolute-top-left"
            text-color="text-white"
            label="Tarif Parkir"
          />
          <span class="text-subtitle2 q-pb-md">Rp. </span>
          <span class="text-center text-weight-bolder">
            {{ transaksiStore.biayaParkir }}
          </span>
        </q-chip>
      </div>
      <!-- <q-separator class="border-1"></q-separator> -->
      <!-- input-class="text-white" -->

      <!-- style="height: 10vh"
        input-class="text-h4 text-white font-bold autofocus"
        input-style="height:10vh" -->
      <!-- outlined="bg-primary text-white font-bold" -->
      <!-- <q-card-section> -->
      <div class="q-pt-xl">
        <q-input
          borderless
          class="input-box q-mt-xl bg-primary rounded-corner relative q-pa-md"
          input-class="input-box text-white text-weight-bolder"
          label-color="yellow text-h6 q-pa-md"
          color="teal"
          v-model="transaksiStore.bayar"
          label="Masukkan Jumlah Uang Diterima"
          ref="strukRef"
          autofocus
          mask="#############"
          @keydown.enter="onSaveSettings()"
        >
          <!-- :lazy-rules="[
        (val) =>
          parseInt(val) <div parseInt(transaksiStore.biayaParkir)
            ? 'Jumlah Uang Kurang'
            : true,
      ]" -->
          <!-- type="number" -->
          <template v-slot:prepend>
            <q-chip
              flat
              class="bg-transparent text-white text-h6 text-weight-bolder"
              label="Rp. "
            />
          </template>
          <template v-slot:append>
            <q-btn
              push
              :size="'xl'"
              class="q-mt-xl q-mr-lg bg-white text-dark"
              icon="keyboard_return"
            />
            <!-- @click="onSaveSettings()" -->
            <!-- @click="
              [morphStore.nextCarMorph(), transaksiStore.setCheckIn(true)]
              " -->
          </template>
        </q-input>
      </div>
      <q-slide-transition duration="200">
        <q-card
          flat
          outline
          v-if="
            parseInt(transaksiStore.bayar) >
            parseInt(transaksiStore.biayaParkir)
          "
          class="q-mx-lg glass"
          style="transition: slide 0.5s ease; width: 350px"
        >
          <div class="q-mx-md q-mt-md">Uang Kembali</div>
          <q-separator inset light />
          <!-- <div class="text-6">Uang Masuk</div>
            <div class="text-h3">Rp. {{ transaksiStore.bayar }}</div> -->
          <div>
            <q-chip
              class="font-courier bg-transparent q-mt-md text-h2 text-weight-bolder relative"
              :label="transaksiStore.bayar - transaksiStore.biayaParkir"
            >
              <q-badge
                style="top: 10px; left: 14px"
                class="bg-transparent text-dark text-h6 absolute-top-left"
                text-color="text-white"
                label="Rp. "
              />
            </q-chip>
          </div>
        </q-card>
      </q-slide-transition>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent, useQuasar } from "quasar";
// import SuccessCheckMark from "./SuccessCheckMark.vue";
import { onMounted, onBeforeUnmount, onBeforeMount, ref, inject } from "vue";
import { useTransaksiStore } from "src/stores/transaksi-store";
import { useComponentStore } from "src/stores/component-store";
// import StrukCard from "./StrukCard.vue";
// import ls from "localstorage-slim";
// import { useClassesStore } from "src/stores/classes-store";

// ls.config.encrypt = false;
const $q = useQuasar();
const transaksiStore = useTransaksiStore();
const componentStore = useComponentStore();

const props = defineProps({
  title: String,
  icon: String,
  type: String,
});

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);

const { dialogRef, onDialogHide } = useDialogPluginComponent();

let pressedKeys = "";
const targetKeys = "TABAROKTA";

onMounted(async () => {
  // console.log(inputPlatNomorRef);
  const handleKeyDown = (event) => {
    // Add the pressed key to the string of pressed keys
    pressedKeys += event.key.toUpperCase();

    // Check if the pressed keys match the target keys
    if (pressedKeys === targetKeys) {
      // Call the function to execute
      console.log("tabarokta");
      dialogRef.value.hide();
    }

    // Reset the pressed keys string if it doesn't match the target keys
    if (!targetKeys.startsWith(pressedKeys)) {
      pressedKeys = "";
    }
  };

  window.addEventListener("keydown", handleKeyDown);
});

const onSaveSettings = () => {
  if (parseInt(transaksiStore.bayar) >= parseInt(transaksiStore.biayaParkir)) {
    console.log("lunas");
    // componentStore.setOutGateKey();
    // transaksiStore.setCheckIn(false);
    // transaksiStore.$reset();
    // dialogRef.value.hide();
  } else {
    console.log("kurang");
    $q.notify({
      type: "negative",
      message: "Pembayaran Masih Kurang !!",
    });
  }

  // console.log(dialogRef.value.$refs.paymentCardRef);
  // componentStore.setPaymentCardKey();

  // window.location.reload();
};
// onDialogHide(() => console.log("athide"))
</script>

<style scoped>
.font-courier {
  font-family: "Courier New", Courier, monospace;
}
.glass {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.253);
  border-radius: 20px;
  border: 1px solid rgba(14, 13, 13, 0.125);
}

:deep(.q-dialog__backdrop.fixed-full) {
  background-color: rgba(0, 0, 0, 0.623);
  backdrop-filter: blur(30px);
}

/* :deep(.input-box .q-field__append), */
:deep(.input-box .q-field__control),
:deep(.input-box .q-field__append .q-field__marginal) {
  height: 10vh;
  width: 80vw;
  font-size: 72px;
  font-family: "Courier New", Courier, monospace;
}
</style>
