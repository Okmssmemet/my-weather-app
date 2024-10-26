import axios from 'axios';

const AllLocationsData = async (search = "", page = 1) => {
  try {
    const response = await axios.get(`http://localhost:3000/allLocations`, {
      params: { search, page }
    });
    console.log('API Yanıtı:', response.data);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected response code: ${response.status}`);
    }
  } catch (error) {
    console.error('Veri çekme hatası:', error.message);
    return [];
  }
};

export default AllLocationsData;
