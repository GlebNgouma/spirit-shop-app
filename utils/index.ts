import { MAGICAL_TYPES, MagicalType } from "./constants";

export const getMagicalTypeIcon = (magicalType: MagicalType) => {
  return MAGICAL_TYPES.filter((type) => type.id == magicalType)[0]?.icon;
};
