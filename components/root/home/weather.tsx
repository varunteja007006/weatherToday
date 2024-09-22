"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useLocationStore } from "@/store/weather/base_store";
import { useQuery } from "react-query";
import { Weather } from "@/api/weather.api";
import _ from "lodash";
import useGeolocation from "@/hooks/useGeoLocation";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { format } from "date-fns";
import { tempConverter } from "@/utils/temp.utils";

export default function WeatherComp() {
  const store = useLocationStore((state) => state);
  const { geolocation, error, loading } = useGeolocation();

  const getCurrentWeather = useQuery(
    ["currentWeather", store.location],
    () => Weather.getCurrentWeather(store.location),
    {
      enabled: !!store.location.lat && !!store.location.lon && false, // ! API LIMIT SO DISABLED TEMP
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
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="flex items-start gap-2 justify-between">
          <div>
            Weather
            <div className="text-sm space-y-2 text-neutral-500 mt-2">
              <div>Timezone: {store.weather?.timezone}</div>
              <div>
                Date:{" "}
                {store.weather?.current &&
                  format(new Date(store.weather?.current?.dt * 1000), "PPpp")}
              </div>
            </div>
          </div>
          <div>
            <div className="border p-1 border-orange-300 bg-orange-500 rounded-full inline-flex items-center justify-center">
              {store.weather?.current?.weather?.[0] ? (
                <Image
                  src={`https://openweathermap.org/img/wn/${store.weather?.current?.weather?.[0]?.icon}.png`}
                  width={50}
                  height={50}
                  alt="weather-icon"
                />
              ) : (
                <Sparkles className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="text-sm text-center">
              {store.weather?.current?.weather?.[0]?.main}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-3">
        <CustomCard>
          <div className="font-semibold text-lg">Weather Description</div>
          {store.weather?.current?.weather?.[0]?.description}
        </CustomCard>
        <CustomCard>
          <div className="font-semibold text-lg">Location Info</div>
          <div>Latitude: {_.round(store.weather?.lat, 2)}</div>
          <div>Longitude: {_.round(store.weather?.lon, 2)}</div>
        </CustomCard>
        <CustomCard>
          <div className="font-semibold text-lg">Temperature</div>
          <div>
            Temperature:{" "}
            {tempConverter(store.weather?.current?.temp, store.tempUnit)}
          </div>
          <div>
            Feels Like:{" "}
            {tempConverter(store.weather?.current?.feels_like, store.tempUnit)}
          </div>
        </CustomCard>
      </CardContent>
    </Card>
  );
}

function CustomCard({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Card className="p-3 hover:shadow">{children}</Card>;
}
