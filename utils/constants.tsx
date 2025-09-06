import { FlameIcon, SnowflakeIcon, SparklesIcon, ZapIcon } from "lucide-react";
import { ReactNode } from "react";

type MagicalType = {
  id: string;
  value: string;
  label: string;
  icon: ReactNode;
};

export const MAGICAL_TYPES: MagicalType[] = [
  {
    id: "fire",
    value: "🔥",
    label: "Fire-type",
    icon: <FlameIcon className="text-element-fire" />,
  },
  {
    id: "ice",
    value: "🧊",
    label: "Ice-type",
    icon: <SnowflakeIcon className="text-element-ice" />,
  },
  {
    id: "electric",
    value: "🦩",
    label: "Electric-type",
    icon: <ZapIcon className="text-element-electric" />,
  },
  {
    id: "all",
    value: "✨",
    label: "All Type",
    icon: <SparklesIcon className="text-magic-purple" />,
  },
];
