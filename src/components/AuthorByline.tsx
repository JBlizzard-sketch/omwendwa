import rachelImg from "@/assets/rachel-mwendwa.jpg";

type Author = { name: string; role: string; img?: string; credential: string };

const partnerDesk: Author = {
  name: "The Litigation, Commercial & Tax Desk",
  role: "Partner — Litigation, Commercial, Tax & Governance",
  credential: "Advocate of the High Court · Tax Appeals Tribunal · Commercial Division litigator",
};

const authors: Record<string, Author> = {
  Tax: partnerDesk,
  Commercial: partnerDesk,
  default: {
    name: "Rachel Mwendwa",
    role: "Managing Partner",
    img: rachelImg,
    credential: "LSK · ICC YAF · International Lawyers Project · environmental, land & human rights law",
  },
};

const pick = (category: string) => {
  if (category.toLowerCase().includes("tax")) return authors.Tax;
  if (category.toLowerCase().includes("commercial") || category.toLowerCase().includes("business"))
    return authors.Commercial;
  return authors.default;
};

const AuthorByline = ({ category }: { category: string }) => {
  const a = pick(category);
  return (
    <div className="mt-6 flex items-center gap-4 rounded-lg border border-border bg-card/60 p-4">
      {a.img ? (
        <img
          src={a.img}
          alt={a.name}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/30"
          loading="lazy"
        />
      ) : (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
          <span className="font-heading text-sm font-bold text-primary">OM</span>
        </div>
      )}
      <div className="min-w-0">
        <div className="text-sm font-semibold text-foreground">{a.name}</div>
        <div className="text-xs text-primary">{a.role}</div>
        <div className="mt-0.5 truncate text-[11px] text-muted-foreground">{a.credential}</div>
      </div>
    </div>
  );
};

export default AuthorByline;
