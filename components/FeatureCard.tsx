"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import type React from "react"
import { Star, Heart, Eye, ShoppingCart, TrendingUp } from "lucide-react"

interface Feature {
  name: string
  icon?: React.ElementType
}

interface FeatureCardProps {
  id: string
  imageSrc: string
  imageAlt: string
  name: string
  description: string
  price: number
  discount?: number
  mainFeatures: Feature[]
}

export default function FeatureCard({
  id,
  imageSrc,
  imageAlt,
  name,
  description,
  price,
  discount,
  mainFeatures,
}: FeatureCardProps) {
  const discountedPrice = discount ? price - discount : price
  const { user } = useAuth()
  const router = useRouter()

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please sign in to buy a car.")
      router.push("/auth/signin")
    } else {
      toast.success(`You clicked Buy Now for ${name}! (Placeholder action)`)
      // Implement actual buying logic here
    }
  }

  return (
    <div className="group animate-fade-in">
      <Card className="w-full max-w-sm rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 bg-gradient-card border-0 group-hover:border-theme-primary-200/50">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-2xl group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount && (
              <div className="bg-gradient-secondary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                Save ₹{discount.toLocaleString("en-IN")}
              </div>
            )}
            <div className="bg-theme-primary-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              Hot Deal
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-theme-accent-700 hover:text-theme-primary-600 hover:bg-white transition-all duration-200">
              <Heart className="h-4 w-4" />
            </button>
            <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-theme-accent-700 hover:text-theme-primary-600 hover:bg-white transition-all duration-200">
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-display font-bold text-theme-accent-900 group-hover:text-theme-primary-600 transition-colors duration-300">
            {name}
          </CardTitle>
          <CardDescription className="text-sm text-theme-accent-600 line-clamp-2 leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex flex-col gap-4 pb-4">
          {/* Price Section */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-bold gradient-text-primary">
              ₹{discountedPrice.toLocaleString("en-IN")}
            </span>
            {discount && (
              <span className="text-sm text-theme-accent-500 line-through">
                ₹{price.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          
          {/* Features List */}
          <div className="space-y-2">
            {mainFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-theme-accent-700">
                {feature.icon && (
                  <feature.icon className="h-4 w-4 text-theme-primary-500 flex-shrink-0" />
                )}
                <span>{feature.name}</span>
              </div>
            ))}
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-theme-secondary-400 fill-current" />
            ))}
            <span className="text-xs text-theme-accent-600 ml-2">(4.8)</span>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0">
          <Button 
            onClick={handleBuyNow} 
            className="w-full bg-gradient-primary hover:bg-gradient-primary text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group-hover:shadow-glow"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Buy Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
