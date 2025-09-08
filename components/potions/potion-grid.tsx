import { PotionType } from "@/types/github";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { getMagicalTypeIcon } from "@/utils";
import { PackageIcon, StarIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import PotionCard from "./potion-card";

interface PotionGridProps {
  potions: PotionType[];
}

export default function PotionGrid({ potions }: PotionGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {potions.map((potion: PotionType, index: number) => (
        <PotionCard {...potion} key={`${potion.name}-${index}`} />
      ))}
    </div>
  );
}
