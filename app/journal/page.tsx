"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppHeader } from "@/components/app-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { StoryViewer } from "@/components/story-viewer"
import { useStories } from "@/contexts/stories-context"
import { useAuth } from "@/contexts/auth-context"
import { BookOpen, Search, Calendar, Star, MapPin, Camera, Clock, TreePine, Mountain, Waves } from "lucide-react"
import type { CulturalStory } from "@/types"

// Mock visited places data - in real app this would come from context/API
const mockVisitedPlaces = [
  {
    id: "1",
    name: "Kol Dam",
    type: "cultural-site",
    visitDate: "2024-01-15",
    image: "/kol-dam-himachal-pradesh.png",
    description: "Visited the magnificent Kol Dam, one of India's tallest concrete dams",
    rating: 5,
    icon: Waves,
  },
  {
    id: "2",
    name: "Shimla Ridge",
    type: "cultural-site",
    visitDate: "2024-01-10",
    image: "/shimla-ridge-mall-road.png",
    description: "Explored the historic Ridge and Mall Road in Shimla",
    rating: 4,
    icon: Mountain,
  },
  {
    id: "3",
    name: "Eco Valley Cafe",
    type: "eco-restaurant",
    visitDate: "2024-01-08",
    image: "/placeholder-da3ih.png",
    description: "Enjoyed organic local cuisine at this sustainable mountain cafe",
    rating: 5,
    icon: TreePine,
  },
]

export default function JournalPage() {
  const { unlockedStories } = useStories()
  const { user } = useAuth()
  const [selectedStory, setSelectedStory] = useState<CulturalStory | null>(null)
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("stories")

  const filteredStories = unlockedStories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredPlaces = mockVisitedPlaces.filter(
    (place) =>
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleStorySelect = (story: CulturalStory, index: number) => {
    setSelectedStory(story)
    setSelectedStoryIndex(index)
  }

  const handleNextStory = () => {
    if (selectedStoryIndex < filteredStories.length - 1) {
      const nextIndex = selectedStoryIndex + 1
      setSelectedStory(filteredStories[nextIndex])
      setSelectedStoryIndex(nextIndex)
    }
  }

  const handlePreviousStory = () => {
    if (selectedStoryIndex > 0) {
      const prevIndex = selectedStoryIndex - 1
      setSelectedStory(filteredStories[prevIndex])
      setSelectedStoryIndex(prevIndex)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <AppHeader />

      <div className="px-4 py-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Travel Journal</h1>
          <p className="text-gray-600">Your unlocked stories and visited places in Himachal Pradesh</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search stories and places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Stories ({unlockedStories.length})
            </TabsTrigger>
            <TabsTrigger value="places" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Places ({mockVisitedPlaces.length})
            </TabsTrigger>
          </TabsList>

          {/* Stories Tab */}
          <TabsContent value="stories">
            {unlockedStories.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">No Stories Unlocked Yet</h3>
                  <p className="text-gray-600 mb-4">
                    Explore Himachal Pradesh and scan QR codes at cultural sites to unlock fascinating stories!
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">Start Exploring</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredStories.map((story, index) => (
                  <Card
                    key={story.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleStorySelect(story, index)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg font-semibold line-clamp-2">{story.title}</CardTitle>
                        <Badge className="bg-green-100 text-green-800 text-xs ml-2">
                          <Star className="h-3 w-3 mr-1" />
                          Unlocked
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {story.images.length > 0 && (
                          <img
                            src={story.images[0] || "/placeholder.svg"}
                            alt={story.title}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        )}
                        <p className="text-sm text-gray-600 line-clamp-3">{story.content}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            <span>Cultural Story</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Recently unlocked</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredStories.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No stories found</h3>
                <p className="text-gray-600">Try searching with different keywords</p>
              </div>
            )}
          </TabsContent>

          {/* Places Tab */}
          <TabsContent value="places">
            {mockVisitedPlaces.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">No Places Visited Yet</h3>
                  <p className="text-gray-600 mb-4">
                    Start exploring eco-locations in Himachal Pradesh to build your travel journal!
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">Explore Map</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredPlaces.map((place) => {
                  const Icon = place.icon
                  return (
                    <Card key={place.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg font-semibold">{place.name}</CardTitle>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < place.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <img
                            src={place.image || "/placeholder.svg"}
                            alt={place.name}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <p className="text-sm text-gray-600">{place.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Icon className="h-3 w-3" />
                              <span className="capitalize">{place.type.replace("-", " ")}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{new Date(place.visitDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Camera className="h-3 w-3" />
                              <span>Visited</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {filteredPlaces.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No places found</h3>
                <p className="text-gray-600">Try searching with different keywords</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Story Viewer Modal */}
      {selectedStory && (
        <StoryViewer
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
          showNavigation={filteredStories.length > 1}
          onNext={selectedStoryIndex < filteredStories.length - 1 ? handleNextStory : undefined}
          onPrevious={selectedStoryIndex > 0 ? handlePreviousStory : undefined}
        />
      )}

      <MobileNavigation />
    </div>
  )
}
