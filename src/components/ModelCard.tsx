import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

export interface ModelCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  status: "available" | "coming-soon" | "beta";
  language: string;
  category: string;
  href: string;
}

const statusConfig = {
  available: { label: "Disponible", className: "bg-citadel-green/20 text-citadel-green border-citadel-green/30" },
  beta: { label: "Beta", className: "bg-citadel-gold/20 text-citadel-gold border-citadel-gold/30" },
  "coming-soon": { label: "Bientôt", className: "bg-citadel-red/20 text-citadel-red border-citadel-red/30" },
};

export function ModelCard({ title, description, icon: Icon, status, language, category, href }: ModelCardProps) {
  const statusInfo = statusConfig[status];
  const isDisabled = status === "coming-soon";

  return (
    <div className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-citadel-green/40 hover:bg-citadel-card-hover hover:shadow-[0_0_30px_-10px_oklch(0.55_0.2_145/0.15)]">
      {/* Hexagonal accent */}
      <div className="absolute -top-px -right-px h-12 w-12 overflow-hidden rounded-tr-xl">
        <div className="absolute top-0 right-0 h-16 w-16 translate-x-4 -translate-y-4 rotate-45 bg-gradient-to-br from-citadel-green/20 to-transparent" />
      </div>

      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-citadel-green/10 text-citadel-green transition-colors group-hover:bg-citadel-green/20">
          <Icon className="h-6 w-6" />
        </div>
        <Badge variant="outline" className={statusInfo.className}>
          {statusInfo.label}
        </Badge>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>

      <div className="mb-5 flex flex-wrap gap-2">
        <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
          {language}
        </span>
        <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
          {category}
        </span>
      </div>

      {isDisabled ? (
        <Button variant="outline" className="w-full cursor-not-allowed opacity-50" disabled>
          Bientôt disponible
        </Button>
      ) : (
        <Link to={href}>
          <Button variant="outline" className="w-full border-citadel-green/30 text-citadel-green hover:bg-citadel-green/10 hover:text-citadel-green">
            Essayer le modèle →
          </Button>
        </Link>
      )}
    </div>
  );
}
