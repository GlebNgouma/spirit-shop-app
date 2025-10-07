import PotionInfo from "@/components/potions/potion-info";
import { fetchRandomTrendingPotion } from "@/lib/github";
import { ORIGIN_URL } from "@/lib/utils";
import { notFound } from "next/navigation";

export const generateMetadata = async () => {
  const potion = await fetchRandomTrendingPotion();
  return {
    title: potion?.name,
    description: potion?.description,
    alternates: { canonical: `${ORIGIN_URL}/mystery-potion` },
  };
};

export default async function MysteryPotion() {
  const potion = await fetchRandomTrendingPotion();
  if (!potion) {
    notFound();
  }
  return (
    <>
      <PotionInfo potion={potion} />;
    </>
  );
}
