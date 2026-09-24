import { ChevronDown } from "lucide-react";

interface SeeMoreButtonProps {
  expanded: boolean;
  onToggle: () => void;
  totalCount: number;
  noun: string;
}

const SeeMoreButton = ({ expanded, onToggle, totalCount, noun }: SeeMoreButtonProps) => (
  <div className="mt-8 text-center">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      {expanded ? "Show less" : `See all ${totalCount} ${noun}`}
      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
    </button>
  </div>
);

export default SeeMoreButton;
