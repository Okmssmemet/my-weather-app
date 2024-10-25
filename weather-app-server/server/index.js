const express = require("express");
const client = require("./config/db.js")
const cors = require("cors")

const app = express();

app.use(cors());

client.connect(err =>{
    if (err) {
        console.log("Connection Error",err.stack)
    }
    else{
        console.log("Connection Success")
    }
})

app.get("/locations/:location", async (req, res) => {
    const location = req.params.location;
    
    try {
        
        const resultVillage = await client.query("SELECT * FROM villages WHERE name = $1", [location]);
        const isExistVillageName = resultVillage.rows[0];

        if (isExistVillageName) {
            const districtId = isExistVillageName.ilce_id;
            const districtResult = await findDistrict(districtId);
            const cityResult = await findCity(districtResult.rows[0].il_id);

            if (districtResult.rows.length > 0 && cityResult.rows.length > 0) {
                return res.send(`Girilen Köyü İli : ${cityResult.rows[0].name} İlçesi : ${districtResult.rows[0].name}`);
            } else {
                return res.status(404).send("İl veya ilçe bulunamadı.");
            }
        } 

      
        const resultDistrict = await client.query("SELECT * FROM districts WHERE name = $1", [location]);
        const isExistDistrict = resultDistrict.rows[0];

        if (isExistDistrict) {
            const cityResult = await findCity(isExistDistrict.il_id); 
            if (cityResult.rows.length > 0) { 
                return res.send(`Girilen İlçenin Bağlı Olduğu İl : ${cityResult.rows[0].name}`);
            } else {
                return res.status(404).send("Şehir bulunamadı.");
            }
        }

       
        res.status(404).send("Belirtilen konum bulunamadı.");

    } catch (error) {
        console.error(error);
        res.status(500).send("Sunucu hatası.");
    }

    async function findDistrict(id) {
        return await client.query("SELECT * FROM districts WHERE id = $1", [id]);
    }

    async function findCity(id) {
        return await client.query("SELECT * FROM cities WHERE id = $1", [id]);
    }
});





const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Adres Başarılı http://localhost:${PORT}`);
});

process.on("exit",()=>{
    client.end();
})

