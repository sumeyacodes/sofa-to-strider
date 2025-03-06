import { addDays, addHours, format } from "date-fns";
import { WeatherWindow } from "@/lib/types";

export const processDryWindows = (hourly: WeatherWindow[]): WeatherWindow[] => {
  // Create 2 maps for Dry and Fallback Windows
  const dailyDryWindows = new Map<string, WeatherWindow>();
  const dailyFallbackWindows = new Map<string, WeatherWindow>();
  const endDate = addDays(new Date(), 5);

  // First pass: Find best dry windows and track all potential fallbacks
  for (const hour of hourly) {
    const date = new Date(hour.date);
    if (date > endDate) break;

    const hours = date.getHours();
    const dayKey = format(date, "yyyy-MM-dd");

    // Only consider 8am-6pm windows for both dry and fallback
    if (hours >= 8 && hours < 18) {
      // Track best dry window
      if (hour.isDry) {
        const currentDryBest = dailyDryWindows.get(dayKey);
        if (!currentDryBest || hour.temperature > currentDryBest.temperature) {
          dailyDryWindows.set(dayKey, {
            ...hour,
            date: date,
            startTime: date,
            endTime: addHours(date, 1),
          });
        }
      }

      // Track best fallback window (regardless of dry status)
      const currentFallbackBest = dailyFallbackWindows.get(dayKey);

      if (
        !currentFallbackBest ||
        hour.temperature > currentFallbackBest.temperature
      ) {
        dailyFallbackWindows.set(dayKey, {
          ...hour,
          date: date,
          startTime: date,
          endTime: addHours(date, 1),
          isDry: false, // Mark as not dry for fallback
        });
      }
    }
  }

  // Generate results for next 5 days
  const results: WeatherWindow[] = [];
  const today = new Date();

  for (let i = 0; i < 5; i++) {
    const currentDay = addDays(today, i);
    const dayKey = format(currentDay, "yyyy-MM-dd");

    const bestWindow =
      dailyDryWindows.get(dayKey) || dailyFallbackWindows.get(dayKey);

    if (bestWindow) {
      results.push(bestWindow);
    }
  }

  return results
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);
};
