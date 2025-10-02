"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AppHeader } from "@/components/app-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ArrowLeft, Trophy, Medal, Award, Crown } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Mock leaderboard data - in real app this would come from API
const mockLeaderboard = [
  {
    id: 1,
    name: "Sarah Chen",
    ecoPoints: 2850,
    totalBottlesSaved: 145,
    totalDistanceWalked: 78,
    avatar: "/placeholder.svg",
    rank: 1,
  },
  {
    id: 2,
    name: "Mike Johnson",
    ecoPoints: 2640,
    totalBottlesSaved: 132,
    totalDistanceWalked: 65,
    avatar: "/placeholder.svg",
    rank: 2,
  },
  {
    id: 3,
    name: "Emma Wilson",
    ecoPoints: 2420,
    totalBottlesSaved: 121,
    totalDistanceWalked: 58,
    avatar: "/placeholder.svg",
    rank: 3,
  },
  {
    id: 4,
    name: "David Kim",
    ecoPoints: 2180,
    totalBottlesSaved: 109,
    totalDistanceWalked: 52,
    avatar: "/placeholder.svg",
    rank: 4,
  },
  {
    id: 5,
    name: "Lisa Rodriguez",
    ecoPoints: 1950,
    totalBottlesSaved: 98,
    totalDistanceWalked: 47,
    avatar: "/placeholder.svg",
    rank: 5,
  },
  {
    id: 6,
    name: "Alex Thompson",
    ecoPoints: 1820,
    totalBottlesSaved: 91,
    totalDistanceWalked: 43,
    avatar: "/placeholder.svg",
    rank: 6,
  },
  {
    id: 7,
    name: "Maria Garcia",
    ecoPoints: 1680,
    totalBottlesSaved: 84,
    totalDistanceWalked: 39,
    avatar: "/placeholder.svg",
    rank: 7,
  },
  {
    id: 8,
    name: "James Brown",
    ecoPoints: 1540,
    totalBottlesSaved: 77,
    totalDistanceWalked: 35,
    avatar: "/placeholder.svg",
    rank: 8,
  },
]

export default function LeaderboardPage() {
  const { user, isGuest } = useAuth()
  const router = useRouter()

  if (isGuest || !user) {
    router.push("/login")
    return null
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <Trophy className="h-4 w-4 text-gray-400" />
    }
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-yellow-500 text-white">👑 Champion</Badge>
    if (rank === 2) return <Badge className="bg-gray-500 text-white">🥈 Runner-up</Badge>
    if (rank === 3) return <Badge className="bg-amber-600 text-white">🥉 Third Place</Badge>
    if (rank <= 10) return <Badge variant="secondary">Top 10</Badge>
    return <Badge variant="outline">#{rank}</Badge>
  }

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
          <h1 className="text-xl font-bold text-gray-900">Leaderboard</h1>
        </div>

        {/* Top 3 Podium */}
        <Card className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-center justify-center">
              <Trophy className="h-6 w-6 text-yellow-600" />
              Top Eco Champions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-end gap-4 mb-4">
              {/* Second Place */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full mb-2 mx-auto relative">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={mockLeaderboard[1].avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gray-200">
                      {mockLeaderboard[1].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                </div>
                <p className="font-semibold text-sm">{mockLeaderboard[1].name}</p>
                <p className="text-xs text-gray-600">{mockLeaderboard[1].ecoPoints} pts</p>
              </div>

              {/* First Place */}
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full mb-2 mx-auto relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={mockLeaderboard[0].avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-yellow-200">
                      {mockLeaderboard[0].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                </div>
                <p className="font-bold">{mockLeaderboard[0].name}</p>
                <p className="text-sm text-yellow-600 font-semibold">{mockLeaderboard[0].ecoPoints} pts</p>
              </div>

              {/* Third Place */}
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full mb-2 mx-auto relative">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={mockLeaderboard[2].avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-amber-200">
                      {mockLeaderboard[2].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                </div>
                <p className="font-semibold text-sm">{mockLeaderboard[2].name}</p>
                <p className="text-xs text-gray-600">{mockLeaderboard[2].ecoPoints} pts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>All Rankings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {mockLeaderboard.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center gap-4 p-4 border-b last:border-b-0 ${
                    player.name === user.name ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center justify-center w-8 h-8">{getRankIcon(player.rank)}</div>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={player.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gray-200">
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{player.name}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{player.ecoPoints} pts</span>
                        <span>{player.totalBottlesSaved} bottles</span>
                        <span>{player.totalDistanceWalked}km</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getRankBadge(player.rank)}
                    {player.name === user.name && (
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        You
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <MobileNavigation />
    </div>
  )
}
