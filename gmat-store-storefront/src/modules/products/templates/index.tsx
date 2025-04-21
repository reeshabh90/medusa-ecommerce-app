import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"
import ProductImageGallery from "@modules/products/templates/product-image-gallery/product-image-gallery"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id || !product.images?.length) {
    return notFound()
  }

  return (
    <div className="content-container py-6 relative">
      <div className="flex flex-col lg:flex-row lg:items-start">
        <div className="w-full lg:w-1/2 pr-0 lg:pr-8">
          <div className="block w-full relative">
            <ProductImageGallery product={product} />
          </div>
        </div>
        <div className="w-full lg:w-1/2 py-8 lg:py-0 flex flex-col gap-y-6">
          <div className="flex flex-col sticky top-24 lg:top-48 py-0 max-w-[400px] gap-y-6">
            <ProductInfo product={product} />
            <ProductTabs product={product} />
            <div className="mt-auto">
              <ProductOnboardingCta />
              <Suspense
                fallback={
                  <ProductActions disabled={true} product={product} region={region} />
                }
              >
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <div className="content-container my-16 sm:my-32">
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductTemplate