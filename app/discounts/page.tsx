"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AppHeader } from "@/components/app-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ArrowLeft, Gift, Star, Coffee, Droplets, Hotel, Calendar, Trophy, Crown } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"

export default function DiscountsPage() {
  const { user, isGuest } = useAuth()
  const router = useRouter()
  const [redeemedRewards, setRedeemedRewards] = useState<number[]>([])

  if (isGuest || !user) {
    router.push("/login")
    return null
  }

  const discountTiers = [
    {
      id: 1,
      points: 100,
      title: "Small Discount",
      description: "5% discount at partnered eco-cafés/shops",
      icon: Coffee,
      color: "bg-green-100 text-green-600",
      available: user.ecoPoints >= 100,
      type: "discount",
    },
    {
      id: 2,
      points: 250,
      title: "Free Water Bottle Refill",
      description: "Free reusable water bottle refill token or eco-friendly souvenir",
      icon: Droplets,
      color: "bg-blue-100 text-blue-600",
      available: user.ecoPoints >= 250,
      type: "token",
    },
    {
      id: 3,
      points: 500,
      title: "Eco-Stay Discount",
      description: "10% discount at verified eco-stays/restaurants",
      icon: Hotel,
      color: "bg-purple-100 text-purple-600",
      available: user.ecoPoints >= 500,
      type: "discount",
    },
    {
      id: 4,
      points: 750,
      title: "Cultural Event Entry",
      description: "Free entry to a cultural/eco-event partnered with local community",
      icon: Calendar,
      color: "bg-orange-100 text-orange-600",
      available: user.ecoPoints >= 750,
      type: "entry",
    },
    {
      id: 5,
      points: 1000,
      title: "Premium Eco Discount",
      description: "15% discount on eco-hotel booking or trekking gear partner",
      icon: Hotel,
      color: "bg-indigo-100 text-indigo-600",
      available: user.ecoPoints >= 1000,
      type: "discount",
    },
    {
      id: 6,
      points: 2000,
      title: "Eco-Champion Package",
      description: "Exclusive badge + major discount (20%) at eco-partner hotels/restaurants",
      icon: Crown,
      color: "bg-yellow-100 text-yellow-600",
      available: user.ecoPoints >= 2000,
      type: "premium",
    },
  ]

  const specialAchievements = [
    {
      id: 7,
      title: "Leaderboard Feature",
      description: "Featured on leaderboard with recognition in app",
      icon: Trophy,
      color: "bg-gold-100 text-gold-600",
      requirement: "Top 10 users monthly",
      type: "achievement",
    },
    {
      id: 8,
      title: "Eco-Champion Badge",
      description: "Special recognition badge for outstanding eco-contributions",
      icon: Star,
      color: "bg-emerald-100 text-emerald-600",
      requirement: "Complete 5 major eco-activities",
      type: "achievement",
    },
  ]

  const handleRedeem = (rewardId: number, points: number) => {
    if (user.ecoPoints >= points && !redeemedRewards.includes(rewardId)) {
      // In a real app, this would make an API call to redeem the reward
      setRedeemedRewards([...redeemedRewards, rewardId])
      // Update user points (in real app, this would be handled by the backend)
      console.log(`Redeemed reward ${rewardId} for ${points} points`)
    }
  }

  const nextMilestone = discountTiers.find((tier) => !tier.available)
  const progressToNext = nextMilestone ? (user.ecoPoints / nextMilestone.points) * 100 : 100

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
          <h1 className="text-xl font-bold text-gray-900">Discounts & Benefits</h1>
        </div>

        {/* Points Balance */}
        <Card className="mb-6 bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-1">Your Eco Points</h2>
                <div className="text-3xl font-bold">{user.ecoPoints}</div>
                <p className="text-green-100 text-sm mt-1">Redeem for exclusive discounts</p>
              </div>
              <Gift className="h-12 w-12 opacity-80" />
            </div>
            {nextMilestone && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress to {nextMilestone.title}</span>
                  <span>
                    {user.ecoPoints}/{nextMilestone.points}
                  </span>
                </div>
                <Progress value={progressToNext} className="bg-white/20" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Discounts */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Discounts</h2>
          <div className="space-y-4">
            {discountTiers.map((tier) => {
              const IconComponent = tier.icon
              const isRedeemed = redeemedRewards.includes(tier.id)

              return (
                <Card
                  key={tier.id}
                  className={`${tier.available ? "border-green-200 bg-green-50" : "opacity-60"} ${isRedeemed ? "border-blue-200 bg-blue-50" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${tier.available ? tier.color : "bg-gray-100 text-gray-400"}`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{tier.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {tier.points} pts
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{tier.description}</p>
                        {isRedeemed && <Badge className="mt-2 bg-blue-100 text-blue-700">✓ Redeemed</Badge>}
                      </div>
                      <Button
                        size="sm"
                        disabled={!tier.available || isRedeemed}
                        className={tier.available && !isRedeemed ? "bg-green-600 hover:bg-green-700" : ""}
                        onClick={() => handleRedeem(tier.id, tier.points)}
                      >
                        {isRedeemed ? "Redeemed" : tier.available ? "Redeem" : "Locked"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Special Achievements */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Special Achievements</h2>
          <div className="space-y-4">
            {specialAchievements.map((achievement) => {
              const IconComponent = achievement.icon

              return (
                <Card key={achievement.id} className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium text-yellow-700">{achievement.requirement}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                        Achievement
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* How Points Work */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How Eco-Points Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Droplets className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm">
                Earn points by refilling water bottles, disposing waste properly, and visiting eco-locations
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Gift className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm">Redeem points for discounts at partner eco-cafés, hotels, and restaurants</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-purple-600" />
              </div>
              <span className="text-sm">Higher point tiers unlock better discounts and exclusive benefits</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Trophy className="h-4 w-4 text-yellow-600" />
              </div>
              <span className="text-sm">Special achievements provide recognition and premium rewards</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <MobileNavigation />
    </div>
  )
}
