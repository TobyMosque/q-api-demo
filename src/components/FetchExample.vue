<template>
  <q-card>
    <q-card-section>
      <span class="text-center text-h5"> Fetch Example</span>
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
import { ref, computed } from 'vue';
import { useFetchFn } from 'src/composables/fetch';

const personId = ref(1);
const useFetch = useFetchFn();
const url = computed(() => 'people/' + personId.value);

const {
  data: person,
  execute,
  error,
} = useFetch(url, { initialData: {}, immediate: false }).get().json<unknown>();
</script>
