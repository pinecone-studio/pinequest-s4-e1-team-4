import { Building2 } from "lucide-react";
import type { CompanyFit } from "@/lib/cv/types";

interface CompanyRecommendationsProps {
  companies: CompanyFit[];
}

export function CompanyRecommendations({
  companies,
}: CompanyRecommendationsProps) {
  if (companies.length === 0) return null;

  return (
    <section className="rounded-md border border-zinc-200 p-4">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <Building2 className="h-4 w-4 text-black" />
        Top Companies
      </h2>
      <ul className="space-y-3">
        {companies.map((company) => (
          <li
            key={company.id}
            className="flex flex-col gap-2 pb-3 border-b last:border-0"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-sm text-zinc-900">
                {company.name}
              </span>
              <span className="text-xs font-semibold text-black bg-yellow-100 px-2 py-1 rounded whitespace-nowrap">
                {company.score}%
              </span>
            </div>
            {company.matchedSkills.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {company.matchedSkills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded"
                  >
                    {skill}
                  </span>
                ))}
                {company.matchedSkills.length > 3 && (
                  <span className="text-xs text-zinc-500 px-2 py-0.5">
                    +{company.matchedSkills.length - 3} more
                  </span>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
