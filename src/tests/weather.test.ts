import { expect, test } from "vitest";
import { processDryWindows } from "../utils/get-weather";
import type { WeatherWindow } from "@/lib/types";

const hourlyData: WeatherWindow[] = [
  {
    date: new Date("2025-03-06T09:00:00.000Z"), // 9am
    startTime: new Date("2025-03-06T09:00:00.000Z"),
    endTime: new Date("2025-03-06T10:00:00.000Z"),
    isDry: true,
    condition: "cloudy",
    temperature: 22.5,
  },
  {
    date: new Date("2025-03-06T12:00:00.000Z"), // 12pm
    startTime: new Date("2025-03-06T12:00:00.000Z"),
    endTime: new Date("2025-03-06T13:00:00.000Z"),
    isDry: true,
    condition: "sunny",
    temperature: 28.05, // Highest temperature
  },
  {
    date: new Date("2025-03-06T15:00:00.000Z"), // 3pm
    startTime: new Date("2025-03-06T15:00:00.000Z"),
    endTime: new Date("2025-03-06T16:00:00.000Z"),
    isDry: true,
    condition: "cloudy",
    temperature: 25.17,
  },
];

// Data for testing wet vs dry windows
const mixedWeatherData: WeatherWindow[] = [
  {
    date: new Date("2025-03-06T09:00:00.000Z"),
    startTime: new Date("2025-03-06T09:00:00.000Z"),
    endTime: new Date("2025-03-06T10:00:00.000Z"),
    isDry: false,
    condition: "rainy",
    temperature: 30.0, // Higher temperature but wet
  },
  {
    date: new Date("2025-03-06T12:00:00.000Z"),
    startTime: new Date("2025-03-06T12:00:00.000Z"),
    endTime: new Date("2025-03-06T13:00:00.000Z"),
    isDry: true,
    condition: "sunny",
    temperature: 25.0, // Lower temperature but dry
  },
];

// Data for testing fallback to wet windows
const allWetData: WeatherWindow[] = [
  {
    date: new Date("2025-03-06T09:00:00.000Z"),
    startTime: new Date("2025-03-06T09:00:00.000Z"),
    endTime: new Date("2025-03-06T10:00:00.000Z"),
    isDry: false,
    condition: "rainy",
    temperature: 22.5,
  },
  {
    date: new Date("2025-03-06T12:00:00.000Z"),
    startTime: new Date("2025-03-06T12:00:00.000Z"),
    endTime: new Date("2025-03-06T13:00:00.000Z"),
    isDry: false,
    condition: "rainy",
    temperature: 28.05, // Highest temperature
  },
];

test("should return the dry window with highest temperature during valid hours", () => {
  // ARRANGE: define expected result
  const expected = hourlyData[1];
  // ACT: Call the function that processes the weather windows
  const actualData = processDryWindows(hourlyData);

  // ASSERT: Check if the result has the highest temperature
  expect(actualData[0].temperature).toBe(expected.temperature);
  expect(actualData[0].date).toEqual(expected.date);
  expect(actualData[0].condition).toBe("sunny");
});

test("should prefer dry window over wet window even with lower temperature", () => {
  // ARRANGE: define expected result
  const expected = mixedWeatherData[1];
  // ACT: Call the function that processes the weather windows
  const actualData = processDryWindows(mixedWeatherData);

  // ASSERT: Check if it chose the dry window
  expect(actualData[0].isDry).toBe(expected.isDry);
  expect(actualData[0].temperature).toBe(25.0);
  expect(actualData[0].condition).toBe("sunny");
});

test("should use wet window with highest temperature when no dry windows available", () => {
  // ARRANGE: define expected result
  const expected = allWetData[1];
  // ACT: Call the function that processes the weather windows
  const actualData = processDryWindows(allWetData);

  // ASSERT: Check if it chose the highest temperature wet window
  expect(actualData[0].isDry).toBe(expected.isDry);
  expect(actualData[0].temperature).toBe(expected.temperature);
  expect(actualData[0].condition).toBe("rainy");
});
