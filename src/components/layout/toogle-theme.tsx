"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render nothing on the server — avoids sun/moon hydration mismatch
  if (!mounted) return <div className="size-9" />;

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="sm"
      variant="ghost"
      className="w-full justify-start"
    >
      {theme === "dark" ? (
        <div className="flex gap-2">
          <Moon className="size-5" />
          <span className="block lg:hidden">Dark</span>
        </div>
      ) : (
        <div className="flex gap-2">
          <Sun className="size-5" />
          <span className="block lg:hidden">Light</span>
        </div>
      )}
    </Button>
  );
};
