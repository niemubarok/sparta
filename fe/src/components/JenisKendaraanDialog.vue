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
      <!-- <q-item> -->
      <!-- <q-item-section avatar>
          <q-icon :name="props.icon" size="xl" />
        </q-item-section> -->
      <!-- <q-item-section> -->
      <!-- style="margin-left: -15px" -->
      <div class="text-center text-weight-bolder text-h5">
        Pilih Jenis Kendaraan
      </div>
      <div class="flex justify-center">
        <!-- <member-card v-if="transaksiStore.isMember" /> -->
        <plat-nomor class="q-ma-lg" />
      </div>

      <div
        v-for="jenisKendaraan in jenisKendaraanOptions"
        :key="jenisKendaraan.value"
      >
        <q-item class="glass q-ma-md rounded-corner">
          <q-item-section top avatar>
            <!-- <q-avatar color="primary" text-color="white" icon="bluetooth" /> -->
            <q-chip
              square
              class="bg-dark text-white text-weight-bolder q-px-md"
              :label="jenisKendaraan.value"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ jenisKendaraan.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent, useQuasar } from "quasar";
// import SuccessCheckMark from "./SuccessCheckMark.vue";
import { onMounted, onBeforeUnmount, onBeforeMount, ref } from "vue";
import { useTransaksiStore } from "src/stores/transaksi-store";
import MemberCard from "./MemberCard.vue";
import PlatNomor from "./PlatNomor.vue";
import { useComponentStore } from "src/stores/component-store";
import TicketDialog from "src/components/TicketDialog.vue";
// import ls from "localstorage-slim";
// import { useClassesStore } from "src/stores/classes-store";

// ls.config.encrypt = false;
const transaksiStore = useTransaksiStore();
const componentStore = useComponentStore();
const $q = useQuasar();

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
const onDialogHide = () => {
  componentStore.hideInputPlatNomor = false;
  window.removeEventListener("keydown", handleKeydownOnJenisKendaraan);
};

const jenisKendaraanOptions = ref([]);
const jenisKendaraanModel = ref(null);
const jenisKendaraanRef = ref(null);

const onClickTicket = (type) => {
  // transaksiStore.setCheckIn(true);
  const dialog = $q.dialog({
    component: TicketDialog,
    noBackdropDismiss: true,
    persistent: true,
    componentProps: {
      title: type,
      // icon:
      //   type === "car"
      //     ? "directions_car"
      //     : type == "bike"
      //     ? "two_wheeler"
      //     : "local_shipping",
      // type: type === "car" ? "car" : type === "bike" ? "bike" : "bus",
    },
  });

  dialog.update();
  // componentStore.hideInputPlatNomor = true;
};

const handleKeydownOnJenisKendaraan = (event) => {
  const key = event.key;
  const matchingOption = jenisKendaraanOptions.value.find(
    (option) => option.value === key.toUpperCase()
  );
  // (option) => console.log(option.value === key.toUpperCase())
  if (matchingOption) {
    jenisKendaraanModel.value = matchingOption.value;
    transaksiStore.selectedJenisKendaraan = matchingOption;
    onClickTicket(matchingOption.label);
    dialogRef.value.hide();
  }
};

onMounted(() => {
  jenisKendaraanOptions.value = transaksiStore.jenisKendaraan.map((item) => {
    return {
      label: item.nama,
      value: item.id,
    };
  });

  window.addEventListener("keydown", handleKeydownOnJenisKendaraan);
});

// onUnmounted(() => {
// //   window.removeEventListener("keydown", handleKeydownOnJenisKendaraan);
// // });
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
