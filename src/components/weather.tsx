"use client"

import { useState, useEffect } from "react"
import { format, addHours, addDays } from "date-fns"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"
import {  Sun, Cloud, CloudRain, CloudSnow } from "lucide-react" // deleted Umbrella
import type { WeatherWindow } from "@/lib/types" // deleted WeatherData, ProcessedHour

export default function WeatherApp() {
  // const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [dryWindows, setDryWindows] = useState<WeatherWindow[]>([])
  // const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })

        const response = await fetch(
          `/api/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        )

        if (!response.ok) throw new Error('Weather API failed')
        
        const data = await response.json()
        
        if (!data?.current || !data?.hourly) {
          throw new Error('Invalid weather data format')
        }

        // setWeatherData(data.current)
        setDryWindows(processDryWindows(data.hourly))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather data')
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

const processDryWindows = (hourly: WeatherWindow[]): WeatherWindow[] => {
  // Create 2 maps for Dry and Fallback Windows
  const dailyDryWindows = new Map<string, WeatherWindow>()
  const dailyFallbackWindows = new Map<string, WeatherWindow>()
  const endDate = addDays(new Date(), 5)

  // First pass: Find best dry windows and track all potential fallbacks
  for (const hour of hourly) {
    const date = new Date(hour.date)
    if (date > endDate) break

    const hours = date.getHours()
    const dayKey = format(date, 'yyyy-MM-dd')
    
    // Only consider 8am-6pm windows for both dry and fallback
    if (hours >= 8 && hours < 18) {
      // Track best dry window
      if (hour.isDry) {
        const currentDryBest = dailyDryWindows.get(dayKey)
        if (!currentDryBest || hour.temperature > currentDryBest.temperature) {
          dailyDryWindows.set(dayKey, {
            ...hour,
            date: date,
            startTime: date,
            endTime: addHours(date, 1)
          })
        }
      }

      // Track best fallback window (regardless of dry status)
      const currentFallbackBest = dailyFallbackWindows.get(dayKey)
      if (!currentFallbackBest || hour.temperature > currentFallbackBest.temperature) {
        dailyFallbackWindows.set(dayKey, {
          ...hour,
          date: date,
          startTime: date,
          endTime: addHours(date, 1),
          isDry: false // Mark as not dry for fallback
        })
      }
    }
  }

  // Generate results for next 5 days
  const results: WeatherWindow[] = []
  const today = new Date()
  
  for (let i = 0; i < 5; i++) {
    const currentDay = addDays(today, i)
    const dayKey = format(currentDay, 'yyyy-MM-dd')
    
    const bestWindow = dailyDryWindows.get(dayKey) || dailyFallbackWindows.get(dayKey)
    
    if (bestWindow) {
      results.push(bestWindow)
    }
  }

  return results.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 5)
}

  const WeatherIcon = ({ condition }: { condition: string }) => {
    const iconProps = { size: 48, className: "mb-4" }
    switch (condition) {
      case "sunny": return <Sun {...iconProps} />
      case "cloudy": return <Cloud {...iconProps} />
      case "rainy": return <CloudRain {...iconProps} />
      case "snowy": return <CloudSnow {...iconProps} />
      default: return <Cloud {...iconProps} />
    }
  }

  if (loading) return <div className="text-center p-8">Loading weather data...</div>
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Carousel opts={{ align: "start", slidesToScroll: 1 }} className="w-full">
        <CarouselContent>
          {dryWindows.map((window, index) => (
            <CarouselItem key={index} className="basis-1/3">
              <Card className="p-6 text-center">
                <WeatherIcon condition={window.condition} />
                <h3 className="text-xl font-semibold mb-2">
                  {format(window.startTime, "MMM d")}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {format(window.startTime, "h:mm a")} - {format(window.endTime, "h:mm a")}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Sun size={16} />
                  <span className="text-sm font-medium">
                  {window.isDry ? 'Perfect for Walking!' : 'Not ideal but best of the rest!'}
                  </span>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

// Moved outside the component
// function mapWeatherCondition(weatherId: number): string {
//   if (weatherId >= 200 && weatherId < 300) return 'stormy'
//   if (weatherId >= 300 && weatherId < 600) return 'rainy'
//   if (weatherId >= 600 && weatherId < 700) return 'snowy'
//   if (weatherId === 800) return 'sunny'
//   if (weatherId > 800) return 'cloudy'
//   return 'partly-cloudy'
// }