<template>
  <q-page class="flex flex-center">
    <div class="column">
      <img
        alt="Quasar logo"
        src="~assets/logo.png"
        style="width: 40vw; height: 50%"
      />

      <q-btn
        color="primary"
        icon="directions_car"
        label="Demo Post Keluar"
        @click="onClickDemoPage()"
      />
      <!-- @click="$router.push('/outgate')" -->
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent } from "vue";
import LoginDialog from "src/components/LoginDialog.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const onClickDemoPage = () => {
  const dialog = $q.dialog({
    component: LoginDialog,
    noBackdropDismiss: true,
    persistent: true,
  });
  dialog.update();
};

defineComponent({
  name: "IndexPage",
});
</script>
