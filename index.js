import express from "express";
import ejs  from 'ejs';
import pg from "pg";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const key = "577e4068ea444939eb91bf785f59fe68"
var w = "";
var temp = "";
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("home.ejs");
});
app.get("/getweather",(req,res)=>{
    res.render("weather.ejs",{weather:w,t:temp})
});
app.post("/gw",async(req,res)=>{
    const cName = req.body["name"]; 
    const result = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cName}&appid=${key}`).then(response=>{
        w = response.data.weather[0].description
        const tempInKelvin = response.data.main.temp;
    
    // Convert temperature from Kelvin to Celsius
    const tempInCelsius = Math.floor(tempInKelvin - 273.15);
    temp=tempInCelsius; 
    console.log("========================================");
    console.log(w+" ,");
    console.log(temp);



    


    }).catch(err=>{
        res.send("City Does Not Exist");
        console.log("err is " + err);
    });
    res.redirect("/getweather");
});
app.listen(port,()=>{
    console.log("Server is running in port " + port);
});