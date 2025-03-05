// app/api/weather/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

type OpenWeatherResponse = {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: {
    dt: number
    temp: number
    weather: {
      id: number
      main: string
      description: string
      icon: string
    }[]
  }
  hourly: {
    dt: number
    temp: number
    pop: number
    weather: {
      id: number
      main: string
      description: string
      icon: string
    }[]
  }[]
}

export type WeatherData = {
  condition: string
  temperature: number
  date: Date
  location: string
}

export type WeatherWindow = {
  date: Date
  startTime: Date
  endTime: Date
  isDry: boolean
  condition: string
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Missing location parameters' },
      { status: 400 }
    )
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily&units=metric&appid=${apiKey}`
    )

    if (!response.ok) {
      throw new Error(`OpenWeather API error: ${response.statusText}`)
    }

    const data: OpenWeatherResponse = await response.json()
    
    return NextResponse.json({
      current: processCurrentWeather(data),
      hourly: processHourlyWeather(data)
    })

  } catch (error) {
    console.error('Weather API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}

function processCurrentWeather(data: OpenWeatherResponse): WeatherData {
  return {
    condition: mapWeatherCondition(data.current.weather[0].id),
    temperature: Math.round(data.current.temp),
    date: new Date((data.current.dt + data.timezone_offset) * 1000),
    location: 'Current Location'
  }
}

function processHourlyWeather(data: OpenWeatherResponse): WeatherWindow[] {
  return data.hourly.map((hour) => ({
    date: new Date((hour.dt + data.timezone_offset) * 1000),
    startTime: new Date((hour.dt + data.timezone_offset) * 1000),
    endTime: new Date((hour.dt + data.timezone_offset + 3600) * 1000),
    isDry: hour.pop < 0.2 && !hour.weather.some(w => w.id >= 500 && w.id < 600),
    condition: mapWeatherCondition(hour.weather[0].id)
  }))
}

function mapWeatherCondition(weatherId: number): string {
  if (weatherId >= 200 && weatherId < 300) return 'stormy'
  if (weatherId >= 300 && weatherId < 600) return 'rainy'
  if (weatherId >= 600 && weatherId < 700) return 'snowy'
  if (weatherId === 800) return 'sunny'
  if (weatherId > 800) return 'cloudy'
  return 'partly-cloudy'
}

