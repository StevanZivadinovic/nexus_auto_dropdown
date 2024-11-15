<script setup lang="ts">
import useVehicleDropdown from './../api/dropdownApi'
const { years, makes, models, fetchYears, fetchMakes, fetchModels } = useVehicleDropdown();
import { ref, watch, onMounted } from "vue";
import { Make, Model, Year } from '../types/global';

const selectedYear = ref<string | null>(null);
const selectedMake = ref<string | null>(null);
const selectedModel = ref<string | null>(null);

const isYearsLoaded = ref(false);
const isMakesLoaded = ref(false);
const isModelsLoaded = ref(false);

const yearsData = ref<Year[]>([]);
const makesData = ref<Make[]>([]);
const modelsData = ref<Model[]>([]);

watch(
  () => years.value, 
  (newValue) => {
    if (newValue && newValue.length > 0) {
      isYearsLoaded.value = true;
      yearsData.value = newValue;
    } else {
      isYearsLoaded.value = false; 
    }
    if (newValue?.length > 0) {
      selectedYear.value = newValue[0].year;
    }
  },
  { immediate: true } 
);

watch(
  () => makes.value,
  (newMakes) => {
    if (newMakes && newMakes.length > 0) {
      isMakesLoaded.value = true;
      makesData.value = newMakes;
    } else {
      isMakesLoaded.value = false;
    }
  },
  { immediate: true }
);

// Watch for changes in `models`
watch(
  () => models.value,
  (newModels) => {
    if (newModels && newModels.length > 0) {
      isModelsLoaded.value = true;
      modelsData.value = newModels;
    } else {
      isModelsLoaded.value = false;
    }
  },
  { immediate: true }
);

// Year change handler
const onYearChange = async () => {
  makes.value = [];
  models.value = [];
  await fetchMakes(selectedYear.value);
};

// Make change handler
const onMakeChange = async () => {
  models.value = [];
  await fetchModels(selectedYear.value, selectedMake.value);
};

// Fetch years when component is mounted
onMounted(async () => {
  await fetchYears();
});
</script>

<template>
  <div class="max-w-lg mx-auto p-6 space-y-6 bg-gradient-to-r from-indigo-100 to-purple-100 shadow-xl rounded-lg">
    <h1 class="text-4xl font-semibold text-center text-gray-800">Select Vehicle Details</h1>

    <!-- Year Dropdown -->
    <div v-if="yearsData.length > 0" class="space-y-4">
      <label for="year" class="block text-lg font-medium text-gray-700">Select Year</label>
      <select
        id="year"
        v-model="selectedYear"
        @change="onYearChange"
        class="block w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out hover:bg-indigo-50"
      >
        <option value="" disabled>Select Year</option>
        <option v-for="year in yearsData" :key="year.year" :value="year.year">
          {{ year.year }}
        </option>
      </select>
    </div>

    <!-- Make Dropdown -->
    <div v-if="makesData.length > 0" class="space-y-4">
      <label for="make" class="block text-lg font-medium text-gray-700">Select Make</label>
      <select
        id="make"
        v-model="selectedMake"
        @change="onMakeChange"
        class="block w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out hover:bg-indigo-50"
      >
        <option :value="null" disabled>Select make..</option>
        <option v-for="make in makesData" :key="make?.make" :value="make?.make">
          {{ make?.make }}
        </option>
      </select>
    </div>

    <!-- Model Dropdown -->
    <div v-if="modelsData.length > 0" class="space-y-4">
      <label for="model" class="block text-lg font-medium text-gray-700">Select Model</label>
      <select
        id="model"
        v-model="selectedModel"
        class="block w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out hover:bg-indigo-50"
      >
        <option :value="null" disabled>Select model..</option>
        <option v-for="model in modelsData" :key="model?.model" :value="model?.model">
          {{ model?.model }}
        </option>
      </select>
    </div>

  </div>
</template>
