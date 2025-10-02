"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react"
import type { EcoLocation } from "@/types"
import { mockEcoLocations } from "@/data/mock-data"

export default function LocationPhotosPage() {
  const params = useParams()
  const router = useRouter()
  const [location, setLocation] = useState<EcoLocation | null>(null)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)
  const [allPhotos, setAllPhotos] = useState<string[]>([])

  useEffect(() => {
    const locationId = params.id as string
    const foundLocation = mockEcoLocations.find((loc) => loc.id === locationId)

    if (foundLocation) {
      setLocation(foundLocation)

      // Collect all photos from location and reviews
      const photos: string[] = []

      // Add main location image
      if (foundLocation.image) {
        photos.push(foundLocation.image)
      }

      // Add photos from reviews
      foundLocation.reviews?.forEach((review) => {
        if (review.images) {
          photos.push(...review.images)
        }
      })

      setAllPhotos(photos)
    }
  }, [params.id])

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index)
  }

  const closeLightbox = () => {
    setSelectedPhotoIndex(null)
  }

  const nextPhoto = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex < allPhotos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1)
    }
  }

  const prevPhoto = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1)
    }
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Location not found</h2>
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
              <h1 className="text-xl font-bold text-gray-900">{location.name}</h1>
              <p className="text-sm text-gray-600">{allPhotos.length} photos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {allPhotos.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No photos available</h3>
              <p className="text-gray-600">Be the first to share photos of this location!</p>
              <Button
                className="mt-4 bg-green-600 hover:bg-green-700"
                onClick={() => router.push(`/location/${location.id}/reviews`)}
              >
                Write a Review
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allPhotos.map((photo, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={photo || "/placeholder.svg"}
                  alt={`Photo ${index + 1} of ${location.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-full p-4">
            <img
              src={allPhotos[selectedPhotoIndex] || "/placeholder.svg"}
              alt={`Photo ${selectedPhotoIndex + 1} of ${location.name}`}
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

            {selectedPhotoIndex < allPhotos.length - 1 && (
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
              {selectedPhotoIndex + 1} of {allPhotos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
