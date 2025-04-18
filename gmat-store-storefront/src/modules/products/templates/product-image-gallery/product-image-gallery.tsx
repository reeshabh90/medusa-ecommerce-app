"use client"

import React, { useState } from "react"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

type ProductImageGalleryProps = {
  product: HttpTypes.StoreProduct
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.images?.[0]?.url || "")
  const thumbnails = product.images?.slice(1) || []

  return (
    <div>
      
      <div className="relative w-full aspect-square rounded-md overflow-hidden">
        {mainImage && (
          <Image
            src={mainImage}
            alt={product.title}
            layout="fill"
            objectFit="contain"
          />
        )}
      </div>

      
      {thumbnails.length > 0 && (
        <div className="mt-4 flex justify-center items-center space-x-2 overflow-auto">
          {product.images && [product.images[0], ...thumbnails].map((img) => (
            <div
              key={img.url}
              className="relative w-20 h-20 rounded-md overflow-hidden cursor-pointer opacity-70 hover:opacity-100"
              onMouseEnter={() => setMainImage(img.url)}
            >
              <Image
                src={img.url}
                alt={product.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductImageGallery