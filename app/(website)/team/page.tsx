import { TeamMemberCard } from "@/components/team-member-card"
import { CompanyLogos } from "@/components/company-logos"
import { PastBoardsList } from "@/components/past-boards-list"
import { client } from "@/sanity/lib/client"
import { TEAM_MEMBERS_QUERY, TEAM_PAGE_QUERY, PAST_BOARDS_QUERY } from "@/sanity/lib/queries"
import type { TeamMember, PastExecutiveBoard } from "@/sanity/lib/types"

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

async function getPastBoards() {
  try {
    const boards = await client.fetch<PastExecutiveBoard[]>(PAST_BOARDS_QUERY)
    return boards
  } catch (error) {
    console.error("Error fetching past boards:", error)
    return []
  }
}

export default async function TeamPage() {
  const [members, teamPageData, pastBoards] = await Promise.all([
    getTeamMembers(),
    getTeamPageData(),
    getPastBoards(),
  ])

  return (
    <div className="flex flex-col">
      <section className="pt-8 pb-14 w-full md:pt-12">
        <div className="mx-auto max-w-4xl px-8 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-6xl">Our Leadership Team</h1>
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

      {/* Legacy / Past Boards Section - After placements */}
      {pastBoards && pastBoards.length > 0 && (
        <section className="py-16 sm:py-24 border-t border-slate-100">
          <div className="mx-auto max-w-5xl px-8 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold uppercase tracking-wide text-slate-800 sm:text-3xl">
                Past Executive Boards
              </h2>
            </div>
            <PastBoardsList boards={pastBoards} />
          </div>
        </section>
      )}
    </div>
  )
}
