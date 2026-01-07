import { Sun, Moon, Monitor } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu/dropdown-menu";
import style from "./color-scheme-toggle.module.css";

interface ColorSchemeToggleProps {
  triggerText?: boolean;
  optionText?: boolean;
}

const ICON_LABEL = {
  light: { icon: <Sun />, label: "Light" },
  dark: { icon: <Moon />, label: "Dark" },
  system: { icon: <Monitor />, label: "System" },
};

function useColorSchemeClient() {
  const [scheme, setScheme] = useState<{ configScheme: "light" | "dark" | "system"; resolvedScheme: "light" | "dark" }>({ configScheme: "system", resolvedScheme: "light" });
  
  useEffect(() => {
    const api = typeof window !== "undefined" ? (window as any).colorSchemeApi : null;
    if (api) {
      const updateScheme = () => {
        const { config, resolved } = api.currentState;
        setScheme({
          configScheme: config,
          resolvedScheme: resolved,
        });
      };
      updateScheme();
      return api.subscribe(() => updateScheme());
    }
  }, []);
  
  const setColorScheme = (config: "light" | "dark" | "system") => {
    const api = typeof window !== "undefined" ? (window as any).colorSchemeApi : null;
    if (api) {
      api.config = config;
    }
  };
  
  return { ...scheme, setColorScheme };
}

export function ColorSchemeToggle({ triggerText = false, optionText = true }: ColorSchemeToggleProps) {
  const { configScheme, resolvedScheme, setColorScheme } = useColorSchemeClient();
  const { icon, label } = ICON_LABEL[resolvedScheme];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle color scheme">
          {icon}
          {triggerText && label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => setColorScheme("light")}
          className={style.option}
          data-selected={configScheme === "light"}
        >
          {ICON_LABEL.light.icon}
          {optionText && ICON_LABEL.light.label}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setColorScheme("dark")}
          className={style.option}
          data-selected={configScheme === "dark"}
        >
          {ICON_LABEL.dark.icon}
          {optionText && ICON_LABEL.dark.label}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setColorScheme("system")}
          className={style.option}
          data-selected={configScheme === "system"}
        >
          {ICON_LABEL.system.icon}
          {optionText && ICON_LABEL.system.label}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
