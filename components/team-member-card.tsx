import { Card, CardContent } from "@/components/ui/card"
import type { TeamMember } from "@/sanity/lib/types"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import Link from "next/link"

interface TeamMemberCardProps {
  member: TeamMember
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const imageUrl = urlFor(member.headshot).width(300).height(300).url()

  return (
    <Link href={`/team/${member.slug?.current || member._id}`} className="block">
      <Card className="group border-0 bg-white py-0 gap-0 shadow-lg transition-all hover:shadow-xl">
        <div className="p-4 pb-0">
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={member.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
        <CardContent className="p-4 pt-4">
          <h3 className="font-semibold">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.role}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
