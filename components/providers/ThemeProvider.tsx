// components/providers/ThemeProvider.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  resolvedTheme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  const applyTheme = (t: Theme) => {
    const isDark =
      t === "dark" ||
      (t === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
    setResolvedTheme(isDark ? "dark" : "light");
  };

  useEffect(() => {
    const stored = localStorage.getItem("pmpath-theme") as Theme | null;
    const initial = stored ?? "light";
    setThemeState(initial);
    applyTheme(initial);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("pmpath-theme", t);
    applyTheme(t);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// Inline script to prevent flash - add to <head>
export function ThemeScript() {
  const script = `
    (function(){
      try{
        var t=localStorage.getItem('pmpath-theme')||'light';
        var isDark=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme:dark)').matches);
        if(isDark) document.documentElement.classList.add('dark');
      }catch(e){}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
