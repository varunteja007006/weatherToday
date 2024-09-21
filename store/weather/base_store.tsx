import { create } from "zustand";

type TLocationPoints = {
  lat: number | string | null;
  lon: number | string | null;
};

export type TWeatherLocationStore = {
  location: TLocationPoints;
  name: string | null;
  weather: any;
  updateLocation: (newLocation: TLocationPoints) => void;
  updateName: (newName: string | null) => void;
  updateWeather: (newWeather: any) => void;
};

const useLocationStore = create<TWeatherLocationStore>((set) => ({
  location: { lat: null, lon: null },
  name: "",
  weather: null,
  updateLocation: (newLocation: TLocationPoints) =>
    set({ location: newLocation }),
  updateName: (newName: string | null) => set({ name: newName }),
  updateWeather: (newWeather: any) => set({ weather: newWeather }),
}));

export { useLocationStore };
