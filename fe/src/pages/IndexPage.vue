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
        @click="$router.push('/outgate')"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
