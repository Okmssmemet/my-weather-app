import axios from "axios";

const cityUrl = "http://localhost:3000/cities";
const districtsUrl = "http://localhost:3000/districts";
const villagesUrl = "http://localhost:3000/villages";

// Şehir verisini çek ve döndür
export const fetchCities = async () => {
  try {
    const response = await axios.get(cityUrl);
    return response.data;
  } catch (error) {
    console.error("Şehir verisi alınamadı:", error);
    return [];
  }
};

// İlçe verisini çek ve döndür
export const fetchDistricts = async () => {
  try {
    const response = await axios.get(districtsUrl);
    return response.data;
  } catch (error) {
    console.error("İlçe verisi alınamadı:", error);
    return [];
  }
};

// Köy verisini çek ve döndür
export const fetchVillages = async () => {
  try {
    const response = await axios.get(villagesUrl);
    return response.data;
  } catch (error) {
    console.error("Köy verisi alınamadı:", error);
    return [];
  }
};
