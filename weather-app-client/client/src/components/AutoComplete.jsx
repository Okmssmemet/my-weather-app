import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AllLocationsData from '../api/AllLocationsData';

const AutoComplete = ({ onEnterPress }) => {
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  async function getLocationData() {
    setLoading(true);
    const data = await AllLocationsData(searchTerm, page);
    console.log('Veri:', data);

    if (Array.isArray(data)) {
      setLocationData((prevData) => (page === 1 ? data : [...prevData, ...data]));
    } else {
      console.error('Beklenmeyen veri yapısı:', data);
    }
    setLoading(false);
  }

  useEffect(() => {
    getLocationData();
  }, [searchTerm, page]);

  return (
    <div>
      <Autocomplete
        disablePortal
        disableListWrap  // Seçenekler arasında daha iyi gezinmek için
        options={locationData}
        getOptionLabel={(option) => option.location_name || ""}  // Verinin doğru alanını seçtiğinizden emin olun
        sx={{ width: 300, color: 'whitesmoke', fontSize: "bold" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Location"
            variant="outlined"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onEnterPress(searchTerm);
              }
            }}
          />
        )}
        onInputChange={(event, value) => {
          setSearchTerm(value);
          setPage(1);
        }}
        onScroll={(event) => {
          const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
          if (bottom && !loading) {
            setPage((prevPage) => prevPage + 1);
          }
        }}
      />
      {loading && <p>Yükleniyor...</p>}
    </div>
  );
};

export default AutoComplete;
