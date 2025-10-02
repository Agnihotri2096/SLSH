"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AppHeader } from "@/components/app-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { ArrowLeft, Edit, Settings, LogOut, Shield, Phone, Mail, Calendar, Award, Gift, Trophy } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"

export default function ProfilePage() {
  const { user, isGuest, isAdmin, logout, updateUser } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(user?.name || "")

  if (isGuest || !user) {
    router.push("/login")
    return null
  }

  const handleSaveProfile = () => {
    if (editedName.trim()) {
      updateUser({ name: editedName.trim() })
      setIsEditing(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <AppHeader />

      <div className="px-3 sm:px-4 py-4 sm:py-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        </div>

        {/* Profile Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.profilePicture || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-lg font-semibold bg-green-100 text-green-700">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="text-lg font-semibold"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveProfile}>
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                      <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="p-1">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-gray-600">{user.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={isAdmin ? "destructive" : "secondary"}>
                        {isAdmin ? (
                          <>
                            <Shield className="h-3 w-3 mr-1" />
                            Admin
                          </>
                        ) : (
                          <>User</>
                        )}
                      </Badge>
                      {user.authMethod && (
                        <Badge variant="outline">
                          {user.authMethod === "google" ? (
                            <>
                              <Mail className="h-3 w-3 mr-1" />
                              Google
                            </>
                          ) : (
                            <>
                              <Phone className="h-3 w-3 mr-1" />
                              Phone
                            </>
                          )}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats for regular users */}
            {!isAdmin && (
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{user.ecoPoints}</div>
                  <div className="text-sm text-gray-500">Eco Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{user.totalBottlesSaved}</div>
                  <div className="text-sm text-gray-500">Bottles Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{user.totalDistanceWalked}km</div>
                  <div className="text-sm text-gray-500">Distance</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <Label className="text-sm font-medium">Email</Label>
                <div className="text-gray-600">{user.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <Label className="text-sm font-medium">Member Since</Label>
                <div className="text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
            {user.authMethod && (
              <div className="flex items-center gap-3">
                {user.authMethod === "google" ? (
                  <Mail className="h-5 w-5 text-gray-400" />
                ) : (
                  <Phone className="h-5 w-5 text-gray-400" />
                )}
                <div>
                  <Label className="text-sm font-medium">Authentication Method</Label>
                  <div className="text-gray-600 capitalize">{user.authMethod}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements for regular users */}
        {!isAdmin && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements & Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Eco Points Badges */}
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">Eco Warrior</h3>
                      <p className="text-sm text-green-600">{user.ecoPoints} points earned</p>
                    </div>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((user.ecoPoints / 1000) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    {user.ecoPoints >= 1000 ? "Master Level!" : `${1000 - user.ecoPoints} points to next level`}
                  </p>
                </div>

                {/* Bottles Saved Badge */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">♻️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-800">Planet Saver</h3>
                      <p className="text-sm text-blue-600">{user.totalBottlesSaved} bottles saved</p>
                    </div>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((user.totalBottlesSaved / 100) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    {user.totalBottlesSaved >= 100
                      ? "Champion Level!"
                      : `${100 - user.totalBottlesSaved} bottles to next level`}
                  </p>
                </div>

                {/* Distance Badge */}
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">🚶</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-800">Explorer</h3>
                      <p className="text-sm text-purple-600">{user.totalDistanceWalked}km walked</p>
                    </div>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((user.totalDistanceWalked / 50) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-purple-600 mt-1">
                    {user.totalDistanceWalked >= 50
                      ? "Master Explorer!"
                      : `${50 - user.totalDistanceWalked}km to next level`}
                  </p>
                </div>

                {/* Special Achievement Badge */}
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-yellow-800">Eco Champion</h3>
                      <p className="text-sm text-yellow-600">
                        {user.ecoPoints >= 2000 ? "Elite Status" : "Keep going!"}
                      </p>
                    </div>
                  </div>
                  {user.ecoPoints >= 2000 && <Badge className="bg-yellow-500 text-white">🏆 Elite Eco Champion</Badge>}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    Your Ranking
                  </h4>
                  <Button variant="outline" size="sm" onClick={() => router.push("/leaderboard")}>
                    View Full Leaderboard
                  </Button>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      #5
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.ecoPoints} eco points</p>
                    </div>
                    <Badge variant="secondary">Top 10%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 bg-transparent"
                onClick={() => router.push("/leaderboard")}
              >
                <Trophy className="h-4 w-4" />
                Leaderboard
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 bg-transparent"
                onClick={() => router.push("/badges")}
              >
                <Award className="h-4 w-4" />
                All Badges
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 bg-transparent"
                onClick={() => router.push("/discounts")}
              >
                <Gift className="h-4 w-4" />
                Discounts & Benefits
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 bg-transparent"
                onClick={() => router.push("/settings")}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <MobileNavigation />
    </div>
  )
}
