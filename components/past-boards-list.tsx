import { PastExecutiveBoard } from "@/sanity/lib/types"
import Link from "next/link"

interface PastBoardsListProps {
    boards: PastExecutiveBoard[]
}

export function PastBoardsList({ boards }: PastBoardsListProps) {
    if (!boards || boards.length === 0) return null

    return (
        <div className="space-y-6">
            {boards.map((board) => (
                <p key={board._id} className="text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900">{board.year}:</span>{" "}
                    {board.members?.map((member, index) => (
                        <span key={index}>
                            {member.linkedinUrl ? (
                                <Link
                                    href={member.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                >
                                    {member.name}
                                </Link>
                            ) : (
                                <span>{member.name}</span>
                            )}
                            {index < board.members.length - 1 && ", "}
                        </span>
                    ))}
                </p>
            ))}
        </div>
    )
}
