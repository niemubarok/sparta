<template>
  <!-- :maximized="true" -->
  <q-dialog
    ref="dialogRef"
    no-backdrop-dismiss
    no-route-dismiss
    @hide="onDialogHide"
    class="q-pa-xl"
    content-class="dialog__backdrop"
  >
    <!-- :content-css="{ 'background-color': 'rgba(0, 0, 0, 0.9)' }" -->
    <q-card
      style="width: 50vw; height: fit-content"
      class="q-px-md q-py-md glass rounded-corner relative"
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
          <q-icon :name="props.icon" size="xl" />
        </q-item-section>
        <q-item-section>
          <q-item-label
            style="margin-left: -15px"
            class="q-mt-xs text-weight-bolder text-h5"
            >{{ props.title }}</q-item-label
          >
        </q-item-section>
      </q-item>
      <div class="flex justify-center">
        <member-card v-if="transaksiStore.isMember" />
        <plat-nomor v-else class="q-ma-md" />
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
        label-color="yellow text-h6"
        color="teal"
        v-model="transaksiStore.nomorTiket"
        label="Scan Nomor Struk"
        ref="strukRef"
        autofocus
        @keydown.enter="onSaveSettings(props.type)"
      >
        <template v-slot:append>
          <q-btn
            push
            :size="'xl'"
            class="q-mt-xl q-mr-lg bg-white text-dark"
            icon="keyboard_return"
            @click="onSaveSettings(props.type)"
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
import MemberCard from "./MemberCard.vue";
import PlatNomor from "./PlatNomor.vue";
import { useComponentStore } from "src/stores/component-store";
// import ls from "localstorage-slim";
// import { useClassesStore } from "src/stores/classes-store";

// ls.config.encrypt = false;
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

const { dialogRef } = useDialogPluginComponent();

onMounted(async () => {});

const onSaveSettings = (type) => {
  transaksiStore.setCheckIn(true);
  dialogRef.value.hide();

  if (type == "car") {
    transaksiStore.jenisKendaraan = "Mobil";
  } else if (type == "bus") {
    transaksiStore.jenisKendaraan = "Bus";
  } else if (type == "bike") {
    transaksiStore.jenisKendaraan = "Motor";
  }
  // window.location.reload();
};
const onDialogHide = () => {
  // console.log("at hide");
  componentStore.hideInputPlatNomor = false;
};
</script>

<style scoped>
:deep(.q-dialog__backdrop.fixed-full) {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}
.glass {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.301);
  border-radius: 20px;
  border: 1px solid rgba(14, 13, 13, 0.125);
}

/* :deep(.input-box .q-field__append), */
:deep(.input-box .q-field__control),
:deep(.input-box .q-field__append .q-field__marginal) {
  height: 10vh;
  width: 80vw;
  font-size: 2rem;
  font-family: "Courier New", Courier, monospace;
}
</style>
