import { PotionType } from "@/types/github";
import { getMagicalTypeIcon } from "@/utils";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";
import { PotionHeader, PotionStats } from "./poion-common";

export default function PotionCard({
  full_name,
  name,
  description,
  topics,
  owner: { login, avatar_url },
  magicalType,
  potionEffect,
  stargazers_count,
  forks_count,
}: PotionType) {
  return (
    <>
      <Link href={`potions/${full_name.replaceAll("/", "_")}`}>
        <Card
          className={`potion-card relative group h-full cursor-pointer transition-all duration-300 potion-${magicalType}`}
          key={`${full_name}-${name}`}
        >
          <div className="absolute right-4 top-4 z-10">
            {getMagicalTypeIcon(magicalType)}
          </div>
          <CardHeader className="p-3 pb-0">
            <PotionHeader name={name} owner={{ login, avatar_url }} />
          </CardHeader>
          <CardContent className="p-3 pt-3">
            <p className="text-sm text-foreground/70 mt-3 mb-4 line-clamp-3 has-[3.75rem] overflow-hidden text-ellipsis">
              {description}
            </p>
            <div className="mb-2">
              <p className="text-sm flex items-center gap-1.5 mb-1 text-magic-light-purple">
                <span>✨</span>Effect: {potionEffect}
              </p>
              <PotionStats forks={forks_count} stars={stargazers_count} />
            </div>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic, index) => (
                <Badge
                  key={`${index}`}
                  className="text-xs px-2 py-1 bg-magic-purple/15 text-white/80 hover:bg-magic-purple/25"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  );
}
