import { useState, useEffect } from "react";
import { fetchCities, fetchDistricts, fetchVillages } from "./api/data";
import "./App.css";
import { Button, Input } from "@mui/material";

function App() {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [result, setResult] = useState({ villageName: "", districtName: "", cityName: "" });

  useEffect(() => {
    fetchCities().then((data) => setCities(data));
    fetchDistricts().then((data) => setDistricts(data));
    fetchVillages().then((data) => setVillages(data));
  }, []);

  const handleChange = (event) => {
    setLocationName(event.target.value);
  };

  const handleSubmit = () => {
    const result = getDistrictOrCity(locationName);
    setResult(result);
  };

  function getDistrictOrCity(locationName) {
    const isExistInVillage = villages.find((item) => item.name === locationName);
    if (isExistInVillage) {
      const isDistrict = findDistrict(isExistInVillage.ilce_id);
      const isCity = isDistrict ? findCity(isDistrict.il_id) : null;

      return {
        villageName: isExistInVillage.name,
        districtName: isDistrict ? isDistrict.name : "",
        cityName: isCity ? isCity.name : ""
      };
    }

    const isExistInDistrict = districts.find((item) => item.name === locationName);
    if (isExistInDistrict) {
      const isCity = findCity(isExistInDistrict.il_id);

      return {
        villageName: "",
        districtName: isExistInDistrict.name,
        cityName: isCity ? isCity.name : ""
      };
    }

    const isExistInCity = cities.find((item) => item.name === locationName);
    if (isExistInCity) {
      return {
        villageName: "",
        districtName: "",
        cityName: isExistInCity.name
      };
    }

    return { villageName: "", districtName: "", cityName: "" };
  }

  function findDistrict(id) {
    return districts.find((item) => item.id === id);
  }

  function findCity(id) {
    return cities.find((item) => item.id === id);
  }

  return (
    <div className="app">
      <h3 style={{textAlign:'center', marginBottom:25,}}>Hoşgeldiniz</h3>
      <Input
        placeholder="İstenilen Lokasyonu Giriniz"
        value={locationName}
        onChange={handleChange} 
      />
      <Button onClick={handleSubmit}>Ara</Button>
      {result.cityName || result.districtName || result.villageName ? (
        <div>
         {result.villageName && <h4>Köy: {result.villageName}</h4>}
         {result.districtName && <h4>İlçe: {result.districtName}</h4>}
         {result.cityName && <h4>İl: {result.cityName}</h4>}
        </div>
      ) : (
        <h1></h1>
      )}
    </div>
  );
}

export default App;
