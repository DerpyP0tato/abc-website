import { PortableText, type PortableTextComponents } from "@portabletext/react"
import type { PortableTextBlock } from "sanity"

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    h2: ({ children }) => <h2 className="mb-4 mt-8 font-serif text-2xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3 mt-6 font-serif text-xl font-semibold">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline hover:no-underline"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => {
      // Avoid rendering if no asset
      if (!value?.asset?._ref) return null

      const { urlFor } = require("@/sanity/lib/image") // Inline require to avoid circular dependency if any, or just import top
      // Actually better to import urlFor at top.
      return (
        <div className="my-8 relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden bg-muted">
          <img
            src={urlFor(value).url()}
            alt={value.alt || "Event Image"}
            className="w-full h-full object-contain"
          />
        </div>
      )
    },
  },
}

interface PortableTextRendererProps {
  value: PortableTextBlock[]
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return <PortableText value={value} components={components} />
}
