import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
}

/**
 * Purpose: This function is used for Static Site Generation (SSG) with dynamic routes.
   When it runs: During the build process, Next.js calls this function to determine all possible values for the dynamic route parameters ([countryCode] and [handle] in this case).
   Why it's implemented:
   It allows Next.js to pre-render pages for all the specified parameter combinations (e.g., /us/products/product-1, /uk/products/product-2).
   This improves performance by serving pre-rendered HTML for these routes.
 * @returns 
 */
export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    if (!countryCodes) {
      return []
    }

    const products = await listProducts({
      countryCode: "US",
      queryParams: { fields: "handle" },
    }).then(({ response }) => response.products)

    return countryCodes
      .map((countryCode) =>
        products.map((product) => ({
          countryCode,
          handle: product.handle,
        }))
      )
      .flat()
      .filter((param) => param.handle)
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}

/**
 * 
 * @param props - Props
 * @returns 
 * Purpose: This function is used to dynamically generate metadata (e.g., <title>, <meta> tags) for the page.
    When it runs: It is executed on the server before rendering the page to provide metadata for the <head> section.
    Why it's implemented:
    It allows the page to have dynamic metadata based on the route parameters or fetched data (e.g., product title, description, and thumbnail).
    This is useful for SEO and social sharing.
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products[0])

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} | Lyfas Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Lyfas Store`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  if (!pricedProduct) {
    notFound()
  }

  return (
    <ProductTemplate
      product={pricedProduct}
      region={region}
      countryCode={params.countryCode}
    />
  )
}
