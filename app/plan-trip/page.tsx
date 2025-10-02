"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AppHeader } from "@/components/app-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import {
  MapPin,
  Droplets,
  Trash2,
  Coffee,
  CloudRain,
  AlertTriangle,
  Mountain,
  TreePine,
  Waves,
  Thermometer,
  Wind,
  Eye,
  Umbrella,
  Shield,
  Navigation,
  Clock,
  Snowflake,
  Sun,
  Home,
  Church,
  ShoppingBag,
  Castle,
  Building,
  Cloud,
  Car,
} from "lucide-react"

interface Suggestion {
  id: string
  name: string
  type:
    | "waterfall"
    | "temple"
    | "adventure"
    | "viewpoint"
    | "shopping"
    | "cultural"
    | "wellness"
    | "heritage"
    | "nature"
    | "pilgrimage"
    | "hill-station"
    | "engineering"
  description: string
  distance: string
  icon: any
}

interface EcoStop {
  id: string
  name: string
  type: "water" | "waste" | "cafe"
  location: string
  icon: any
}

interface WeatherData {
  temperature: string
  condition: string
  humidity: string
  windSpeed: string
  visibility: string
  uvIndex: string
  precipitation: string
  icon: any
}

interface SafetyAlert {
  type: "landslide" | "roadblock" | "weather" | "traffic" | "safety" | "altitude" | "river" | "road"
  severity: "low" | "medium" | "high"
  message: string
  location: string
  icon: any
  color: string
}

export default function PlanTripPage() {
  const router = useRouter()
  const [destination, setDestination] = useState("")
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [ecoStops, setEcoStops] = useState<EcoStop[]>([])
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([])
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [safetyAlerts, setSafetyAlerts] = useState<SafetyAlert[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchWeatherAndSafety = async (dest: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const location = dest.toLowerCase()

    if (location.includes("bilaspur")) {
      setWeatherData({
        temperature: "18-25°C",
        condition: "Clear Skies",
        humidity: "65%",
        windSpeed: "12 km/h",
        visibility: "10 km",
        uvIndex: "Moderate (6)",
        precipitation: "0%",
        icon: Sun,
      })

      setSafetyAlerts([
        {
          type: "weather",
          severity: "low",
          message: "Perfect weather conditions for outdoor activities. No weather warnings.",
          location: "Bilaspur Region",
          icon: Shield,
          color: "text-green-600 bg-green-50 border-green-200",
        },
        {
          type: "landslide",
          severity: "low",
          message: "Road conditions are good. No landslide warnings reported.",
          location: "Bilaspur-Shimla Highway",
          icon: Mountain,
          color: "text-green-600 bg-green-50 border-green-200",
        },
      ])
    } else if (location.includes("shimla")) {
      setWeatherData({
        temperature: "12-20°C",
        condition: "Partly Cloudy",
        humidity: "70%",
        windSpeed: "15 km/h",
        visibility: "8 km",
        uvIndex: "High (8)",
        precipitation: "10%",
        icon: Cloud,
      })

      setSafetyAlerts([
        {
          type: "weather",
          severity: "medium",
          message: "Light rain expected in evening. Carry umbrella and warm clothes.",
          location: "Shimla Hills",
          icon: CloudRain,
          color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        },
        {
          type: "traffic",
          severity: "medium",
          message: "Heavy tourist traffic on Mall Road. Use alternate routes.",
          location: "Mall Road Area",
          icon: Car,
          color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        },
      ])
    } else if (location.includes("manali")) {
      setWeatherData({
        temperature: "8-18°C",
        condition: "Snow Showers",
        humidity: "80%",
        windSpeed: "20 km/h",
        visibility: "5 km",
        uvIndex: "Low (3)",
        precipitation: "60%",
        icon: Snowflake,
      })

      setSafetyAlerts([
        {
          type: "weather",
          severity: "high",
          message: "Heavy snowfall expected. Carry chains for vehicles and warm clothing.",
          location: "Manali-Rohtang Route",
          icon: Snowflake,
          color: "text-red-600 bg-red-50 border-red-200",
        },
        {
          type: "landslide",
          severity: "medium",
          message: "Possible road blocks due to snow. Check road conditions before travel.",
          location: "High Altitude Areas",
          icon: Mountain,
          color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        },
      ])
    } else if (location.includes("dharamshala") || location.includes("mcleod")) {
      setWeatherData({
        temperature: "15-22°C",
        condition: "Heavy Rain",
        humidity: "85%",
        windSpeed: "18 km/h",
        visibility: "6 km",
        uvIndex: "Low (2)",
        precipitation: "80%",
        icon: CloudRain,
      })

      setSafetyAlerts([
        {
          type: "weather",
          severity: "high",
          message: "Heavy monsoon rains. Risk of flash floods and landslides.",
          location: "Dharamshala Region",
          icon: CloudRain,
          color: "text-red-600 bg-red-50 border-red-200",
        },
        {
          type: "landslide",
          severity: "high",
          message: "Landslide warnings issued. Avoid travel on mountain roads.",
          location: "McLeod Ganj-Dharamshala Road",
          icon: Mountain,
          color: "text-red-600 bg-red-50 border-red-200",
        },
      ])
    } else if (location.includes("kasol") || location.includes("parvati")) {
      setWeatherData({
        temperature: "10-25°C",
        condition: "Clear",
        humidity: "60%",
        windSpeed: "8 km/h",
        visibility: "12 km",
        uvIndex: "High (7)",
        precipitation: "5%",
        icon: Sun,
      })

      setSafetyAlerts([
        {
          type: "safety",
          severity: "medium",
          message: "River levels high due to snowmelt. Exercise caution near Parvati River.",
          location: "Parvati Valley",
          icon: Waves,
          color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        },
      ])
    } else if (location.includes("spiti")) {
      setWeatherData({
        temperature: "-5-10°C",
        condition: "Clear, Dry",
        humidity: "30%",
        windSpeed: "25 km/h",
        visibility: "15 km",
        uvIndex: "Very High (9)",
        precipitation: "0%",
        icon: Sun,
      })

      setSafetyAlerts([
        {
          type: "altitude",
          severity: "high",
          message: "High altitude area (3800m+). Risk of altitude sickness. Acclimatize properly.",
          location: "Spiti Valley",
          icon: Mountain,
          color: "text-red-600 bg-red-50 border-red-200",
        },
        {
          type: "weather",
          severity: "medium",
          message: "Extreme cold and dry conditions. Carry adequate warm clothing and water.",
          location: "High Altitude Desert",
          icon: Thermometer,
          color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        },
      ])
    } else if (location.includes("kullu")) {
      setWeatherData({
        temperature: "12-28°C",
        condition: "Pleasant",
        humidity: "65%",
        windSpeed: "10 km/h",
        visibility: "10 km",
        uvIndex: "Moderate (5)",
        precipitation: "15%",
        icon: Sun,
      })

      setSafetyAlerts([
        {
          type: "traffic",
          severity: "medium",
          message: "Tourist season peak. Expect heavy traffic on Kullu-Manali highway.",
          location: "Kullu Valley",
          icon: Car,
          color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        },
      ])
    } else if (location.includes("dalhousie")) {
      setWeatherData({
        temperature: "10-20°C",
        condition: "Misty",
        humidity: "75%",
        windSpeed: "12 km/h",
        visibility: "7 km",
        uvIndex: "Moderate (4)",
        precipitation: "25%",
        icon: Cloud,
      })

      setSafetyAlerts([
        {
          type: "weather",
          severity: "low",
          message: "Misty conditions in morning and evening. Drive carefully on winding roads.",
          location: "Dalhousie Hills",
          icon: Cloud,
          color: "text-green-600 bg-green-50 border-green-200",
        },
      ])
    } else if (location.includes("chamba")) {
      setWeatherData({
        temperature: "14-26°C",
        condition: "Partly Cloudy",
        humidity: "68%",
        windSpeed: "14 km/h",
        visibility: "9 km",
        uvIndex: "Moderate (6)",
        precipitation: "20%",
        icon: Cloud,
      })

      setSafetyAlerts([
        {
          type: "river",
          severity: "medium",
          message: "Ravi River levels elevated. Exercise caution during river activities.",
          location: "Chamba Town",
          icon: Waves,
          color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        },
      ])
    } else if (location.includes("palampur")) {
      setWeatherData({
        temperature: "16-24°C",
        condition: "Pleasant",
        humidity: "70%",
        windSpeed: "8 km/h",
        visibility: "12 km",
        uvIndex: "Moderate (5)",
        precipitation: "10%",
        icon: Sun,
      })

      setSafetyAlerts([
        {
          type: "weather",
          severity: "low",
          message: "Perfect weather for tea garden visits and outdoor activities.",
          location: "Palampur Valley",
          icon: Shield,
          color: "text-green-600 bg-green-50 border-green-200",
        },
      ])
    } else if (location.includes("solan")) {
      setWeatherData({
        temperature: "15-25°C",
        condition: "Clear",
        humidity: "60%",
        windSpeed: "10 km/h",
        visibility: "11 km",
        uvIndex: "Moderate (6)",
        precipitation: "5%",
        icon: Sun,
      })

      setSafetyAlerts([
        {
          type: "traffic",
          severity: "low",
          message: "Moderate traffic on Chandigarh-Shimla highway. Plan accordingly.",
          location: "Solan District",
          icon: Car,
          color: "text-green-600 bg-green-50 border-green-200",
        },
      ])
    } else if (location.includes("sirmaur") || location.includes("nahan")) {
      setWeatherData({
        temperature: "18-30°C",
        condition: "Hot and Humid",
        humidity: "75%",
        windSpeed: "6 km/h",
        visibility: "8 km",
        uvIndex: "High (7)",
        precipitation: "30%",
        icon: Sun,
      })

      setSafetyAlerts([
        {
          type: "weather",
          severity: "medium",
          message: "Hot and humid conditions. Stay hydrated and avoid midday sun.",
          location: "Sirmaur District",
          icon: Thermometer,
          color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        },
      ])
    } else if (location.includes("kinnaur") || location.includes("kalpa") || location.includes("sangla")) {
      setWeatherData({
        temperature: "5-18°C",
        condition: "Clear, Cold",
        humidity: "45%",
        windSpeed: "20 km/h",
        visibility: "15 km",
        uvIndex: "High (8)",
        precipitation: "0%",
        icon: Sun,
      })

      setSafetyAlerts([
        {
          type: "altitude",
          severity: "high",
          message: "High altitude region (2500m+). Risk of altitude sickness and extreme weather.",
          location: "Kinnaur District",
          icon: Mountain,
          color: "text-red-600 bg-red-50 border-red-200",
        },
        {
          type: "road",
          severity: "high",
          message: "Narrow mountain roads with steep drops. Drive extremely carefully.",
          location: "Hindustan-Tibet Road",
          icon: AlertTriangle,
          color: "text-red-600 bg-red-50 border-red-200",
        },
      ])
    } else if (location.includes("hamirpur")) {
      setWeatherData({
        temperature: "20-32°C",
        condition: "Hot",
        humidity: "55%",
        windSpeed: "8 km/h",
        visibility: "10 km",
        uvIndex: "High (8)",
        precipitation: "5%",
        icon: Sun,
      })

      setSafetyAlerts([
        {
          type: "weather",
          severity: "medium",
          message: "Hot weather conditions. Carry water and avoid prolonged sun exposure.",
          location: "Hamirpur District",
          icon: Thermometer,
          color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        },
      ])
    } else if (location.includes("una")) {
      setWeatherData({
        temperature: "22-35°C",
        condition: "Very Hot",
        humidity: "50%",
        windSpeed: "12 km/h",
        visibility: "9 km",
        uvIndex: "Very High (9)",
        precipitation: "0%",
        icon: Sun,
      })

      setSafetyAlerts([
        {
          type: "weather",
          severity: "high",
          message: "Very hot conditions. Heat stroke risk. Stay indoors during peak hours.",
          location: "Una District",
          icon: Thermometer,
          color: "text-red-600 bg-red-50 border-red-200",
        },
      ])
    } else if (location.includes("mandi")) {
      setWeatherData({
        temperature: "16-28°C",
        condition: "Pleasant",
        humidity: "65%",
        windSpeed: "10 km/h",
        visibility: "10 km",
        uvIndex: "Moderate (6)",
        precipitation: "15%",
        icon: Sun,
      })

      setSafetyAlerts([
        {
          type: "river",
          severity: "medium",
          message: "Beas River levels normal. Safe for water activities with precaution.",
          location: "Mandi Town",
          icon: Waves,
          color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        },
      ])
    }

    setIsLoading(false)
  }

  const handleDestinationSearch = (dest: string) => {
    setDestination(dest)

    if (dest.length > 2) {
      fetchWeatherAndSafety(dest)
    }

    const location = dest.toLowerCase()

    if (location.includes("bilaspur")) {
      setSuggestions([
        {
          id: "1",
          name: "Gobind Sagar Lake",
          type: "viewpoint",
          description: "Massive reservoir perfect for water sports and scenic boat rides",
          distance: "5 km from Bilaspur",
          icon: Waves,
        },
        {
          id: "2",
          name: "Bhakra Dam",
          type: "engineering",
          description: "One of India's highest dams with spectacular views",
          distance: "15 km from Bilaspur",
          icon: Mountain,
        },
        {
          id: "3",
          name: "Naina Devi Temple",
          type: "temple",
          description: "Sacred hilltop temple with panoramic valley views",
          distance: "20 km from Bilaspur",
          icon: Church,
        },
      ])

      setEcoStops([
        {
          id: "1",
          name: "Lake View Water Station",
          type: "water",
          location: "Gobind Sagar Lake",
          icon: Droplets,
        },
        {
          id: "2",
          name: "Dam Site Waste Center",
          type: "waste",
          location: "Bhakra Dam",
          icon: Trash2,
        },
        {
          id: "3",
          name: "Eco Café Bilaspur",
          type: "cafe",
          location: "Main Market",
          icon: Coffee,
        },
      ])
    } else if (location.includes("shimla")) {
      setSuggestions([
        {
          id: "4",
          name: "Mall Road",
          type: "shopping",
          description: "Historic shopping street with colonial architecture",
          distance: "City Center",
          icon: ShoppingBag,
        },
        {
          id: "5",
          name: "Jakhoo Temple",
          type: "temple",
          description: "Ancient Hanuman temple at the highest peak of Shimla",
          distance: "2 km from Mall Road",
          icon: Church,
        },
        {
          id: "6",
          name: "Kufri",
          type: "adventure",
          description: "Hill station famous for skiing and wildlife sanctuary",
          distance: "16 km from Shimla",
          icon: Snowflake,
        },
        {
          id: "7",
          name: "The Ridge",
          type: "viewpoint",
          description: "Popular viewpoint with panoramic views",
          distance: "2 km from Shimla",
          icon: Home,
        },
        {
          id: "8",
          name: "Narkanda",
          type: "adventure",
          description: "Skiing destination with apple orchards and Himalayan views",
          distance: "65 km from Shimla",
          icon: Snowflake,
        },
      ])

      setEcoStops([
        {
          id: "4",
          name: "Mall Road Water Point",
          type: "water",
          location: "The Mall, Shimla",
          icon: Droplets,
        },
        {
          id: "5",
          name: "Ridge Waste Station",
          type: "waste",
          location: "The Ridge",
          icon: Trash2,
        },
        {
          id: "6",
          name: "Mountain View Cafe",
          type: "cafe",
          location: "Lakkar Bazaar",
          icon: Coffee,
        },
      ])
    } else if (location.includes("manali")) {
      setSuggestions([
        {
          id: "9",
          name: "Solang Valley",
          type: "adventure",
          description: "Adventure sports hub with paragliding and skiing",
          distance: "12 km from Manali",
          icon: Snowflake,
        },
        {
          id: "10",
          name: "Rohtang Pass",
          type: "viewpoint",
          description: "High mountain pass with stunning glacier views",
          distance: "51 km from Manali",
          icon: Mountain,
        },
        {
          id: "11",
          name: "Old Manali",
          type: "cultural",
          description: "Charming village with cafes and traditional architecture",
          distance: "3 km from Manali",
          icon: Home,
        },
        {
          id: "12",
          name: "Vashisht Hot Springs",
          type: "wellness",
          description: "Natural hot springs with therapeutic properties",
          distance: "6 km from Manali",
          icon: Waves,
        },
        {
          id: "13",
          name: "Naggar Castle",
          type: "heritage",
          description: "Medieval castle with panoramic valley views",
          distance: "20 km from Manali",
          icon: Castle,
        },
      ])

      setEcoStops([
        {
          id: "7",
          name: "Old Manali Water Station",
          type: "water",
          location: "Old Manali",
          icon: Droplets,
        },
        {
          id: "8",
          name: "Eco Waste Center",
          type: "waste",
          location: "Mall Road, Manali",
          icon: Trash2,
        },
        {
          id: "9",
          name: "Himalayan Cafe",
          type: "cafe",
          location: "Vashisht",
          icon: Coffee,
        },
      ])
    } else if (location.includes("dharamshala") || location.includes("mcleod")) {
      setSuggestions([
        {
          id: "14",
          name: "Bhagsu Waterfall",
          type: "waterfall",
          description: "Sacred waterfall near ancient Bhagsunath Temple",
          distance: "3 km from McLeod Ganj",
          icon: Waves,
        },
        {
          id: "15",
          name: "Triund Trek",
          type: "adventure",
          description: "Famous trekking destination with stunning Dhauladhar range views",
          distance: "9 km from McLeod Ganj",
          icon: Mountain,
        },
        {
          id: "16",
          name: "Namgyal Monastery",
          type: "temple",
          description: "Tibetan cultural center and residence of Dalai Lama",
          distance: "1 km from McLeod Ganj",
          icon: Church,
        },
        {
          id: "17",
          name: "Dal Lake",
          type: "viewpoint",
          description: "Serene lake surrounded by deodar trees",
          distance: "11 km from Dharamshala",
          icon: Waves,
        },
        {
          id: "18",
          name: "Kangra Fort",
          type: "heritage",
          description: "Ancient fort with rich history and valley views",
          distance: "20 km from Dharamshala",
          icon: Castle,
        },
      ])

      setEcoStops([
        {
          id: "10",
          name: "McLeod Ganj Water Point",
          type: "water",
          location: "Main Square, McLeod Ganj",
          icon: Droplets,
        },
        {
          id: "11",
          name: "Tibetan Eco Center",
          type: "waste",
          location: "Temple Road",
          icon: Trash2,
        },
        {
          id: "12",
          name: "Peace Cafe",
          type: "cafe",
          location: "Bhagsu Road",
          icon: Coffee,
        },
      ])
    } else if (location.includes("kasol") || location.includes("parvati")) {
      setSuggestions([
        {
          id: "19",
          name: "Tosh Village",
          type: "cultural",
          description: "Scenic village at the end of Parvati Valley",
          distance: "22 km from Kasol",
          icon: Home,
        },
        {
          id: "20",
          name: "Kheerganga Trek",
          type: "adventure",
          description: "Popular trek to natural hot springs",
          distance: "12 km trek from Barshaini",
          icon: Mountain,
        },
        {
          id: "21",
          name: "Malana Village",
          type: "cultural",
          description: "Ancient village with unique customs and democracy",
          distance: "21 km from Kasol",
          icon: Home,
        },
        {
          id: "22",
          name: "Chalal Village",
          type: "nature",
          description: "Peaceful village across Parvati River",
          distance: "3 km from Kasol",
          icon: TreePine,
        },
      ])

      setEcoStops([
        {
          id: "13",
          name: "Parvati River Water Point",
          type: "water",
          location: "Kasol Main Market",
          icon: Droplets,
        },
        {
          id: "14",
          name: "Valley Waste Management",
          type: "waste",
          location: "Kasol Center",
          icon: Trash2,
        },
        {
          id: "15",
          name: "Organic Valley Cafe",
          type: "cafe",
          location: "Tosh Road",
          icon: Coffee,
        },
      ])
    } else if (location.includes("spiti")) {
      setSuggestions([
        {
          id: "23",
          name: "Key Monastery",
          type: "temple",
          description: "Largest monastery in Spiti Valley at 4,166m altitude",
          distance: "12 km from Kaza",
          icon: Church,
        },
        {
          id: "24",
          name: "Chandratal Lake",
          type: "viewpoint",
          description: "Crescent-shaped high-altitude lake",
          distance: "120 km from Kaza",
          icon: Waves,
        },
        {
          id: "25",
          name: "Kibber Village",
          type: "cultural",
          description: "One of the highest motorable villages in the world",
          distance: "19 km from Kaza",
          icon: Home,
        },
        {
          id: "26",
          name: "Pin Valley National Park",
          type: "nature",
          description: "Cold desert national park with rare wildlife",
          distance: "30 km from Kaza",
          icon: TreePine,
        },
      ])

      setEcoStops([
        {
          id: "16",
          name: "Kaza Water Station",
          type: "water",
          location: "Kaza Market",
          icon: Droplets,
        },
        {
          id: "17",
          name: "High Altitude Waste Center",
          type: "waste",
          location: "Kaza",
          icon: Trash2,
        },
        {
          id: "18",
          name: "Spiti Organic Cafe",
          type: "cafe",
          location: "Key Village",
          icon: Coffee,
        },
      ])
    } else if (location.includes("kullu")) {
      setSuggestions([
        {
          id: "27",
          name: "Great Himalayan National Park",
          type: "nature",
          description: "UNESCO World Heritage site with diverse flora and fauna",
          distance: "60 km from Kullu",
          icon: TreePine,
        },
        {
          id: "28",
          name: "Bijli Mahadev Temple",
          type: "temple",
          description: "Temple famous for its lightning rod and valley views",
          distance: "14 km from Kullu",
          icon: Church,
        },
        {
          id: "29",
          name: "Tirthan Valley",
          type: "nature",
          description: "Pristine valley perfect for trout fishing and trekking",
          distance: "50 km from Kullu",
          icon: Waves,
        },
        {
          id: "30",
          name: "Raghunath Temple",
          type: "temple",
          description: "Main temple of Kullu dedicated to Lord Rama",
          distance: "2 km from Kullu",
          icon: Church,
        },
      ])

      setEcoStops([
        {
          id: "19",
          name: "Kullu Water Point",
          type: "water",
          location: "Dhalpur Maidan",
          icon: Droplets,
        },
        {
          id: "20",
          name: "Valley Waste Station",
          type: "waste",
          location: "Kullu Bus Stand",
          icon: Trash2,
        },
        {
          id: "21",
          name: "River View Cafe",
          type: "cafe",
          location: "Beas River Bank",
          icon: Coffee,
        },
      ])
    } else if (location.includes("dalhousie")) {
      setSuggestions([
        {
          id: "31",
          name: "Khajjiar",
          type: "viewpoint",
          description: "Mini Switzerland of India with meadows and lake",
          distance: "24 km from Dalhousie",
          icon: TreePine,
        },
        {
          id: "32",
          name: "Dainkund Peak",
          type: "viewpoint",
          description: "Highest peak around Dalhousie with panoramic views",
          distance: "10 km from Dalhousie",
          icon: Mountain,
        },
        {
          id: "33",
          name: "Kalatop Wildlife Sanctuary",
          type: "nature",
          description: "Dense forest sanctuary with diverse wildlife",
          distance: "12 km from Dalhousie",
          icon: TreePine,
        },
        {
          id: "34",
          name: "St. John's Church",
          type: "heritage",
          description: "Historic church built in 1863",
          distance: "1 km from Dalhousie",
          icon: Church,
        },
      ])

      setEcoStops([
        {
          id: "22",
          name: "Gandhi Chowk Water Point",
          type: "water",
          location: "Gandhi Chowk",
          icon: Droplets,
        },
        {
          id: "23",
          name: "Hill Station Waste Center",
          type: "waste",
          location: "Mall Road",
          icon: Trash2,
        },
        {
          id: "24",
          name: "Colonial Cafe",
          type: "cafe",
          location: "Subhash Chowk",
          icon: Coffee,
        },
      ])
    } else if (location.includes("chamba")) {
      setSuggestions([
        {
          id: "35",
          name: "Chamera Lake",
          type: "viewpoint",
          description: "Artificial lake perfect for water sports and boating",
          distance: "25 km from Chamba",
          icon: Waves,
        },
        {
          id: "36",
          name: "Lakshmi Narayan Temple",
          type: "temple",
          description: "Ancient temple complex with intricate stone carvings",
          distance: "1 km from Chamba",
          icon: Church,
        },
        {
          id: "37",
          name: "Bhuri Singh Museum",
          type: "heritage",
          description: "Museum showcasing Chamba's art and culture",
          distance: "City Center",
          icon: Building,
        },
        {
          id: "38",
          name: "Manimahesh Lake",
          type: "pilgrimage",
          description: "Sacred high-altitude lake at the base of Manimahesh Kailash",
          distance: "65 km from Chamba",
          icon: Waves,
        },
      ])

      setEcoStops([
        {
          id: "25",
          name: "Ravi River Water Point",
          type: "water",
          location: "Chaugan",
          icon: Droplets,
        },
        {
          id: "26",
          name: "Heritage Waste Station",
          type: "waste",
          location: "Main Bazaar",
          icon: Trash2,
        },
        {
          id: "27",
          name: "Traditional Cafe",
          type: "cafe",
          location: "Court Road",
          icon: Coffee,
        },
      ])
    } else if (location.includes("palampur")) {
      setSuggestions([
        {
          id: "39",
          name: "Tea Gardens",
          type: "nature",
          description: "Lush green tea plantations with Dhauladhar backdrop",
          distance: "Throughout Palampur",
          icon: TreePine,
        },
        {
          id: "40",
          name: "Baijnath Temple",
          type: "temple",
          description: "Ancient Shiva temple dating back to 1204 AD",
          distance: "16 km from Palampur",
          icon: Church,
        },
        {
          id: "41",
          name: "Bir Billing",
          type: "adventure",
          description: "World's second-highest paragliding site",
          distance: "35 km from Palampur",
          icon: Wind,
        },
        {
          id: "42",
          name: "Saurabh Van Vihar",
          type: "nature",
          description: "Beautiful park with walking trails and picnic spots",
          distance: "3 km from Palampur",
          icon: TreePine,
        },
      ])

      setEcoStops([
        {
          id: "28",
          name: "Tea Garden Water Point",
          type: "water",
          location: "Tea Estate",
          icon: Droplets,
        },
        {
          id: "29",
          name: "Organic Waste Center",
          type: "waste",
          location: "Main Market",
          icon: Trash2,
        },
        {
          id: "30",
          name: "Tea Valley Cafe",
          type: "cafe",
          location: "Bundla",
          icon: Coffee,
        },
      ])
    } else if (location.includes("solan")) {
      setSuggestions([
        {
          id: "43",
          name: "Kasauli",
          type: "hill-station",
          description: "Charming hill station with colonial architecture",
          distance: "35 km from Solan",
          icon: Home,
        },
        {
          id: "44",
          name: "Mohan Shakti Heritage Park",
          type: "heritage",
          description: "Cultural park showcasing Indian heritage and mythology",
          distance: "15 km from Solan",
          icon: Building,
        },
        {
          id: "45",
          name: "Shoolini Mata Temple",
          type: "temple",
          description: "Ancient temple dedicated to Goddess Shoolini",
          distance: "2 km from Solan",
          icon: Church,
        },
        {
          id: "46",
          name: "Kuthar Fort",
          type: "heritage",
          description: "Historic fort now converted into a heritage hotel",
          distance: "12 km from Solan",
          icon: Castle,
        },
      ])

      setEcoStops([
        {
          id: "31",
          name: "Brewery Water Station",
          type: "water",
          location: "Industrial Area",
          icon: Droplets,
        },
        {
          id: "32",
          name: "Hill Town Waste Center",
          type: "waste",
          location: "Mall Road",
          icon: Trash2,
        },
        {
          id: "33",
          name: "Mushroom Cafe",
          type: "cafe",
          location: "Rajgarh Road",
          icon: Coffee,
        },
      ])
    } else if (location.includes("sirmaur") || location.includes("nahan")) {
      setSuggestions([
        {
          id: "47",
          name: "Renuka Lake",
          type: "viewpoint",
          description: "Largest natural lake in Himachal Pradesh",
          distance: "38 km from Nahan",
          icon: Waves,
        },
        {
          id: "48",
          name: "Suketi Fossil Park",
          type: "heritage",
          description: "Unique park with 2.5 million-year-old fossils",
          distance: "25 km from Nahan",
          icon: Building,
        },
        {
          id: "49",
          name: "Trilokpur Temple",
          type: "temple",
          description: "Famous temple dedicated to Goddess Bala Sundari",
          distance: "42 km from Nahan",
          icon: Church,
        },
        {
          id: "50",
          name: "Churdhar Peak",
          type: "adventure",
          description: "Highest peak in Sirmaur district with trekking trails",
          distance: "90 km from Nahan",
          icon: Mountain,
        },
      ])

      setEcoStops([
        {
          id: "34",
          name: "Renuka Water Point",
          type: "water",
          location: "Renuka Lake",
          icon: Droplets,
        },
        {
          id: "35",
          name: "Lake Waste Station",
          type: "waste",
          location: "Renuka",
          icon: Trash2,
        },
        {
          id: "36",
          name: "Lakeside Cafe",
          type: "cafe",
          location: "Renuka Lake",
          icon: Coffee,
        },
      ])
    } else if (location.includes("kinnaur") || location.includes("kalpa") || location.includes("sangla")) {
      setSuggestions([
        {
          id: "51",
          name: "Kalpa",
          type: "viewpoint",
          description: "Scenic village with views of Kinner Kailash range",
          distance: "8 km from Reckong Peo",
          icon: Mountain,
        },
        {
          id: "52",
          name: "Sangla Valley",
          type: "nature",
          description: "Beautiful valley known as the 'Baspa Valley'",
          distance: "40 km from Reckong Peo",
          icon: TreePine,
        },
        {
          id: "53",
          name: "Chitkul",
          type: "cultural",
          description: "Last inhabited village near Indo-Tibet border",
          distance: "25 km from Sangla",
          icon: Home,
        },
        {
          id: "54",
          name: "Nako Lake",
          type: "viewpoint",
          description: "High-altitude lake surrounded by willow and poplar trees",
          distance: "115 km from Reckong Peo",
          icon: Waves,
        },
      ])

      setEcoStops([
        {
          id: "37",
          name: "Kalpa Water Station",
          type: "water",
          location: "Kalpa Village",
          icon: Droplets,
        },
        {
          id: "38",
          name: "Mountain Waste Center",
          type: "waste",
          location: "Reckong Peo",
          icon: Trash2,
        },
        {
          id: "39",
          name: "Apple Valley Cafe",
          type: "cafe",
          location: "Sangla",
          icon: Coffee,
        },
      ])
    } else if (location.includes("hamirpur")) {
      setSuggestions([
        {
          id: "55",
          name: "Baba Balak Nath Temple",
          type: "temple",
          description: "Famous temple dedicated to Baba Balak Nath",
          distance: "45 km from Hamirpur",
          icon: Church,
        },
        {
          id: "56",
          name: "Sujanpur Tira",
          type: "heritage",
          description: "Historic town with ancient fort and temples",
          distance: "22 km from Hamirpur",
          icon: Castle,
        },
        {
          id: "57",
          name: "Deotsidh Temple",
          type: "temple",
          description: "Ancient temple with panoramic valley views",
          distance: "15 km from Hamirpur",
          icon: Church,
        },
        {
          id: "58",
          name: "Gasota Mahadev Temple",
          type: "temple",
          description: "Temple located in a natural cave",
          distance: "8 km from Hamirpur",
          icon: Church,
        },
      ])

      setEcoStops([
        {
          id: "40",
          name: "Temple Water Point",
          type: "water",
          location: "Baba Balak Nath",
          icon: Droplets,
        },
        {
          id: "41",
          name: "Heritage Waste Station",
          type: "waste",
          location: "Sujanpur Tira",
          icon: Trash2,
        },
        {
          id: "42",
          name: "Valley View Cafe",
          type: "cafe",
          location: "Hamirpur",
          icon: Coffee,
        },
      ])
    } else if (location.includes("una")) {
      setSuggestions([
        {
          id: "59",
          name: "Chintpurni Temple",
          type: "temple",
          description: "One of the 51 Shakti Peethas dedicated to Goddess Chintpurni",
          distance: "55 km from Una",
          icon: Church,
        },
        {
          id: "60",
          name: "Dera Baba Barbhag Singh",
          type: "heritage",
          description: "Historic Sikh shrine with beautiful architecture",
          distance: "12 km from Una",
          icon: Church,
        },
        {
          id: "61",
          name: "Bangana",
          type: "nature",
          description: "Scenic town with lush green surroundings",
          distance: "25 km from Una",
          icon: TreePine,
        },
        {
          id: "62",
          name: "Amb",
          type: "heritage",
          description: "Historic town with ancient temples and fort ruins",
          distance: "18 km from Una",
          icon: Castle,
        },
      ])

      setEcoStops([
        {
          id: "43",
          name: "Temple Complex Water Point",
          type: "water",
          location: "Chintpurni",
          icon: Droplets,
        },
        {
          id: "44",
          name: "Pilgrimage Waste Center",
          type: "waste",
          location: "Una",
          icon: Trash2,
        },
        {
          id: "45",
          name: "Devotee Cafe",
          type: "cafe",
          location: "Chintpurni Road",
          icon: Coffee,
        },
      ])
    } else if (location.includes("mandi")) {
      setSuggestions([
        {
          id: "63",
          name: "Rewalsar Lake",
          type: "pilgrimage",
          description: "Sacred lake revered by Hindus, Buddhists, and Sikhs",
          distance: "24 km from Mandi",
          icon: Waves,
        },
        {
          id: "64",
          name: "Bhima Kali Temple",
          type: "temple",
          description: "Ancient temple complex with traditional architecture",
          distance: "2 km from Mandi",
          icon: Church,
        },
        {
          id: "65",
          name: "Prashar Lake",
          type: "viewpoint",
          description: "High-altitude lake with floating island and ancient temple",
          distance: "49 km from Mandi",
          icon: Waves,
        },
        {
          id: "66",
          name: "Shikari Devi Temple",
          type: "temple",
          description: "Temple at 3359m altitude with panoramic Himalayan views",
          distance: "35 km from Mandi",
          icon: Mountain,
        },
      ])

      setEcoStops([
        {
          id: "46",
          name: "Beas River Water Point",
          type: "water",
          location: "Mandi Town",
          icon: Droplets,
        },
        {
          id: "47",
          name: "Temple Town Waste Center",
          type: "waste",
          location: "Main Bazaar",
          icon: Trash2,
        },
        {
          id: "48",
          name: "Riverside Cafe",
          type: "cafe",
          location: "Beas Bank",
          icon: Coffee,
        },
      ])
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if (destination.length > 2) {
      const interval = setInterval(() => {
        fetchWeatherAndSafety(destination)
      }, 300000) // 5 minutes

      return () => clearInterval(interval)
    }
  }, [destination])

  const toggleSuggestion = (id: string) => {
    setSelectedSuggestions((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const addToMap = () => {
    // Navigate to map with selected locations
    const selectedLocations = suggestions.filter((s) => selectedSuggestions.includes(s.id))
    router.push(
      `/map?trip=true&destination=${encodeURIComponent(destination)}&locations=${encodeURIComponent(JSON.stringify(selectedLocations))}`,
    )
  }

  const startTrip = () => {
    const selectedLocations = suggestions.filter((s) => selectedSuggestions.includes(s.id))

    if (selectedLocations.length === 0) {
      alert("Please select at least one location to start your trip")
      return
    }

    // Create waypoints for Google Maps
    const waypoints = selectedLocations
      .map((location) => {
        // Get coordinates for each location (in real app, these would come from database)
        const coords = getLocationCoordinates(location.name)
        return coords ? `${coords.lat},${coords.lng}` : encodeURIComponent(location.name)
      })
      .join("|")

    // Create Google Maps URL with destination and waypoints
    const destination_coord = getDestinationCoordinates(destination)
    const dest = destination_coord
      ? `${destination_coord.lat},${destination_coord.lng}`
      : encodeURIComponent(destination)

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${dest}&waypoints=${waypoints}&travelmode=driving`

    // Open Google Maps in new tab
    window.open(googleMapsUrl, "_blank")
  }

  const getDestinationCoordinates = (dest: string) => {
    const destinationCoords: Record<string, { lat: number; lng: number }> = {
      bilaspur: { lat: 31.3256, lng: 76.7635 },
      shimla: { lat: 31.1048, lng: 77.1734 },
      manali: { lat: 32.2396, lng: 77.1887 },
      dharamshala: { lat: 32.219, lng: 76.3234 },
      kasol: { lat: 32.0102, lng: 77.3147 },
      "spiti valley": { lat: 32.2396, lng: 78.0515 },
      kullu: { lat: 31.9578, lng: 77.1734 },
      dalhousie: { lat: 32.5448, lng: 75.9618 },
      chamba: { lat: 32.5563, lng: 76.1318 },
      palampur: { lat: 32.1343, lng: 76.537 },
      solan: { lat: 30.9045, lng: 77.0967 },
      nahan: { lat: 30.5594, lng: 77.2947 },
      sirmaur: { lat: 30.5594, lng: 77.2947 },
      kalpa: { lat: 31.5362, lng: 78.2537 },
      sangla: { lat: 31.4167, lng: 78.2667 },
      kinnaur: { lat: 31.6077, lng: 78.4635 },
      hamirpur: { lat: 31.6839, lng: 76.5217 },
      una: { lat: 31.4685, lng: 76.2708 },
      mandi: { lat: 31.7084, lng: 76.9319 },
      kaza: { lat: 32.2224, lng: 78.0685 },
      mcleod: { lat: 32.219, lng: 76.3234 },
      "parvati valley": { lat: 32.0102, lng: 77.3147 },
    }
    return destinationCoords[dest.toLowerCase()] || null
  }

  const handleStartTrip = () => {
    if (!destination || selectedSuggestions.length === 0) {
      alert("Please select a destination and at least one attraction to start your trip!")
      return
    }

    const coords = getDestinationCoordinates(destination)
    if (!coords) {
      alert("Destination coordinates not found!")
      return
    }

    // Create waypoints from selected suggestions
    const selectedAttractions = suggestions.filter((s) => selectedSuggestions.includes(s.id))
    const waypoints = selectedAttractions
      .map((attraction) => encodeURIComponent(`${attraction.name}, ${destination}, Himachal Pradesh`))
      .join("/")

    // Create Google Maps URL with destination and waypoints
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${destination}, Himachal Pradesh`)}&waypoints=${waypoints}&travelmode=driving`

    // Open Google Maps in new tab
    window.open(mapsUrl, "_blank")
  }

  const getLocationCoordinates = (locationName: string) => {
    const locationCoords: Record<string, { lat: number; lng: number }> = {
      // Bilaspur locations
      "N.B Waterfall": { lat: 31.2856, lng: 76.7235 },
      "Rukmani Kund": { lat: 31.3156, lng: 76.7535 },
      "Markandya Temple": { lat: 31.3356, lng: 76.7835 },
      "Bandla Paragliding Site": { lat: 31.2956, lng: 76.7435 },
      // Shimla locations
      "Chadwick Falls": { lat: 31.0848, lng: 77.1534 },
      "Prospect Hill": { lat: 31.1248, lng: 77.1834 },
      "Annandale Ground": { lat: 31.0948, lng: 77.1634 },
      "Summer Hill": { lat: 31.0748, lng: 77.1434 },
      // Manali locations
      "Solang Valley": { lat: 32.3196, lng: 77.1487 },
      "Rohtang Pass": { lat: 32.3726, lng: 77.2497 },
      "Old Manali": { lat: 32.2496, lng: 77.1787 },
      "Vashisht Hot Springs": { lat: 32.2696, lng: 77.1987 },
      // Dharamshala locations
      "Bhagsu Waterfall": { lat: 32.239, lng: 76.3134 },
      "Triund Trek": { lat: 32.249, lng: 76.3234 },
      "Namgyal Monastery": { lat: 32.229, lng: 76.3034 },
      "Dal Lake": { lat: 32.219, lng: 76.2934 },
      // Kasol locations
      "Tosh Village": { lat: 32.0402, lng: 77.3447 },
      "Malana Village": { lat: 32.0902, lng: 77.2947 },
      "Kheerganga Trek": { lat: 32.0702, lng: 77.3247 },
      "Chalal Village": { lat: 32.0202, lng: 77.3047 },
      // Add more locations as needed
    }
    return locationCoords[locationName] || null
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <AppHeader />

      <div className="px-4 py-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Plan Your Trip</h1>
          <p className="text-gray-600">Discover hidden gems and eco-friendly stops for your journey</p>
        </div>

        {/* Destination Input */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Where do you want to go?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="e.g., Bilaspur, Shimla, Manali..."
                value={destination}
                onChange={(e) => handleDestinationSearch(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="checkin">Check-in Date</Label>
                <Input id="checkin" type="date" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="guests">Guests</Label>
                <Input id="guests" type="number" placeholder="2" min="1" className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Weather Information */}
        {weatherData && (
          <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-blue-600" />
                Live Weather Update
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Thermometer className="h-6 w-6 mx-auto mb-1 text-orange-500" />
                  <div className="text-sm font-semibold">{weatherData.temperature}</div>
                  <div className="text-xs text-gray-600">Temperature</div>
                </div>
                <div className="text-center">
                  <CloudRain className="h-6 w-6 mx-auto mb-1 text-blue-500" />
                  <div className="text-sm font-semibold">{weatherData.condition}</div>
                  <div className="text-xs text-gray-600">Condition</div>
                </div>
                <div className="text-center">
                  <Droplets className="h-6 w-6 mx-auto mb-1 text-cyan-500" />
                  <div className="text-sm font-semibold">{weatherData.humidity}</div>
                  <div className="text-xs text-gray-600">Humidity</div>
                </div>
                <div className="text-center">
                  <Wind className="h-6 w-6 mx-auto mb-1 text-gray-500" />
                  <div className="text-sm font-semibold">{weatherData.windSpeed}</div>
                  <div className="text-xs text-gray-600">Wind Speed</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-blue-200">
                <div className="text-center">
                  <Eye className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                  <div className="text-xs font-semibold">{weatherData.visibility}</div>
                  <div className="text-xs text-gray-600">Visibility</div>
                </div>
                <div className="text-center">
                  <Umbrella className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                  <div className="text-xs font-semibold">{weatherData.precipitation}</div>
                  <div className="text-xs text-gray-600">Rain Chance</div>
                </div>
                <div className="text-center">
                  <div className="w-5 h-5 mx-auto mb-1 bg-yellow-400 rounded-full" />
                  <div className="text-xs font-semibold">{weatherData.uvIndex}</div>
                  <div className="text-xs text-gray-600">UV Index</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Safety Alerts */}
        {safetyAlerts.length > 0 && (
          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Safety & Travel Alerts
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Live Updates
              </Badge>
            </h3>

            {safetyAlerts.map((alert, index) => {
              const Icon = alert.icon
              return (
                <Card key={index} className={`border ${alert.color}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold capitalize">{alert.type} Alert</h4>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              alert.severity === "high"
                                ? "border-red-300 text-red-700"
                                : alert.severity === "medium"
                                  ? "border-yellow-300 text-yellow-700"
                                  : "border-green-300 text-green-700"
                            }`}
                          >
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{alert.message}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>{alert.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Hidden Location Suggestions */}
        {suggestions.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TreePine className="h-5 w-5 text-green-600" />
                Hidden Gems Near {destination}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {suggestions.map((suggestion) => {
                  const Icon = suggestion.icon
                  const isSelected = selectedSuggestions.includes(suggestion.id)

                  return (
                    <div
                      key={suggestion.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        isSelected ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => toggleSuggestion(suggestion.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`h-5 w-5 mt-0.5 ${isSelected ? "text-green-600" : "text-gray-500"}`} />
                        <div className="flex-1">
                          <h3 className={`font-semibold ${isSelected ? "text-green-900" : "text-gray-900"}`}>
                            {suggestion.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-1">{suggestion.description}</p>
                          <p className="text-xs text-gray-500">{suggestion.distance}</p>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Eco-Friendly Stops */}
        {ecoStops.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TreePine className="h-5 w-5 text-green-600" />
                Eco-Friendly Stops
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ecoStops.map((stop) => {
                  const Icon = stop.icon
                  const colors = {
                    water: "text-blue-600 bg-blue-50 border-blue-200",
                    waste: "text-orange-600 bg-orange-50 border-orange-200",
                    cafe: "text-green-600 bg-green-50 border-green-200",
                  }

                  return (
                    <div key={stop.id} className={`p-4 rounded-lg border ${colors[stop.type]}`}>
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <div>
                          <h3 className="font-semibold text-sm">{stop.name}</h3>
                          <p className="text-xs opacity-75">{stop.location}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {selectedSuggestions.length > 0 && (
          <div className="flex gap-3">
            <Button onClick={addToMap} className="flex-1 bg-green-600 hover:bg-green-700">
              <MapPin className="h-4 w-4 mr-2" />
              View on Map
            </Button>
            <Button onClick={startTrip} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Navigation className="h-4 w-4 mr-2" />
              Start Trip
            </Button>
          </div>
        )}

        {/* Start Trip Button */}
        {destination && suggestions.length > 0 && (
          <div className="mt-6">
            <Button
              onClick={handleStartTrip}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
              size="lg"
            >
              <MapPin className="h-5 w-5 mr-2" />
              Start Trip in Google Maps
            </Button>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Opens navigation with selected attractions as waypoints
            </p>
          </div>
        )}
      </div>

      <MobileNavigation />
    </div>
  )
}
