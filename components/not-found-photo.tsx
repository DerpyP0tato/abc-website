"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export type NotFoundPhotoOption = {
  src: string
  alt: string
  unoptimized: boolean
}

// Picks one of the photos at random in the browser. Doing it here (not on the server) means
// every visit gets a fresh pick even when the page itself is cached.
export function NotFoundPhoto({ photos }: { photos: NotFoundPhotoOption[] }) {
  const [photo, setPhoto] = useState<NotFoundPhotoOption | null>(photos.length === 1 ? photos[0] : null)

  useEffect(() => {
    if (photos.length > 1) setPhoto(photos[Math.floor(Math.random() * photos.length)])
  }, [photos])

  // The 3:4 frame holds its size while the random pick is made and the photo loads
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
      {photo && (
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          unoptimized={photo.unoptimized}
          fill
          sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
          priority
          className="object-cover animate-in fade-in duration-500"
        />
      )}
    </div>
  )
}
