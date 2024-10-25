const fs = require('fs');
const { Client } = require('pg');

// PostgreSQL veritabanı bağlantısı
const client = require("./config/db.js")

// Veritabanına bağlan
client.connect();

// JSON dosyasından verileri ekleme fonksiyonu
const insertDataFromJson = async (filePath, tableName) => {
    try {
        // Dosyayı oku
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        for (const item of data) {
            const keys = Object.keys(item).join(', ');
            const values = Object.values(item)
                .map(value => `'${value.replace(/'/g, "''")}'`) // Tek tırnakları kaçır
                .join(', ');

            // SQL sorgusunu oluştur
            const query = `INSERT INTO ${tableName} (${keys}) VALUES (${values})`;
            console.log(`Running query: ${query}`); // Hata ayıklama logu

            // Veritabanına sorgu gönder
            try {
                await client.query(query);
            } catch (err) {
                console.error(`Hata: ${err.message}`);
            }
        }
    } catch (err) {
        console.error(`JSON okuma hatası: ${err.message}`);
    }
};

(async () => {
    try {
        // Dosya yollarını burada belirleyin
        const citiesFilePath = 'C:\\Users\\CASPER\\OneDrive - İSTANBUL AYDIN ÜNİVERSİTESİ\\Masaüstü\\cities.json';
        const districtsFilePath = 'C:\\Users\\CASPER\\OneDrive - İSTANBUL AYDIN ÜNİVERSİTESİ\\Masaüstü\\districts.json';
        const villagesFilePath = 'C:\\Users\\CASPER\\OneDrive - İSTANBUL AYDIN ÜNİVERSİTESİ\\Masaüstü\\villages.json';

        await insertDataFromJson(citiesFilePath, 'cities');
        await insertDataFromJson(districtsFilePath, 'districts');
        await insertDataFromJson(villagesFilePath, 'villages');

        console.log('Veriler başarıyla eklendi.');
    } catch (error) {
        console.error('Bir hata oluştu:', error);
    } finally {
        client.end();
    }
})();
