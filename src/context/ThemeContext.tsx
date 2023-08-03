"use client"

import React, { createContext, useState, FC, ReactNode } from "react";

interface ThemeContextValue {
  toggle: () => void;
  mode: string;
}

export const ThemeContext = createContext<ThemeContextValue>({
  toggle: () => {},
  mode: "dark",
});

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;