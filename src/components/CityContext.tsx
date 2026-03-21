"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

type CityContextType = {
  selectedCity: string | null;
  setSelectedCity: (city: string | null) => void;
};

const CityContext = createContext<CityContextType>({
  selectedCity: null,
  setSelectedCity: () => {},
});

export function CityProvider({ children }: { children: ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  return useContext(CityContext);
}
