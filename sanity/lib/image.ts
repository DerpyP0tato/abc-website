import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from "./client"

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// next/image loader that resizes on Sanity's image CDN instead of Next's optimizer.
// Pass an aspect ratio (width / height) to crop around the hotspot; otherwise the photo keeps its shape.
export function sanityImageLoader(source: SanityImageSource, aspectRatio?: number) {
  return ({ width, quality }: { width: number; quality?: number }) => {
    const image = builder.image(source).width(width).quality(quality ?? 75).auto("format")
    return (aspectRatio ? image.height(Math.round(width / aspectRatio)).fit("crop") : image.fit("max")).url()
  }
}
