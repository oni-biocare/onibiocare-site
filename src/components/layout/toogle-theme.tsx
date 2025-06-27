import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="sm"
      variant="ghost"
      className="w-full justify-start"
    >

      {theme === "dark" ? (
        <div className="dark:flex gap-2 hidden">
          <Moon className="size-5" />
          <span className="block lg:hidden">Dark</span>
        </div>
      ) : (

        <div className="dark:flex gap-2 hidden">
          <Sun className="size-5" />
          <span className="block lg:hidden">Light</span>
        </div>
      )
      }
    </Button>
  );
};
