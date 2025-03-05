export interface WeatherData {
    condition: string
    temperature: number
    date: Date
    location: string
  }
  
  export interface WeatherWindow {
    date: Date
    isDry: boolean
    startTime: Date
    endTime: Date
    condition: string // Add condition to the interface
    temperature: number // Add temperature field
  }
  
  export interface WeatherData {
    condition: string
    temperature: number
    date: Date
    location: string
  }
  
  export interface OpenWeatherResponse {
    current: WeatherData
    hourly: WeatherWindow[]
  }

  export interface ProcessedHour {
    date: string | Date
    startTime: string | Date
    endTime: string | Date
    isDry: boolean
    condition: string
  }
