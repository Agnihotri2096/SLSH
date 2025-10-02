"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { LocationReviews } from "@/components/location-reviews"
import type { EcoLocation } from "@/types"

// Mock hotel data as EcoLocation for reviews
const mockHotelData = {
  "1": {
    id: "hotel-1",
    name: "Eco Valley Resort",
    type: "eco-accommodation" as const,
    latitude: 31.1048,
    longitude: 77.1734,
    address: "Shimla, Himachal Pradesh",
    description: "Luxury eco-resort with solar power and organic dining",
    ecoRating: 5,
    image: "/eco-valley-resort-shimla.png",
    qrCode: "QR_ECO_VALLEY_001",
    availableActions: [],
    averageRating: 4.8,
    totalReviews: 127,
    reviews: [
      {
        id: "1",
        userId: "user1",
        userName: "Priya Sharma",
        userProfilePicture: "/placeholder-user.jpg",
        locationId: "hotel-1",
        rating: 5,
        title: "Amazing eco-friendly experience!",
        content:
          "The solar-powered facilities and organic food made our stay incredible. The mountain views are breathtaking!",
        images: ["/eco-valley-resort-room.png", "/eco-valley-resort-garden.png"],
        likes: 15,
        dislikes: 0,
        userLikes: [],
        userDislikes: [],
        isVerifiedVisit: true,
        visitDate: new Date("2024-01-15"),
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
        helpful: 12,
        tags: ["eco-friendly", "luxury", "mountain-view"],
      },
    ],
    stories: [],
  },
}

export default function HotelReviewsPage() {
  const params = useParams()
  const router = useRouter()
  const [hotel, setHotel] = useState<EcoLocation | null>(null)

  useEffect(() => {
    const hotelId = params.id as string
    const foundHotel = mockHotelData[hotelId as keyof typeof mockHotelData]
    setHotel(foundHotel || null)
  }, [params.id])

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Hotel not found</h2>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{hotel.name}</h1>
              <p className="text-sm text-gray-600">{hotel.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LocationReviews
          location={hotel}
          onReviewSubmit={(review) => {
            console.log("New hotel review submitted:", review)
            // In a real app, this would submit to an API
          }}
        />
      </div>
    </div>
  )
}
