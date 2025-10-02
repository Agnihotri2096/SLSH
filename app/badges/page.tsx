"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AppHeader } from "@/components/app-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ArrowLeft, Award } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const badgeCategories = [
  {
    title: "Eco Points Badges",
    badges: [
      {
        id: 1,
        name: "Eco Starter",
        description: "Earn your first 100 eco points",
        icon: "🌱",
        requirement: 100,
        earned: true,
      },
      { id: 2, name: "Eco Warrior", description: "Reach 500 eco points", icon: "⚡", requirement: 500, earned: true },
      {
        id: 3,
        name: "Eco Champion",
        description: "Achieve 1000 eco points",
        icon: "🏆",
        requirement: 1000,
        earned: false,
      },
      { id: 4, name: "Eco Master", description: "Reach 2000 eco points", icon: "👑", requirement: 2000, earned: false },
    ],
  },
  {
    title: "Conservation Badges",
    badges: [
      { id: 5, name: "Bottle Saver", description: "Save 25 plastic bottles", icon: "♻️", requirement: 25, earned: true },
      {
        id: 6,
        name: "Planet Protector",
        description: "Save 100 plastic bottles",
        icon: "🌍",
        requirement: 100,
        earned: true,
      },
      {
        id: 7,
        name: "Ocean Guardian",
        description: "Save 250 plastic bottles",
        icon: "🌊",
        requirement: 250,
        earned: false,
      },
      {
        id: 8,
        name: "Earth Hero",
        description: "Save 500 plastic bottles",
        icon: "🦸",
        requirement: 500,
        earned: false,
      },
    ],
  },
  {
    title: "Explorer Badges",
    badges: [
      { id: 9, name: "First Steps", description: "Walk your first 5km", icon: "👣", requirement: 5, earned: true },
      { id: 10, name: "Trail Walker", description: "Walk 25km total", icon: "🥾", requirement: 25, earned: true },
      { id: 11, name: "Distance Runner", description: "Walk 50km total", icon: "🏃", requirement: 50, earned: false },
      { id: 12, name: "Marathon Master", description: "Walk 100km total", icon: "🏅", requirement: 100, earned: false },
    ],
  },
  {
    title: "Special Achievements",
    badges: [
      {
        id: 13,
        name: "Early Adopter",
        description: "Join in the first month",
        icon: "⭐",
        requirement: "Special",
        earned: true,
      },
      {
        id: 14,
        name: "Community Leader",
        description: "Refer 5 friends",
        icon: "👥",
        requirement: "Social",
        earned: false,
      },
      {
        id: 15,
        name: "Streak Master",
        description: "7-day activity streak",
        icon: "🔥",
        requirement: "Consistency",
        earned: false,
      },
      {
        id: 16,
        name: "Perfect Week",
        description: "Complete all daily challenges",
        icon: "💎",
        requirement: "Excellence",
        earned: false,
      },
    ],
  },
]

export default function BadgesPage() {
  const { user, isGuest } = useAuth()
  const router = useRouter()

  if (isGuest || !user) {
    router.push("/login")
    return null
  }

  const totalBadges = badgeCategories.reduce((sum, category) => sum + category.badges.length, 0)
  const earnedBadges = badgeCategories.reduce(
    (sum, category) => sum + category.badges.filter((badge) => badge.earned).length,
    0,
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <AppHeader />

      <div className="px-3 sm:px-4 py-4 sm:py-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">All Badges</h1>
        </div>

        {/* Progress Overview */}
        <Card className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-purple-800">Badge Collection</h2>
                <p className="text-purple-600">
                  {earnedBadges} of {totalBadges} badges earned
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-800">
                  {Math.round((earnedBadges / totalBadges) * 100)}%
                </div>
                <p className="text-sm text-purple-600">Complete</p>
              </div>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-3">
              <div
                className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(earnedBadges / totalBadges) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Badge Categories */}
        {badgeCategories.map((category) => (
          <Card key={category.title} className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      badge.earned ? "bg-green-50 border-green-200 shadow-sm" : "bg-gray-50 border-gray-200 opacity-60"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`text-3xl ${badge.earned ? "" : "grayscale"}`}>{badge.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${badge.earned ? "text-green-800" : "text-gray-600"}`}>
                            {badge.name}
                          </h3>
                          {badge.earned && <Badge className="bg-green-500 text-white text-xs">✓ Earned</Badge>}
                        </div>
                        <p className={`text-sm ${badge.earned ? "text-green-600" : "text-gray-500"}`}>
                          {badge.description}
                        </p>
                        {typeof badge.requirement === "number" && (
                          <p className="text-xs text-gray-500 mt-1">
                            Requirement: {badge.requirement}{" "}
                            {category.title.includes("Points")
                              ? "points"
                              : category.title.includes("Conservation")
                                ? "bottles"
                                : category.title.includes("Explorer")
                                  ? "km"
                                  : ""}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <MobileNavigation />
    </div>
  )
}
