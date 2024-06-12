import { defineStore } from 'pinia';
import { uid } from 'quasar';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const token = ref(uid());
  return {
    token,
  };
});
