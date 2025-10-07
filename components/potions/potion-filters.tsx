import { cn } from "@/lib/utils";
import { MAGICAL_TYPES } from "@/utils/constants";
import Link from "next/link";

export default function PotionFilters() {
  return (
    <div className="flex flex-wrap gap-4">
      {MAGICAL_TYPES.map(({ id, icon, label }) => (
        <Link
          href={id === "all" ? "/" : `?type=${id}`}
          key={id}
          className={cn(
            `filter-pill flex items-center gap-2 bg-gradient-to-br to-transparent`,
            id === "fire"
              ? "from-element-fire/20"
              : id === "ice"
              ? "from-element-ice/20"
              : id === "electric"
              ? "from-element-electric/20"
              : "from-magic-purple/20"
          )}
        >
          {icon}
          {label}
        </Link>
      ))}
    </div>
  );
}
