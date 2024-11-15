import { ref } from "vue";
import axios from "axios";
import { makeType, modelType, yearsType } from "../types/global";
import { getProxyLink } from "../utils/proxyLink";

export default function useVehicleDropdown() {
  const years = ref<yearsType[]>([]);
  const makes = ref<makeType[]>([]);
  const models = ref<modelType[]>([]);

  const fetchYears = async () => {
    try {
      const link = getProxyLink(
        "https://rateengine.ship.cars/v2/vehicles/years/?format=json&token=5cbe12fb62f4941267d623499a2a4fd5948fd3ef"
      );
      const response = await axios.get(link);
      years.value = JSON.parse(response.data.contents);
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  };

  const fetchMakes = async (selectedYear: string | null) => {
    if (!selectedYear) return;
    try {
      const url = getProxyLink(`https://rateengine.ship.cars/v2/vehicles/makes/?year=${selectedYear}&format=json&token=5cbe12fb62f4941267d623499a2a4fd5948fd3ef`)
      const response = await axios.get(url);
      makes.value = JSON.parse(response.data.contents);
    } catch (error) {
      console.error("Error fetching makes:", error);
    }
  };

  const fetchModels = async (
    selectedYear: string | null,
    selectedMake: string | null
  ) => {
    if (!selectedYear || !selectedMake) return;
    try {
      const response = await axios.get(
        `http://localhost:3000/api/models?year=${selectedYear}&make=${selectedMake}`
      );
      models.value = response.data.models;
      console.log(response.data.models);
    } catch (error) {
      console.error("Error fetching models:", error);
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
