import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { urlFor } from "@/sanity/lib/image"

interface FeatureCardProps {
    title: string
    description: string
    icon?: any
    isSanityIcon?: boolean
}

export function FeatureCard({ title, description, icon, isSanityIcon }: FeatureCardProps) {
    return (
        <Card className="text-center">
            <CardHeader>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft border border-brand-muted shadow-sm transition-transform group-hover:scale-110">
                    {icon && (
                        isSanityIcon ? (
                            <img
                                src={urlFor(icon).url()}
                                alt=""
                                className="h-7 w-7 text-brand dark:invert"
                            />
                        ) : (
                            <div className="h-7 w-7 text-brand">
                                {/* Lucide icons are usually passed as components, so we render them: */}
                                {/* However, the props pattern might vary. Let's assume passed as element or component */}
                                {icon}
                            </div>
                        )
                    )}
                </div>
                <CardTitle className="mt-4 font-serif text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </CardContent>
        </Card>
    )
}
