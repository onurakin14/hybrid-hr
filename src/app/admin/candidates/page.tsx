import CandidateListPage from "@/components/candidates/CandidateListPage";
import { apiGet } from "@/lib/api";
import type { Candidate, User } from "@/types/jsonplaceholder";

export default async function Page() {

    const users = (await apiGet("/users")) as User[];


    const candidates: Candidate[] = users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.company?.name ?? "Unknown Role",
        status: "new",
        lastActivityAt: new Date().toISOString(),
    }));

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-6xl">
                <CandidateListPage candidates={candidates} />
            </div>
        </div>
    );
}
