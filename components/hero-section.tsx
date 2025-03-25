import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to Horeb Market
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Discover a world of quality products at competitive prices. Shop with confidence and enjoy fast delivery
                to your doorstep.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/products">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Link href="/deals">
                <Button variant="outline" size="lg">
                  View Deals
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-full md:h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                Summer Sale - Up to 50% Off
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

