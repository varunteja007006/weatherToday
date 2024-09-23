"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useLocationStore } from "@/store/weather/base_store";
import { useQuery } from "react-query";
import { Weather } from "@/api/weather.api";
import _ from "lodash";
import useGeolocation from "@/hooks/useGeoLocation";
import Image from "next/image";
import {
  ChartColumn,
  Cloud,
  Droplet,
  Droplets,
  Eye,
  Gauge,
  MapPinned,
  Sparkles,
  Sunrise,
  Sunset,
  Thermometer,
} from "lucide-react";
import { tempConverter } from "@/utils/temp.utils";
import { motion } from "framer-motion";
import { formatDate } from "@/utils/helper.utils";
import { cn } from "@/lib/utils";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const API_FLAG = true; // ! API LIMIT SO DISABLED TEMP

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

export default function WeatherComp() {
  const store = useLocationStore((state) => state);
  const { geolocation, error, loading } = useGeolocation();

  const getCurrentWeather = useQuery(
    ["currentWeather", store.location],
    () => Weather.getCurrentWeather(store.location),
    {
      enabled: !!store.location.lat && !!store.location.lon && API_FLAG,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
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
              <div>Date: {formatDate(store.weather?.current?.dt)}</div>
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
        <CustomCard title="Weather Description">
          {store.weather?.current?.weather?.[0]?.description}
        </CustomCard>
        <CustomCard
          title="Location Info"
          Icon={<MapPinned className="w-6 h-6" />}
        >
          <div>Latitude: {_.round(store.weather?.lat, 2)}</div>
          <div>Longitude: {_.round(store.weather?.lon, 2)}</div>
        </CustomCard>
        <CustomCard
          title="Temperature Info"
          Icon={<Thermometer className="w-6 h-6" />}
        >
          <div>
            Temperature:{" "}
            {tempConverter(store.weather?.current?.temp, store.tempUnit)}
          </div>
          <div>
            Feels Like:{" "}
            {tempConverter(store.weather?.current?.feels_like, store.tempUnit)}
          </div>
        </CustomCard>
        <CustomCard title="">
          <CustomList title="Sunrise:" Icon={<Sunrise className="w-6 h-6" />}>
            {formatDate(store.weather?.current?.sunrise)}
          </CustomList>
          <CustomList title="Sunset:" Icon={<Sunset className="w-6 h-6" />}>
            {formatDate(store.weather?.current?.sunset)}
          </CustomList>
        </CustomCard>
        <CustomCard title="" className="col-span-full">
          <CustomList
            title="Pressure:"
            Icon={<Gauge className="w-6 h-6 mr-1" />}
          >
            {store.weather?.current?.pressure} hPa
          </CustomList>
          <CustomList
            title="Visibility:"
            Icon={<Eye className="w-6 h-6 mr-1" />}
          >
            {store.weather?.current?.visibility} m
          </CustomList>
          <CustomList title="Clouds:" Icon={<Cloud className="w-6 h-6 mr-1" />}>
            {store.weather?.current?.clouds} %
          </CustomList>
          <CustomList
            title="Humidity:"
            Icon={<Droplet className="w-6 h-6 mr-1" />}
          >
            {store.weather?.current?.humidity}
          </CustomList>
          <CustomList
            title="UV Index:"
            Icon={<ChartColumn className="w-6 h-6 mr-1" />}
          >
            {store.weather?.current?.uvi}
          </CustomList>
          <CustomList title="Dew:" Icon={<Droplets className="w-6 h-6 mr-1" />}>
            {store.weather?.current?.dew_point}
          </CustomList>
        </CustomCard>
      </CardContent>

      {/* <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer> */}
    </Card>
  );
}

function CustomCard({
  children,
  title,
  className,
  Icon,
}: Readonly<{
  children: React.ReactNode;
  title?: string;
  className?: string;
  Icon?: React.ReactNode;
}>) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.05 }}
      drag="x"
      dragConstraints={{ left: -100, right: 100 }}
      className={cn("p-3 hover:shadow border rounded-md space-y-2", className)}
    >
      {title && (
        <div className="font-semibold text-lg flex items-center gap-2 justify-between">
          {title} {Icon || null}
        </div>
      )}
      {children}
    </motion.div>
  );
}

function CustomList({
  children,
  Icon,
  title,
}: Readonly<{
  children: React.ReactNode;
  Icon?: React.ReactNode;
  title?: string;
}>) {
  return (
    <div className="flex items-start gap-2">
      {Icon || null}
      {title && <strong>{title}</strong>} {children}
    </div>
  );
}
