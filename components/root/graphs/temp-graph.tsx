"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useLocationStore } from "@/store/weather/base_store";
import { formatDate } from "@/utils/helper.utils";

export const description = "An area chart with gradient fill";

const chartConfig = {
  temp: {
    label: "Temperature",
    color: "hsl(var(--chart-1))",
  },
  feels_like: {
    label: "Feels Like",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function TempGraph() {
  const store = useLocationStore((state) => state);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature Chart - Gradient</CardTitle>
        <CardDescription>Showing hourly temperature</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={store.weather?.hourly || []}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => formatDate(value) ?? ""}
              includeHidden
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillTemp" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-temp)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-temp)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillFeels_Like" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-feels_like)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-feels_like)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="feels_like"
              type="natural"
              fill="url(#fillFeels_Like)"
              fillOpacity={0.4}
              stroke="var(--color-feels_like)"
              stackId="a"
            />
            <Area
              dataKey="temp"
              type="natural"
              fill="url(#fillTemp)"
              fillOpacity={0.4}
              stroke="var(--color-temp)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
