"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { EcoMap } from "@/components/eco-map"
import { PageHeader } from "@/components/page-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { MapPin, X, Navigation, Clock } from "lucide-react"

interface TripLocation {
  id: string
  name: string
  type: string
  description: string
  distance: string
  icon: any
}

export default function MapPage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tripMode, setTripMode] = useState(false)
  const [tripDestination, setTripDestination] = useState("")
  const [tripLocations, setTripLocations] = useState<TripLocation[]>([])
  const [showTripPanel, setShowTripPanel] = useState(false)

  useEffect(() => {
    const isTrip = searchParams.get("trip") === "true"
    const destination = searchParams.get("destination")
    const locationsParam = searchParams.get("locations")

    if (isTrip && destination) {
      setTripMode(true)
      setTripDestination(destination)
      setShowTripPanel(true)

      if (locationsParam) {
        try {
          const locations = JSON.parse(decodeURIComponent(locationsParam))
          setTripLocations(locations)
        } catch (error) {
          console.error("Error parsing trip locations:", error)
        }
      }
    }
  }, [searchParams]) // Only depend on searchParams, not the state variables

  const clearTripMode = () => {
    setTripMode(false)
    setTripDestination("")
    setTripLocations([])
    setShowTripPanel(false)
    // Remove URL parameters
    router.replace("/map")
  }

  return (
    <div className="relative h-screen pb-16">
      <PageHeader
        title={tripMode ? `Trip to ${tripDestination}` : "Eco-Map"}
        showBack={false}
        rightAction="profile"
        onRightAction={() => router.push("/profile")}
        className="bg-white/90 backdrop-blur-sm"
      />

      <div className="h-full pt-16">
        <EcoMap tripMode={tripMode} tripLocations={tripLocations} />
      </div>

      {user && (
        <div className="absolute top-20 left-3 sm:left-4 z-20">
          <div className="bg-green-600 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
            {user.ecoPoints} Eco-Points
          </div>
        </div>
      )}

      {tripMode && (
        <div className="absolute top-20 right-3 sm:right-4 z-20">
          <Button variant="outline" size="sm" onClick={clearTripMode} className="bg-white/90 backdrop-blur-sm">
            <X className="h-4 w-4 mr-1" />
            Clear Trip
          </Button>
        </div>
      )}

      {showTripPanel && tripLocations.length > 0 && (
        <div className="absolute bottom-20 left-3 right-3 z-20">
          <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-green-600" />
                  Your Trip Plan
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowTripPanel(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2 max-h-32 overflow-y-auto">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-3 w-3 text-red-500" />
                  <span className="font-medium">{tripDestination}</span>
                  <Badge variant="outline" className="text-xs">
                    Destination
                  </Badge>
                </div>

                {tripLocations.map((location, index) => (
                  <div key={location.id} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span>{location.name}</span>
                    <Badge variant="outline" className="text-xs capitalize">
                      {location.type.replace("-", " ")}
                    </Badge>
                    <span className="text-xs text-gray-500 ml-auto">{location.distance}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-3 pt-3 border-t">
                <Button variant="outline" size="sm" onClick={() => router.push("/plan-trip")} className="flex-1">
                  Edit Trip
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    const waypoints = tripLocations
                      .map((location) => {
                        const coords = getLocationCoordinates(location.name)
                        return coords ? `${coords.lat},${coords.lng}` : encodeURIComponent(location.name)
                      })
                      .join("|")

                    const dest_coords = getDestinationCoordinates(tripDestination)
                    const dest = dest_coords
                      ? `${dest_coords.lat},${dest_coords.lng}`
                      : encodeURIComponent(tripDestination)

                    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${dest}&waypoints=${waypoints}&travelmode=driving`
                    window.open(googleMapsUrl, "_blank")
                  }}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  Start Trip
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <MobileNavigation />
    </div>
  )
}

// Helper functions for coordinate mapping
const getLocationCoordinates = (locationName: string) => {
  const locationCoords: Record<string, { lat: number; lng: number }> = {
    "N.B Waterfall": { lat: 31.2856, lng: 76.7235 },
    "Rukmani Kund": { lat: 31.3156, lng: 76.7535 },
    "Markandya Temple": { lat: 31.3356, lng: 76.7835 },
    "Bandla Paragliding Site": { lat: 31.2956, lng: 76.7435 },
    "Chadwick Falls": { lat: 31.0848, lng: 77.1534 },
    "Prospect Hill": { lat: 31.1248, lng: 77.1834 },
    "Annandale Ground": { lat: 31.0948, lng: 77.1634 },
    "Summer Hill": { lat: 31.0748, lng: 77.1434 },
    "Solang Valley": { lat: 32.3196, lng: 77.1487 },
    "Rohtang Pass": { lat: 32.3726, lng: 77.2497 },
    "Old Manali": { lat: 32.2496, lng: 77.1787 },
    "Vashisht Hot Springs": { lat: 32.2696, lng: 77.1987 },
    "Bhagsu Waterfall": { lat: 32.239, lng: 76.3134 },
    "Triund Trek": { lat: 32.249, lng: 76.3234 },
    "Namgyal Monastery": { lat: 32.229, lng: 76.3034 },
    "Dal Lake": { lat: 32.219, lng: 76.2934 },
    "Tosh Village": { lat: 32.0402, lng: 77.3447 },
    "Malana Village": { lat: 32.0902, lng: 77.2947 },
    "Kheerganga Trek": { lat: 32.0702, lng: 77.3247 },
    "Chalal Village": { lat: 32.0202, lng: 77.3047 },
  }
  return locationCoords[locationName] || null
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
  }
  return destinationCoords[dest.toLowerCase()] || null
}
