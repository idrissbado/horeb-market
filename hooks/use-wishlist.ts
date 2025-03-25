import { useLocalStorage } from "./use-local-storage"

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}

export function useWishlist() {
  const [wishlist, setWishlist] = useLocalStorage<WishlistItem[]>("wishlist", [])

  // Add item to wishlist
  const addItem = (item: WishlistItem) => {
    setWishlist((prevWishlist) => {
      // Check if item already exists
      if (prevWishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
        return prevWishlist
      }

      // Add new item
      return [...prevWishlist, item]
    })
  }

  // Remove item from wishlist
  const removeItem = (id: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id))
  }

  // Check if item is in wishlist
  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item.id === id)
  }

  // Clear wishlist
  const clearWishlist = () => {
    setWishlist([])
  }

  return {
    wishlist,
    addItem,
    removeItem,
    isInWishlist,
    clearWishlist,
  }
}

