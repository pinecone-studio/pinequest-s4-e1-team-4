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
    <section className="rounded-md border border-zinc-200 p-4 dark:border-[#173757] dark:bg-[#0b1728]">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-white">
        <Building2 className="h-4 w-4 text-black dark:text-[#7dd3fc]" />
        Top Companies
      </h2>
      <ul className="space-y-3">
        {companies.map((company) => (
          <li
            key={company.id}
            className="flex flex-col gap-2 border-b pb-3 last:border-0 dark:border-[#173757]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-zinc-900 dark:text-[#dcecff]">
                {company.name}
              </span>
              <span className="whitespace-nowrap rounded bg-yellow-100 px-2 py-1 text-xs font-semibold text-black">
                {company.score}%
              </span>
            </div>
            {company.matchedSkills.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {company.matchedSkills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-[#173757] dark:text-[#dcecff]"
                  >
                    {skill}
                  </span>
                ))}
                {company.matchedSkills.length > 3 && (
                  <span className="px-2 py-0.5 text-xs text-zinc-500 dark:text-[#9db7d3]">
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
