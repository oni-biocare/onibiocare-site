"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * Forces dark mode for the /dose route tree using next-themes.
 * Saves the previous theme on mount, switches to "dark",
 * and restores the original theme when the user navigates away.
 */
export function DoseDarkMode() {
    const { setTheme, theme } = useTheme();

    useEffect(() => {
        const previous = theme;
        setTheme("dark");
        return () => {
            // Restore the previous theme when leaving /dose
            if (previous) setTheme(previous);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
