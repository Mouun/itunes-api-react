import { useState, useEffect } from "react";

export const toggleDarkMode = () => {
  if ("theme" in localStorage) {
    switch (localStorage.theme) {
      case "dark":
        localStorage.theme = "light";
        document.documentElement.classList.remove("dark");
        break;
      default:
        localStorage.theme = "dark";
        document.documentElement.classList.add("dark");
        break;
    }
  } else {
    localStorage.theme = "dark";
    document.documentElement.classList.add("dark");
  }
}

export const isDarkModeEnabled = () => {
  if (!("theme" in localStorage)) return false;
  switch (localStorage.theme) {
    case "dark":
      return true;
    default:
      return false;
  }
}

/**
 * Enables darkmode by default on first page visit
 */
export const enableDarkModeIfNeeded = () => {
  if (!("theme" in localStorage)) {
    localStorage.theme = "dark";
  } else {
    switch (localStorage.theme) {
      case "light":
        document.documentElement.classList.remove("dark");
        break;
      default:
        document.documentElement.classList.add("dark");
        break;
    }
  }
}

/**
 * Custom hook watching the dark mode status
 * @returns {boolean} is dark mode enabled
 */
export const useDarkModeStatus = () => {
  const [isEnabled, setIsEnabled] = useState(isDarkModeEnabled);

  useEffect(() => {
    const mutationObserver = new MutationObserver((mutations => {
      mutations.forEach(mu => {
        if (mu.type !== "attributes" && mu.attributeName !== "class") return;
        setIsEnabled(mu.target.classList.contains("dark"));
      })
    }));
    mutationObserver.observe(document.documentElement, {attributes: true});
  });

  return isEnabled;
}
