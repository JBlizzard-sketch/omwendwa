import { Link } from "react-router-dom";
import { Phone, MessageCircle, Calendar } from "lucide-react";

const MobileCTABar = () => (
  <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-md lg:hidden">
    <div className="grid grid-cols-3 divide-x divide-border">
      <a
        href="tel:+254796759632"
        className="flex flex-col items-center gap-1 py-3 text-muted-foreground transition-colors hover:text-primary active:text-primary"
      >
        <Phone className="h-4 w-4" />
        <span className="text-[10px] font-semibold">Call</span>
      </a>
      <a
        href="https://wa.me/254796759632"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 py-3 text-muted-foreground transition-colors hover:text-kenya-green active:text-kenya-green"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="text-[10px] font-semibold">WhatsApp</span>
      </a>
      <Link
        to="/contact"
        className="flex flex-col items-center gap-1 py-3 text-primary"
      >
        <Calendar className="h-4 w-4" />
        <span className="text-[10px] font-semibold">Consult</span>
      </Link>
    </div>
  </div>
);

export default MobileCTABar;
