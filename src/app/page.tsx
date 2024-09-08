'use client';
import { useState } from "react";

interface WeatherData {
  name?: string;
  main?: {
    temp?: number;
  };
  weather?: Array<{
    description?: string;
  }>;
  wind?: {
    speed?: number;
  };
}

const api = {
  key: "4dfe765bd809bdb3d566a075c1123ba1",
  base: "https://api.openweathermap.org/data/2.5/",
};

export default function Home(){

  const [search, setSearch] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData>({}); 

  const searchPressed = () => (
    fetch(`${api.base}weather?q=${search}&units=metric&appid=${api.key}`)
    .then((response) => response.json())
    .then((data) => setWeather(data))
  )

  return(
    <main className="flex min-h-screen items-center justify-center flex-col bg-purple-600">
    <div className="relative w-full max-w-md">
      <div className="flex items-center bg-white rounded-full shadow-md p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a4 4 0 11-8 0 4 4 0 018 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search Place"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-4 text-gray-800 bg-transparent focus:outline-none"
        />
      </div>
      <button
        onClick={searchPressed}
        className="absolute right-4 top-4 text-gray-700"
      >Search
      </button>
    </div>

    {weather.name && (
      <div className="bg-purple-800 mt-8 p-6 rounded-lg shadow-lg w-full max-w-md text-white">
        <p className="text-lg">City: {weather.name}</p>
        <p className="text-lg">Temperature: {weather.main?.temp}°C</p>
        <p className="text-lg">Description: {weather.weather?.[0]?.description}</p>
        <p className="text-lg">Wind Speed: {weather.wind?.speed} m/s</p>
      </div>
    )}
  </main>
  )
}