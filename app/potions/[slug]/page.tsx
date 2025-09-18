import PotionInfo from "@/components/potions/potion-info";
import { fetchPotion } from "@/lib/github";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const popularRepos = [
    "facebook/react",
    "tailwindlabs/tailwindcss",
    "nodej/node",
    "vercel/next.js",
    "typescript/TypeScript",
  ];

  return popularRepos.map((repo) => ({
    slug: repo.replace("/", "_"),
  }));
}

export default async function PotionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [owner, repo] = slug.split("_");
  if (!owner || !repo) {
    notFound();
  }
  const potion = await fetchPotion(owner, repo);
  return <PotionInfo potion={potion} />;
}
