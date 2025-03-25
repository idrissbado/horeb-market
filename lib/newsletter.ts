// This is a simplified newsletter service for demonstration
// In a real application, you would use a proper email service like SendGrid, Mailchimp, etc.

interface Subscriber {
    email: string
    subscriptionDate: string
    confirmed: boolean
  }
  
  // Mock database of subscribers
  const subscribers: Subscriber[] = []
  
  // Subscribe to newsletter
  export const subscribeToNewsletter = async (email: string): Promise<{ success: boolean; message?: string }> => {
    try {
      // Check if email is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return { success: false, message: "Please enter a valid email address" }
      }
  
      // Check if already subscribed
      const existingSubscriber = subscribers.find((subscriber) => subscriber.email === email)
      if (existingSubscriber) {
        return { success: false, message: "This email is already subscribed to our newsletter" }
      }
  
      // Add to subscribers list
      const newSubscriber: Subscriber = {
        email,
        subscriptionDate: new Date().toISOString(),
        confirmed: false,
      }
      subscribers.push(newSubscriber)
  
      // In a real application, you would send a confirmation email here
      // For demonstration, we'll simulate sending an email
      await sendConfirmationEmail(email)
  
      console.log(`New subscriber added: ${email}`)
      return { success: true }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error)
      return { success: false, message: "An error occurred while subscribing. Please try again." }
    }
  }
  
  // Simulate sending a confirmation email
  const sendConfirmationEmail = async (email: string): Promise<void> => {
    // In a real application, you would use an email service like SendGrid, Mailchimp, etc.
    console.log(`Sending confirmation email to ${email}`)
  
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    console.log(`Confirmation email sent to ${email}`)
  
    // Update subscriber status to confirmed
    const subscriberIndex = subscribers.findIndex((subscriber) => subscriber.email === email)
    if (subscriberIndex !== -1) {
      subscribers[subscriberIndex].confirmed = true
    }
  }
  
  // Get all subscribers (for admin purposes)
  export const getAllSubscribers = (): Subscriber[] => {
    return subscribers
  }
  
  // Unsubscribe from newsletter
  export const unsubscribeFromNewsletter = (email: string): { success: boolean; message?: string } => {
    const subscriberIndex = subscribers.findIndex((subscriber) => subscriber.email === email)
    if (subscriberIndex === -1) {
      return { success: false, message: "Email not found in our subscribers list" }
    }
  
    subscribers.splice(subscriberIndex, 1)
    return { success: true, message: "You have been successfully unsubscribed" }
  }
  
  