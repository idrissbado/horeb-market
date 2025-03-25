"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, X, Send, Minimize2, Maximize2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! Welcome to Horeb Market. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setMessage("")

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "I'd be happy to help you with that!",
        "Let me check that for you.",
        "Thank you for your question. Our team is working on it.",
        "You can find more information about that in our FAQ section.",
        "Would you like me to connect you with a customer service representative?",
        "We have great deals on that item right now!",
        "Is there anything else I can help you with today?",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className={`w-80 md:w-96 shadow-xl transition-all duration-300 ${isMinimized ? "h-14" : "h-[500px]"}`}>
          <CardHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=HM" alt="Horeb Market" />
                <AvatarFallback>HM</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">Horeb Assistant</div>
                <div className="flex items-center">
                  <Badge variant="secondary" className="h-5 rounded-full text-xs px-1 bg-green-100 text-green-800">
                    Online
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMinimize}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleChat}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-4 overflow-y-auto h-[380px] space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {msg.sender === "bot" && (
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24&text=HM" alt="Horeb Market" />
                            <AvatarFallback>HM</AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        {msg.sender === "user" && (
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24&text=You" alt="You" />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                  }}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" className="h-8 w-8 rounded-full">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      ) : (
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full shadow-lg flex items-center justify-center bg-primary hover:bg-primary/90"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}

