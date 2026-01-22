import { TeamMemberCard } from "@/components/team-member-card"
import { CompanyLogos } from "@/components/company-logos"
import { client } from "@/sanity/lib/client"
import { TEAM_MEMBERS_QUERY, TEAM_PAGE_QUERY } from "@/sanity/lib/queries"
import type { TeamMember } from "@/sanity/lib/types"

export const metadata = {
  title: "Team | Asian Business Collective",
  description: "Meet the leadership team of the Asian Business Collective at Binghamton University.",
}

export const revalidate = 60

async function getTeamMembers() {
  try {
    const members = await client.fetch<TeamMember[]>(TEAM_MEMBERS_QUERY)
    return members
  } catch (error) {
    console.error("Error fetching team members:", error)
    return []
  }
}

async function getTeamPageData() {
  try {
    const data = await client.fetch(TEAM_PAGE_QUERY)
    return data
  } catch (error) {
    console.error("Error fetching team page data:", error)
    return null
  }
}

export default async function TeamPage() {
  const [members, teamPageData] = await Promise.all([
    getTeamMembers(),
    getTeamPageData(),
  ])

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-muted/50 to-background py-10 sm:py-14 w-full">
        <div className="mx-auto max-w-4xl px-8 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">Our Leadership Team</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Meet the dedicated students leading the Asian Business Collective and driving our mission forward.
          </p>
        </div>
      </section>

      <section className="py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
          {members.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {members.map((member) => (
                <TeamMemberCard key={member._id} member={member} />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground">Team members will be added soon. Check back later!</p>
            </div>
          )}
        </div>
      </section>

      {teamPageData && (
        <CompanyLogos
          title={teamPageData.placementTitle}
          description={teamPageData.placementDescription}
          companies={teamPageData.companies}
        />
      )}
    </div>
  )
}
