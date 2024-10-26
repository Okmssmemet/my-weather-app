import axios from 'axios';

const weatherData = async (term) => {
    try {
        const response = await axios.get(`http://localhost:3000/locations/${term}`);
        
        // HTTP durum kodunu kontrol et
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected response code: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        // Hata durumunda null dönebilir veya spesifik bir hata mesajı fırlatabilirsiniz
        return null; // veya throw error; 
    }
};

export default weatherData;
