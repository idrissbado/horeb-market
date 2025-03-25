/**
 * This script optimizes images in the public/images directory
 * To run: npx ts-node scripts/optimize-images.ts
 *
 * Prerequisites:
 * npm install -g sharp ts-node typescript
 */

import * as fs from "fs"
import * as path from "path"
import sharp from "sharp"

const IMAGE_DIRS = [
  "public/images/products",
  "public/images/banners",
  "public/images/categories",
  "public/images/brands",
  "public/images/users",
]

const SIZES = {
  thumbnail: { width: 200, height: 200 },
  small: { width: 400, height: 400 },
  medium: { width: 800, height: 800 },
  large: { width: 1200, height: 1200 },
}

async function optimizeImage(filePath: string): Promise<void> {
  try {
    const ext = path.extname(filePath).toLowerCase()
    const baseName = path.basename(filePath, ext)
    const dirName = path.dirname(filePath)

    if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      console.log(`Skipping non-image file: ${filePath}`)
      return
    }

    // Create optimized version
    const optimizedPath = path.join(dirName, `${baseName}${ext}`)
    await sharp(filePath)
      .jpeg({ quality: 80, progressive: true })
      .toFile(optimizedPath + ".tmp")

    fs.renameSync(optimizedPath + ".tmp", optimizedPath)
    console.log(`Optimized: ${optimizedPath}`)

    // Create different sizes
    for (const [size, dimensions] of Object.entries(SIZES)) {
      const resizedPath = path.join(dirName, `${baseName}-${size}${ext}`)
      await sharp(filePath)
        .resize(dimensions.width, dimensions.height, { fit: "inside" })
        .jpeg({ quality: 80, progressive: true })
        .toFile(resizedPath)
      console.log(`Created ${size}: ${resizedPath}`)
    }
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error)
  }
}

async function processDirectory(directory: string): Promise<void> {
  if (!fs.existsSync(directory)) {
    console.log(`Creating directory: ${directory}`)
    fs.mkdirSync(directory, { recursive: true })
    return
  }

  const files = fs.readdirSync(directory)

  for (const file of files) {
    const filePath = path.join(directory, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      await processDirectory(filePath)
    } else if (stat.isFile()) {
      await optimizeImage(filePath)
    }
  }
}

async function main(): Promise<void> {
  for (const dir of IMAGE_DIRS) {
    await processDirectory(dir)
  }
  console.log("Image optimization complete!")
}

main().catch(console.error)

