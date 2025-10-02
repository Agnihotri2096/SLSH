"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react"

// Mock hotel data with multiple photos
const hotelPhotos = {
  "1": [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop",
  ],
  "2": [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
  ],
  "3": [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
  ],
  "4": [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
  ],
  "5": [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
  ],
}

const hotelNames = {
  "1": "Eco Valley Resort",
  "2": "Green Mountain Lodge",
  "3": "Sustainable Hills Retreat",
  "4": "Himalayan Eco Lodge",
  "5": "Spiti Valley Eco Camp",
}

export default function HotelPhotosPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)

  const hotelId = params.id as string
  const photos = hotelPhotos[hotelId as keyof typeof hotelPhotos] || []
  const hotelName = hotelNames[hotelId as keyof typeof hotelNames] || "Hotel"

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index)
  }

  const closeLightbox = () => {
    setSelectedPhotoIndex(null)
  }

  const nextPhoto = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1)
    }
  }

  const prevPhoto = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1)
    }
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
              <h1 className="text-xl font-bold text-gray-900">{hotelName}</h1>
              <p className="text-sm text-gray-600">{photos.length} photos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openLightbox(index)}
            >
              <img
                src={photo || "/placeholder.svg"}
                alt={`Photo ${index + 1} of ${hotelName}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-full p-4">
            <img
              src={photos[selectedPhotoIndex] || "/placeholder.svg"}
              alt={`Photo ${selectedPhotoIndex + 1} of ${hotelName}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:bg-white/20 p-2"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation buttons */}
            {selectedPhotoIndex > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-2"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}

            {selectedPhotoIndex < photos.length - 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-2"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            )}

            {/* Photo counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
              {selectedPhotoIndex + 1} of {photos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
