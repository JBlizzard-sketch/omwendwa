import { practiceAreas, type PracticeArea } from "./practiceAreas";

export interface PracticeGroup {
  label: string;
  blurb: string;
  ids: string[];
}

export const practiceGroups: PracticeGroup[] = [
  {
    label: "Corporate & Commercial",
    blurb: "Growth, compliance and the deals behind it.",
    ids: ["commercial", "tax", "governance", "debt-recovery", "employment"],
  },
  {
    label: "Private Client",
    blurb: "Family, legacy and property, handled with care.",
    ids: ["family", "succession", "private-wealth", "conveyancing"],
  },
  {
    label: "Public Interest & Policy",
    blurb: "Rights, land and the laws that shape them.",
    ids: ["human-rights", "environment-land", "legislative-drafting", "policy-advisory"],
  },
  {
    label: "Advisory & Innovation",
    blurb: "Resolution, research and the future of practice.",
    ids: ["adr", "research-consultancy", "legal-training", "legal-tech"],
  },
];

const byId = new Map(practiceAreas.map((area) => [area.id, area]));

export const groupedPracticeAreas: { group: PracticeGroup; areas: PracticeArea[] }[] =
  practiceGroups.map((group) => ({
    group,
    areas: group.ids.map((id) => byId.get(id)).filter((a): a is PracticeArea => Boolean(a)),
  }));

const grouped = new Set(practiceGroups.flatMap((g) => g.ids));
export const ungroupedPracticeAreas = practiceAreas.filter((a) => !grouped.has(a.id));

export const categoryForArea = (id: string): string =>
  practiceGroups.find((g) => g.ids.includes(id))?.label ?? "Advisory & Innovation";
