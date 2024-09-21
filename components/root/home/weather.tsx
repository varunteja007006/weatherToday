"use client";

import { useLocationStore } from "@/store/weather/base_store";
import React from "react";
import { useQuery } from "react-query";
import { Weather } from "@/api/weather.api";
import _ from "lodash";
import useGeolocation from "@/hooks/useGeoLocation";

export default function WeatherComp() {
  const store = useLocationStore((state) => state);
  const { geolocation, error, loading } = useGeolocation();

  const getCurrentWeather = useQuery(
    ["currentWeather", store.location],
    () => Weather.getCurrentWeather(store.location),
    {
      enabled: !!store.location.lat && !!store.location.lon,
    }
  );

  React.useEffect(() => {
    if (getCurrentWeather.data) {
      if (!_.isEmpty(getCurrentWeather.data.data)) {
        store.updateWeather(getCurrentWeather.data.data);
      }
    }
  }, [getCurrentWeather.data]);

  React.useEffect(() => {
    if (geolocation && !error && !loading) {
      store.updateLocation({
        lat: geolocation.latitude,
        lon: geolocation.longitude,
      });
    }
  }, [geolocation, loading, error]);

  return (
    <div>
      Weather
      <div>{store.weather?.timezone}</div>
      <div>{store.location.lat}</div>
      <div>{store.location.lon}</div>
    </div>
  );
}
