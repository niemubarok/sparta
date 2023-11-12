import { defineStore } from "pinia";
import { ref } from "vue";
import ls from "localstorage-slim";

export const useComponentStore = defineStore("component", {
  state: () => ({
    isSidebar: ref(false),
    isHeader: ref(false),
    availableCameras: ref([]),
    hideInputPlatNomor: ref(false),
    cameraId: ref({
      in: ls.get("cameraIn"),
      out: ls.get("cameraOut"),
    }),
  }),
  actions: {
    async getAvailableCameras() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log("devices", devices);
      return devices.filter((device) => device.kind === "videoinput");
    },
    setSelectedCamera(type, id) {
      if (type === "in") {
        ls.set("cameraIn", id);
        this.cameraId.value.in = id;
      } else if (type === "out") {
        ls.set("cameraOut", id);
        this.cameraId.value.out = id;
      }
    },
  },
});
