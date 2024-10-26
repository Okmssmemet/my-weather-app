import React, { useState, useEffect } from "react";
import weatherData from "../api/WeatherData";

function Weather() {
    const [valueInput, setValueInput] = useState("");
    const [weatherResult, setWeatherResult] = useState(null);

    const handleChange = (event) => {
        setValueInput(event.target.value);
    };

    const handleSubmit = async () => {
        const data = await weatherData(valueInput);
        if (data) {
            setWeatherResult(data); // Array'e çevirmeden tekil veri olarak set ettik
        }
        else{
            alert("Böyle Bir Lokasyon Bulunmuyor")
        }
    };

    return (
        <div
            className="grid justify-items-center"
            style={{ width: "48vh", height: "65vh" }}
        >
            <section className="grid min-h-[600px] w-full max-w-md rounded-2xl bg-white bg-gradient-to-tl from-purple-800 via-violet-900 to-purple-800 p-6">
                <div className="flex h-full flex-col gap-y-5 rounded-2xl text-violet-100">
                    {/* Search Bar */}
                    <div className="relative flex items-center gap-x-2">
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
                            className="lucide lucide-search absolute left-4 h-5 w-5 text-violet-800"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>

                        <input
                            className="w-full rounded-full bg-purple-300 placeholder:text-violet-800/50 py-3 pl-11 pr-4 text-violet-800 outline-none focus:ring-0"
                            placeholder="Search"
                            value={valueInput}
                            onChange={handleChange}
                        />
                        <button
                            className="grid aspect-square h-12 w-12 place-items-center rounded-full bg-violet-600 outline-none transition-colors duration-200 ease-in-out hover:bg-violet-500"
                            onClick={handleSubmit}
                        >
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
                                className="lucide lucide-chevron-right h-5 w-5"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    </div>

                    {/* Date and Time */}
                    <header className="date space-y-2 text-xl font-medium tracking-tighter">
                        <h1>
                            {weatherResult
                                ? new Date(weatherResult.location.localtime).toLocaleDateString("en-GB", {
                                      weekday: "short",
                                      day: "2-digit",
                                      month: "short",
                                  })
                                : "Waiting Location..."}
                        </h1>
                        <p className="text-5xl font-extrabold">
                            <time className="time">
                                {weatherResult
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
                                {weatherResult ? weatherResult.location.name : "Location"}
                            </h2>
                            <h3 className="font-extrabold text-5xl">
                                {weatherResult ? `${Math.floor(weatherResult.current.temp_c)}°C` : "--°C"}
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
                                        {weatherResult ? `${weatherResult.current.humidity}%` : "--%"}
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
                                        {weatherResult ? `${weatherResult.current.wind_kph} km/h` : "-- km/h"}
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
