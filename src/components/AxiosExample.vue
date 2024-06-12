<template>
  <q-card>
    <q-card-section>
      <span class="text-center text-h5"> Axios Example</span>
    </q-card-section>
    <q-card-section class="row">
      <div class="col">
        <q-input
          label="Person Id"
          color="primary"
          type="number"
          filled
          v-model.number="personId"
        ></q-input>
      </div>
      <div class="col col-auto">
        <q-btn label="Search" color="primary" @click="() => execute()" />
      </div>
    </q-card-section>
    <q-card-section>
      <pre>{{ person }}</pre>
    </q-card-section>
    <q-banner class="bg-negative" v-if="error">{{ error }}</q-banner>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { useAxios } from 'src/composables/axios';

const personId = ref(1);
const api = useAxios();

async function searchPerson() {
  const { data } = await api.get<unknown>('people/' + personId.value);
  return data;
}

const {
  state: person,
  execute,
  error,
} = useAsyncState(searchPerson, {}, { immediate: false });
</script>
