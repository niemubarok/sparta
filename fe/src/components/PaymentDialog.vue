<template>
  <!-- :maximized="true" -->
  <q-dialog
    ref="dialogRef"
    persistent
    @hide="onDialogHide"
    class="q-pa-xl"
    :content-css="{ 'background-color': 'rgba(0, 0, 0, 0.9)' }"
  >
    <!-- <struk-card /> -->
    <q-card
      style="width: 50vw; height: fit-content; border-radius: 20px"
      class="q-px-md q-py-md glass rounded-corner relative"
    >
      <!-- <div>
        <q-avatar
          size="40px"
          class="cursor-pointer z-top absolute-top-right q-ma-sm"
          text-color="grey-7"
          color="grey-5"
          icon="close"
          @click="dialogRef.hide()"
        />
      </div> -->
      <!-- <q-icon name="close"  /> -->
      <q-item>
        <q-item-section avatar>
          <q-icon name="payment" size="lg" />
        </q-item-section>
        <q-item-section>
          <q-item-label
            style="margin-left: -15px"
            class="q-mt-xs text-weight-bolder text-primary"
            >Bayar Parkir</q-item-label
          >
        </q-item-section>
      </q-item>
      <div class="flex justify-center">
        <q-chip
          style="width: 200px"
          class="q-ma-md rounded-corner q-px-md bg-dark text-h4 text-white justify-center relative"
        >
          <q-badge
            style="top: -10px; left: 7px"
            class="bg-teal-8 absolute-top-left"
            text-color="text-white"
            label="Tarif Parkir"
          />
          <span class="text-center text-weight-bolder">
            {{ transaksiStore.biaya }}
          </span>
        </q-chip>
      </div>
      <!-- <q-separator class="border-1"></q-separator> -->
      <!-- input-class="text-white" -->

      <!-- style="height: 10vh"
        input-class="text-h4 text-white font-bold autofocus"
        input-style="height:10vh" -->
      <!-- outlined="bg-primary text-white font-bold" -->
      <q-input
        borderless
        class="input-box bg-primary rounded-corner relative q-pa-sm"
        input-class="input-box text-white"
        label-color="yellow text-h5"
        color="teal"
        v-model="transaksiStore.bayar"
        label="Masukkan Jumlah Uang Diterima"
        ref="strukRef"
        autofocus
        mask="############"
        @keydown.enter="onSaveSettings()"
      >
        <!-- type="number" -->
        <template v-slot:append>
          <q-btn
            push
            :size="'xl'"
            class="q-mt-xl q-mr-lg bg-white text-dark"
            icon="keyboard_return"
            @click="onSaveSettings()"
          />
          <!-- @click="
                [morphStore.nextCarMorph(), transaksiStore.setCheckIn(true)]
              " -->
        </template>
      </q-input>

      <!-- <q-card-actions align="right"> -->
      <!-- <q-btn flat label="Action 1" /> -->
      <!-- <q-btn flat label="Simpan" @click="onSaveSettings" />
        </q-card-actions> -->
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
// import SuccessCheckMark from "./SuccessCheckMark.vue";
import { onMounted, onBeforeUnmount, onBeforeMount, ref } from "vue";
import { useTransaksiStore } from "src/stores/transaksi-store";
import StrukCard from "./StrukCard.vue";
// import ls from "localstorage-slim";
// import { useClassesStore } from "src/stores/classes-store";

// ls.config.encrypt = false;
const transaksiStore = useTransaksiStore();

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

onMounted(async () => {});

const onSaveSettings = () => {
  transaksiStore.$reset();
  transaksiStore.setCheckIn(false);
  dialogRef.value.hide();
  //   if (type == "car") {
  //     transaksiStore.jenisKendaraan = "Mobil";
  //   } else if (type == "bus") {
  //     transaksiStore.jenisKendaraan = "Bus";
  //   } else if (type == "bike") {
  //     transaksiStore.jenisKendaraan = "Motor";
  //   }
  // window.location.reload();
};
// onDialogHide(() => console.log("athide"))
</script>

<style scoped>
.glass {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.253);
  border-radius: 20px;
  border: 1px solid rgba(14, 13, 13, 0.125);
}

:deep(.q-dialog__backdrop.fixed-full) {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
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
