import { ref } from 'vue';
import axios from 'axios';
import { makeType, modelType, yearsType } from '../types/global';

export default function useVehicleDropdown() {

  const years = ref<yearsType[]>([]);
  const makes = ref<makeType[]>([]);
  const models = ref<modelType[]>([]);

  const fetchYears = async () => {
    try {
      const response = await axios.get('/api/years');
      years.value =response.data.years;
    } catch (error) {
      console.error('Error fetching years:', error);
    }
  };

  const fetchMakes = async (selectedYear: string | null) => {
    if (!selectedYear) return;
    try {
      const response = await axios.get(`http://localhost:3000/api/makes?year=${selectedYear}`);
      
      makes.value = response.data.makes;
    } catch (error) {
      console.error('Error fetching makes:', error);
    }
  };

  const fetchModels = async (selectedYear: string | null, selectedMake: string | null) => {
    if (!selectedYear || !selectedMake) return;
    try {
      const response = await axios.get(
        `http://localhost:3000/api/models?year=${selectedYear}&make=${selectedMake}`
      );
      models.value = response.data.models;
      console.log(response.data.models)
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  return {
    years,
    makes,
    models,
    fetchYears,
    fetchMakes,
    fetchModels,
  };
}
