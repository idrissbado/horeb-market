import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  discount?: number
}

export default function ProductCard({ id, name, price, image, category, discount }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Link href={`/products/${id}`}>
          <div className="overflow-hidden aspect-square">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              width={300}
              height={300}
              className="object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
        </Link>
        {discount && <Badge className="absolute top-2 right-2 bg-red-500">-{discount}%</Badge>}
      </div>
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground mb-2">{category}</div>
        <Link href={`/products/${id}`} className="hover:underline">
          <h3 className="font-medium text-lg mb-2 line-clamp-2">{name}</h3>
        </Link>
        <div className="flex items-center justify-between">
          {discount ? (
            <div className="flex items-center gap-2">
              <span className="font-bold">${(price * (1 - discount / 100)).toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">${price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="font-bold">${price.toFixed(2)}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

