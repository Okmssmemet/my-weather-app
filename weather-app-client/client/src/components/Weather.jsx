import React, { useState, useEffect } from "react";
import weatherData from "../api/WeatherData";
import AutoComplete from "./AutoComplete";

function Weather() {
    const [valueInput, setValueInput] = useState("");
    const [weatherResult, setWeatherResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);  // Veri çekmeye başlamadan önce yükleniyor durumuna geç
        const data = await weatherData(valueInput);
        if (data) {
            setWeatherResult(data); // API'den gelen veriyi set ettik
        } else {
            setTimeout(() => {
                alert("Böyle Bir Lokasyon Bulunmuyor");    
            }, 2000);
            
        }
        setLoading(false);  // Veri geldikten sonra yükleniyor durumunu kapat
    };

    return (
        <div
            className="grid justify-items-center"
            style={{ width: "48vh", height: "65vh" }}
        >
            <section className="grid min-h-[600px] w-full max-w-md rounded-2xl bg-white bg-gradient-to-tl from-purple-800 via-violet-900 to-purple-800 p-6">
                <div className="flex h-full flex-col gap-y-5 rounded-2xl text-violet-100">
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {/* Search Bar */}
                    <AutoComplete 
                        onEnterPress={(value) => {
                            setValueInput(value); // Gelen değeri valueInput'a set ediyoruz
                            handleSubmit(); // handleSubmit fonksiyonunu çağırıyoruz
                        }}
                    />
                    </div>
                    {/* Date and Time */}
                    <header className="date space-y-2 text-xl font-medium tracking-tighter">
                        <h1>
                            {loading
                                ? "Yükleniyor..."
                                : weatherResult
                                    ? new Date(weatherResult.location.localtime).toLocaleDateString("en-GB", {
                                        weekday: "short",
                                        day: "2-digit",
                                        month: "short",
                                    })
                                    : "Waiting Location..."}
                        </h1>
                        <p className="text-5xl font-extrabold">
                            <time className="time">
                                {loading
                                    ? "--:--"
                                    : weatherResult
                                        ? new Date(weatherResult.location.localtime).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                        : "--:--"}
                            </time>
                        </p>
                    </header>

                    {/* Weather Info */}
                    <main className="b relative flex-1">
                        <div className="text-center space-y-4 pt-5 mt-5">
                            <h2 className="font-bold text-3xl">
                                {loading
                                    ? "Yükleniyor..."
                                    : weatherResult
                                        ? weatherResult.location.name
                                        : "Location"}
                            </h2>
                            <h3 className="font-extrabold text-5xl">
                                {loading
                                    ? "--°C"
                                    : weatherResult
                                        ? `${Math.floor(weatherResult.current.temp_c)}°C`
                                        : "--°C"}
                            </h3>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 border-t border-violet-500 pt-3 text-violet-300">
                            <div className="wave flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-waves h-12 w-12"
                                >
                                    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                                    <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                                    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                                </svg>
                                <div>
                                    <p className="text-sm font-extrabold">
                                        {loading
                                            ? "--%"
                                            : weatherResult
                                                ? `${weatherResult.current.humidity}%`
                                                : "--%"}
                                    </p>
                                    <p className="text-sm font-medium">Nem</p>
                                </div>
                            </div>
                            <div className="wave flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-waves h-12 w-12"
                                >
                                    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                                    <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                                    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                                </svg>
                                <div>
                                    <p className="text-sm font-extrabold">
                                        {loading
                                            ? "-- km/h"
                                            : weatherResult
                                                ? `${weatherResult.current.wind_kph} km/h`
                                                : "-- km/h"}
                                    </p>
                                    <p className="text-sm font-medium">Rüzgar</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </section>
        </div>
    );
}

export default Weather;
