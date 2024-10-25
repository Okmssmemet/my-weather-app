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

app.get("/cities", async (req,res) =>{
    try {
        const result = await client.query("SELECT * FROM cities")
        res.json(result.rows)
    } catch (error) {
        console.log("Error",error.stack)
    }
})
app.get("/districts", async (req,res) =>{
    try {
        const result = await client.query("SELECT * FROM districts")
        res.json(result.rows)
    } catch (error) {
        console.log("Error",error.stack)
    }
})
app.get("/villages", async (req,res) =>{
    try {
        const result = await client.query("SELECT * FROM villages")
        res.json(result.rows)
    } catch (error) {
        console.log("Error",error.stack)
    }
})



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Adres Başarılı http://localhost:${PORT}`);
});

process.on("exit",()=>{
    client.end();
})

