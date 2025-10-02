"use client"

import { useAuth } from "@/contexts/auth-context"
import { useGamification } from "@/contexts/gamification-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AppHeader } from "@/components/app-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { EcoMap } from "@/components/eco-map"
import {
  Loader2,
  MapPin,
  QrCode,
  Droplets,
  Trash2,
  TestTube,
  Footprints,
  TreePine,
  Hotel,
  Star,
  ExternalLink,
  Leaf,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const hotelDeals = [
  {
    id: "1",
    name: "Eco Valley Resort",
    location: "Shimla",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&crop=center",
    ecoRating: 5,
    deals: [
      { platform: "Booking.com", price: 4500, originalPrice: 5200, link: "https://booking.com" },
      { platform: "Agoda", price: 4200, originalPrice: 5000, link: "https://agoda.com" },
      { platform: "MakeMyTrip", price: 4800, originalPrice: 5500, link: "https://makemytrip.com" },
    ],
    features: ["Solar Power", "Organic Food", "Waste Management"],
  },
  {
    id: "2",
    name: "Green Mountain Lodge",
    location: "Manali",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop&crop=center",
    ecoRating: 4,
    deals: [
      { platform: "Expedia", price: 3200, originalPrice: 3800, link: "https://expedia.com" },
      { platform: "Goibibo", price: 2900, originalPrice: 3500, link: "https://goibibo.com" },
      { platform: "Booking.com", price: 3400, originalPrice: 4000, link: "https://booking.com" },
    ],
    features: ["Rainwater Harvesting", "Local Cuisine", "Nature Walks"],
  },
  {
    id: "3",
    name: "Sustainable Hills Retreat",
    location: "Dharamshala",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop&crop=center",
    ecoRating: 5,
    deals: [
      { platform: "MakeMyTrip", price: 3800, originalPrice: 4500, link: "https://makemytrip.com" },
      { platform: "Agoda", price: 3600, originalPrice: 4200, link: "https://agoda.com" },
      { platform: "Cleartrip", price: 3900, originalPrice: 4600, link: "https://cleartrip.com" },
    ],
    features: ["Zero Waste", "Meditation Center", "Organic Garden"],
  },
  {
    id: "4",
    name: "Himalayan Eco Lodge",
    location: "Kasol",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=400&h=300&fit=crop&crop=center",
    ecoRating: 4,
    deals: [
      { platform: "Booking.com", price: 2800, originalPrice: 3200, link: "https://booking.com" },
      { platform: "Hostelworld", price: 2500, originalPrice: 3000, link: "https://hostelworld.com" },
      { platform: "Agoda", price: 2700, originalPrice: 3100, link: "https://agoda.com" },
    ],
    features: ["River View", "Organic Meals", "Trekking Base"],
  },
  {
    id: "5",
    name: "Spiti Valley Eco Camp",
    location: "Spiti Valley",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop&crop=center",
    ecoRating: 5,
    deals: [
      { platform: "MakeMyTrip", price: 3500, originalPrice: 4000, link: "https://makemytrip.com" },
      { platform: "Goibibo", price: 3300, originalPrice: 3800, link: "https://goibibo.com" },
      { platform: "Thrillophilia", price: 3600, originalPrice: 4100, link: "https://thrillophilia.com" },
    ],
    features: ["Solar Heating", "Local Culture", "Stargazing"],
  },
]

export default function HomePage() {
  const { user, isLoading, isGuest, isAdmin } = useAuth() // Using enhanced auth context
  const { totalPoints, todayStats } = useGamification()
  const router = useRouter()

  const handleHotelBooking = (hotelName: string, platform: string, link: string) => {
    // Track booking attempt
    console.log(`User ${user?.name} clicked to book ${hotelName} via ${platform}`)
    // Redirect to booking platform
    window.open(link, "_blank")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-gray-600">Loading PrithviPath...</p>
        </div>
      </div>
    )
  }

  if (isAdmin) {
    router.push("/admin")
    return null
  }

  if (isGuest) {
    router.push("/guest")
    return null
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Welcome to <span className="text-green-600">PrithviPath</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your indispensable mobile companion for sustainable tourism in India. Discover eco-friendly spots, earn
              rewards, and connect with local culture.
            </p>
          </div>

          <div className="text-center">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 sm:px-8 text-base sm:text-lg h-12 sm:h-14 min-w-[160px]"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <AppHeader />

      <div className="px-3 sm:px-4 py-4 sm:py-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold mb-1">Welcome back, {user.name}!</h2>
              <p className="text-green-100 text-sm">Continue your sustainable journey</p>
            </div>
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-bold">{user.ecoPoints}</div>
              <div className="text-green-100 text-xs sm:text-sm">Eco Points</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm mb-4 sm:mb-6 h-48 sm:h-64 lg:h-80 relative overflow-hidden">
          <EcoMap />

          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-sm z-10">
            <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                <span className="text-gray-600">Himachal Pradesh</span>
              </div>
              <div className="flex items-center space-x-1">
                <TreePine className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                <span className="text-gray-600">32 Eco-Locations</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Button
            variant="outline"
            className="flex flex-col items-center py-3 sm:py-4 h-auto bg-white hover:bg-gray-50 border-gray-200 min-h-[80px] sm:min-h-[90px]"
            onClick={() => router.push("/scan")}
          >
            <QrCode className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2" />
            <span className="text-xs sm:text-sm font-medium">Scan QR</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col items-center py-3 sm:py-4 h-auto bg-white hover:bg-gray-50 border-gray-200 min-h-[80px] sm:min-h-[90px]"
            onClick={() => router.push("/refill")}
          >
            <Droplets className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2 text-blue-500" />
            <span className="text-xs sm:text-sm font-medium">Refill Water</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col items-center py-3 sm:py-4 h-auto bg-white hover:bg-gray-50 border-gray-200 min-h-[80px] sm:min-h-[90px]"
            onClick={() => router.push("/waste")}
          >
            <Trash2 className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2 text-orange-500" />
            <span className="text-xs sm:text-sm font-medium">Dispose Waste</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col items-center py-3 sm:py-4 h-auto bg-white hover:bg-gray-50 border-gray-200 min-h-[80px] sm:min-h-[90px]"
            onClick={() => router.push("/demo")}
          >
            <TestTube className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2 text-purple-500" />
            <span className="text-xs sm:text-sm font-medium">QR Demo</span>
          </Button>
        </div>

        <div className="mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Your Impact Today</h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-4 text-center">
                <Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mx-auto mb-1 sm:mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-gray-900">3</div>
                <div className="text-xs sm:text-sm text-gray-500 leading-tight">Bottles Refilled</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-4 text-center">
                <Trash2 className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 mx-auto mb-1 sm:mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-gray-900">2</div>
                <div className="text-xs sm:text-sm text-gray-500 leading-tight">Waste Disposed</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-4 text-center">
                <Footprints className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mx-auto mb-1 sm:mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-gray-900">8.2</div>
                <div className="text-xs sm:text-sm text-gray-500 leading-tight">km Walked</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Your Achievements</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-700">{user.totalBottlesSaved}</div>
                    <div className="text-sm text-green-600">Total Bottles Saved</div>
                  </div>
                  <Droplets className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-700">{user.totalDistanceWalked}km</div>
                    <div className="text-sm text-blue-600">Distance Walked</div>
                  </div>
                  <Footprints className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="flex items-center justify-start gap-3 p-4 h-auto bg-white hover:bg-gray-50"
              onClick={() => router.push("/profile")}
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TreePine className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">View Profile</div>
                <div className="text-sm text-gray-500">Manage your account</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-start gap-3 p-4 h-auto bg-white hover:bg-gray-50"
              onClick={() => router.push("/rewards")}
            >
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold">★</span>
              </div>
              <div className="text-left">
                <div className="font-medium">Rewards</div>
                <div className="text-sm text-gray-500">Redeem your points</div>
              </div>
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Hotel className="h-5 w-5 text-green-600" />
              Eco-Friendly Hotel Deals
            </h2>
            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {hotelDeals.map((hotel) => {
              const bestDeal = hotel.deals.reduce((min, deal) => (deal.price < min.price ? deal : min))
              const savings = bestDeal.originalPrice - bestDeal.price
              const photoCount = 5 // Each hotel has 5 photos as per the mock data

              return (
                <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-48 h-32 sm:h-auto relative cursor-pointer group">
                        <img
                          src={hotel.image || "/placeholder.svg"}
                          alt={hotel.name}
                          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                          onClick={() => router.push(`/hotel/${hotel.id}/photos`)}
                        />
                        <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                          <Leaf className="h-3 w-3 mr-1" />
                          Eco {hotel.ecoRating}/5
                        </Badge>
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          📷 {photoCount}
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full text-center opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to view photo gallery
                        </div>
                      </div>

                      {/* Hotel Details */}
                      <div className="flex-1 p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex-1 mb-3 sm:mb-0">
                            <h3 className="font-semibold text-lg text-gray-900 mb-1">{hotel.name}</h3>
                            <div className="flex items-center gap-1 mb-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{hotel.location}</span>
                              <div className="flex items-center ml-2">
                                {[...Array(hotel.ecoRating)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                                ))}
                              </div>
                              <div className="flex gap-1 ml-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto"
                                  onClick={() => router.push(`/hotel/${hotel.id}/photos`)}
                                >
                                  📷 Photos
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-green-600 hover:text-green-700 p-0 h-auto ml-2"
                                  onClick={() => router.push(`/hotel/${hotel.id}/reviews`)}
                                >
                                  Reviews
                                </Button>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {hotel.features.map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Pricing */}
                          <div className="sm:text-right">
                            <div className="text-sm text-gray-500 mb-1">Best Price</div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-2xl font-bold text-green-600">₹{bestDeal.price}</span>
                              <span className="text-sm text-gray-500 line-through">₹{bestDeal.originalPrice}</span>
                            </div>
                            <div className="text-xs text-green-600 mb-2">Save ₹{savings}</div>
                            <div className="text-xs text-gray-500 mb-3">via {bestDeal.platform}</div>
                          </div>
                        </div>

                        {/* Booking Options */}
                        <div className="border-t pt-3">
                          <div className="text-xs text-gray-500 mb-2">Compare prices:</div>
                          <div className="flex flex-wrap gap-2">
                            {hotel.deals.map((deal, index) => (
                              <Button
                                key={index}
                                variant={deal === bestDeal ? "default" : "outline"}
                                size="sm"
                                className={`text-xs ${deal === bestDeal ? "bg-green-600 hover:bg-green-700" : ""}`}
                                onClick={() => handleHotelBooking(hotel.name, deal.platform, deal.link)}
                              >
                                <span className="mr-1">{deal.platform}</span>
                                <span className="font-semibold">₹{deal.price}</span>
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      <MobileNavigation />
    </div>
  )
}
