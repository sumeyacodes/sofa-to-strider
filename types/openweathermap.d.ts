declare module 'openweathermap-types' {
    export interface CurrentWeather {
      dt: number
      temp: number
      feels_like: number
      pressure: number
      humidity: number
      weather: Weather[]
      clouds: number
      wind_speed: number
      wind_deg: number
    }
  
    export interface HourlyWeather {
      dt: number
      temp: number
      feels_like: number
      pressure: number
      humidity: number
      dew_point: number
      uvi: number
      clouds: number
      visibility: number
      wind_speed: number
      wind_deg: number
      weather: Weather[]
      pop: number
    }
  
    export interface Weather {
      id: number
      main: string
      description: string
      icon: string
    }
  
    export interface OneCallResponse {
      lat: number
      lon: number
      timezone: string
      timezone_offset: number
      current: CurrentWeather
      hourly: HourlyWeather[]
    }
  }