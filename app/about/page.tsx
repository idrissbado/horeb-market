import Image from "next/image"
import Link from "next/link"
import { ChevronRight, CheckCircle, Users, ShoppingBag, Truck, Headphones, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutPage() {
  // Define team members
  const teamMembers = [
    {
      name: "Idriss BADO Olivier",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=400&width=400&text=IBO",
      bio: "Idriss founded Horeb Market with a vision to create an exceptional digital marketplace in Ivory Coast. With a passion for technology and e-commerce, he leads our team with innovation and dedication.",
    },
    {
      name: "Ange Toure Stephanie ",
      role: "CTO",
      image: "/placeholder.svg?height=400&width=400&text=AT",
      bio: "Stephanie oversees all technical aspects of Horeb Market. His expertise in e-commerce platforms ensures our website delivers a seamless shopping experience.",
    },
    {
      name: "Eunice Achie",
      role: "Head of Customer Experience",
      image: "/placeholder.svg?height=400&width=400&text=EA",
      bio: "Eunice is dedicated to ensuring every customer interaction exceeds expectations. She leads our support team with empathy and efficiency.",
    },
    {
      name: "Seth BADO ",
      role: "Product Director",
      image: "/placeholder.svg?height=400&width=400&text=SB",
      bio: "Seth curates our product selection with an eye for quality and value. His background in product development helps us bring the best items to our customers.",
    },
  ]

  // Get current year
  const currentYear = new Date().getFullYear()

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-3 border-b">
        <div className="container">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground font-medium">About Us</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920&text=About+Us')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="container relative py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Founded in {currentYear}, Horeb Market has quickly grown to become a leading digital marketplace in Ivory
              Coast. We're passionate about connecting customers with quality products and providing an exceptional
              shopping experience.
            </p>
            <Button size="lg" className="rounded-full px-8">
              Learn More About Our Mission
            </Button>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At Horeb Market, our mission is to provide customers with a curated selection of high-quality products at
              competitive prices, delivered with exceptional service. We believe shopping should be enjoyable,
              convenient, and personalized.
            </p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Quality Products</h3>
                  <p className="text-muted-foreground">
                    We carefully select each product in our catalog to ensure it meets our high standards.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Customer Satisfaction</h3>
                  <p className="text-muted-foreground">
                    We're committed to providing an exceptional shopping experience from browsing to delivery.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Sustainability</h3>
                  <p className="text-muted-foreground">
                    We're working to reduce our environmental impact through eco-friendly practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Our+Mission"
                alt="Our Mission"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1+</div>
              <p className="text-muted-foreground">Years in Business</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5K+</div>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1K+</div>
              <p className="text-muted-foreground">Products</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="container py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground">
            The passionate individuals behind Horeb Market are dedicated to bringing you the best shopping experience.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square relative">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Values and History */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <Tabs defaultValue="values" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="values">Our Values</TabsTrigger>
                <TabsTrigger value="history">Our History</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="values" className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">Customer First</h3>
                    <p className="text-muted-foreground">
                      We prioritize our customers in every decision we make, ensuring their needs and satisfaction come
                      first.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">Quality</h3>
                    <p className="text-muted-foreground">
                      We're committed to offering only the highest quality products that meet our rigorous standards.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Truck className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">Reliability</h3>
                    <p className="text-muted-foreground">
                      We deliver on our promises, ensuring timely shipping, accurate product information, and dependable
                      service.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="history" className="max-w-4xl mx-auto">
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{currentYear}</span>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-2">The Beginning</h3>
                    <p className="text-muted-foreground">
                      Horeb Market was founded by Idriss BADO Olivier with a vision to create a premier digital
                      marketplace in Ivory Coast. Starting with a small selection of curated products, we focused on
                      quality and customer service from day one.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{currentYear}</span>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-2">Platform Launch</h3>
                    <p className="text-muted-foreground">
                      We launched our e-commerce platform, offering a seamless shopping experience for customers across
                      Ivory Coast. Our initial categories included electronics, fashion, and home goods.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{currentYear}</span>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-2">Seller Marketplace</h3>
                    <p className="text-muted-foreground">
                      We expanded our platform to include a marketplace for sellers, allowing local businesses and
                      entrepreneurs to reach customers nationwide. This move significantly expanded our product
                      offerings and supported the local economy.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">Today</span>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-2">Continuing Growth</h3>
                    <p className="text-muted-foreground">
                      Today, Horeb Market continues to grow and innovate. We're committed to enhancing our technology,
                      expanding our product offerings, and providing the best possible shopping experience for our
                      customers.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact */}
      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions or feedback? We'd love to hear from you. Our team is here to help with any inquiries you
              may have.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Our Location</h3>
                  <p className="text-muted-foreground">Abidjan, Ivory Coast</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Headphones className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Customer Support</h3>
                  <p className="text-muted-foreground">support@horebmarket.com</p>
                  <p className="text-muted-foreground">+225 0758409136</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button size="lg" className="rounded-full px-8">
                Contact Us
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/10 rounded-full"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-full min-h-[300px]">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Contact+Us"
                alt="Contact Us"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

