<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      class="q-px-md q-pt-sm glass relative"
      style="width: 500px; height: fit-content"
    >
      <div>
        <q-avatar
          size="40px"
          class="cursor-pointer z-top absolute-top-right q-ma-sm"
          text-color="grey-7"
          color="grey-5"
          icon="close"
          @click="dialogRef.hide()"
        />
      </div>
      <!-- <q-icon name="close"  /> -->
      <q-item>
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>
          <q-item-label
            style="margin-left: -20px"
            class="q-mt-xs text-weight-bolder"
            >Pengaturan Parkir</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-separator inset />
      <div class="q-mt-md">
        <q-select
          v-model="cameraIn"
          :options="cameraInOptions"
          label="Pilih Kamera Masuk"
          filled
        />
      </div>
      <div class="q-mt-md">
        <q-select
          v-model="cameraOut"
          :options="cameraOutOptions"
          label="Pilih Kamera Keluar"
          filled
        />
      </div>

      <q-card-actions align="right">
        <!-- <q-btn flat label="Action 1" /> -->
        <q-btn flat label="Simpan" @click="onSaveSettings" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
// import SuccessCheckMark from "./SuccessCheckMark.vue";
import { onMounted, onBeforeUnmount, onBeforeMount, ref } from "vue";
import { useComponentStore } from "src/stores/component-store";

import ls from "localstorage-slim";

const componentStore = useComponentStore();
// ls.config.encrypt = false;
const cameraIn = ref(ls.get("cameraIn")) || ref("");
const cameraOut = ref(ls.get("cameraOut")) || ref("");
const cameraOptions = ref(["-"]);
const getAvailableCameras = () => {
  navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      devices.forEach((device) => {
        if (device.kind === "videoinput") {
          cameraOptions.value.push({
            label: device.label,
            value: device.deviceId,
          });
        }
      });
    })
    .catch((err) => {
      console.log(err.name + ": " + err.message);
    });
};

const cameraInOptions = ref(cameraOptions.value);
const cameraOutOptions = ref(cameraOptions.value);

// const props = defineProps({
//   name: String,
// });

onMounted(async () => {
  getAvailableCameras();

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      // Camera permission granted, do something with the stream
    })
    .catch((error) => {
      // Camera permission denied or error occurred
      console.error("Error accessing camera: ", error);
    });
});

const onSaveSettings = () => {
  ls.set("cameraIn", cameraIn.value);
  ls.set("cameraOut", cameraOut.value);

  dialogRef.value.hide();
  window.location.reload();
};

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide } = useDialogPluginComponent();
</script>

<style scoped>
.glass {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.378);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
}
</style>
