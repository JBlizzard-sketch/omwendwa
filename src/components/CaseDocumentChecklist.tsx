import { Download, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import type { PracticeArea } from "@/data/practiceAreas";

interface Props {
  area: PracticeArea;
}

const buildChecklistText = (area: PracticeArea) => {
  const lines = [
    "OCHIEL MWENDWA & COMPANY ADVOCATES",
    "Document Checklist — " + area.title,
    "",
    "Bring or upload the following before your consultation. The more we have upfront, the more value we can deliver in your first meeting.",
    "",
    "DOCUMENTS REQUIRED:",
    "",
    ...area.checklist.map((item, i) => `[ ] ${i + 1}. ${item}`),
    "",
    "----------------------------------------",
    "",
    "Note: Don't worry if you can't gather everything — we can advise on what's essential and what can follow. Originals are preferred; clear scans/photos are acceptable for the first meeting.",
    "",
    "Contact:",
    "  Phone:    +254 796 759 632",
    "  Email:    info@ochielmwendwa.co.ke",
    "  Website:  ochielmwendwa.co.ke",
    "",
    "All communications are protected by attorney-client privilege.",
  ];
  return lines.join("\n");
};

const CaseDocumentChecklist = ({ area }: Props) => {
  const handleDownload = () => {
    const text = buildChecklistText(area);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Checklist-${area.shortTitle.replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast("Checklist downloaded");
  };

  const handlePrint = () => {
    const text = buildChecklistText(area);
    const w = window.open("", "_blank", "width=720,height=900");
    if (!w) return;
    w.document.write(`<!doctype html><html><head><title>Checklist — ${area.shortTitle}</title>
      <style>
        body{font-family:Georgia,serif;max-width:720px;margin:40px auto;padding:0 24px;color:#1a1a1a;line-height:1.6}
        h1{font-size:18px;letter-spacing:1px;text-transform:uppercase;border-bottom:2px solid #c9a84c;padding-bottom:8px}
        h2{font-size:14px;color:#0a1628;margin-top:24px}
        pre{font-family:Georgia,serif;white-space:pre-wrap;font-size:13px}
        @media print{body{margin:0}}
      </style></head><body>
      <h1>${area.title} — Document Checklist</h1>
      <pre>${text.replace(/[<>]/g, "")}</pre>
      <script>window.onload=()=>window.print()</script>
      </body></html>`);
    w.document.close();
  };

  return (
    <div className="mt-8 rounded-lg border border-primary/30 bg-primary/5 p-6">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="font-heading text-base font-bold text-foreground">
            Prepare Your Case — Document Checklist
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Bring these to your first consultation. We've curated them based on real {area.shortTitle.toLowerCase()} matters we've handled.
          </p>
        </div>
      </div>

      <ul className="mb-5 grid gap-1.5 sm:grid-cols-2">
        {area.checklist.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={handleDownload}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Download className="mr-2 h-4 w-4" /> Download checklist
        </Button>
        <Button size="sm" variant="outline" onClick={handlePrint}>
          Print
        </Button>
      </div>
    </div>
  );
};

export default CaseDocumentChecklist;
