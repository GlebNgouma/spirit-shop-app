import { GithubRepo } from "@/types/github";
import { MAGICAL_TYPES, MagicalType } from "@/utils/constants";

const GITHUB_API_URL = "https://api.github.com";
const POTION_EFFECTS = [
  "Grants the power of rapid development",
  "Enhances code clarity and maintanability",
  "Boosts performance and efficiency",
  "Provides magical debugging abilities",
  "Unlocks the secrets of clean architecture",
];

const transformRepoToPortion = (repo: GithubRepo, index: number) => {
  return {
    ...repo,
    topics: repo.topics.slice(0, 3),
    potionEffect: POTION_EFFECTS[index % POTION_EFFECTS.length],
    magicalType: MAGICAL_TYPES[index % MAGICAL_TYPES.length].id as MagicalType,
  };
};

export async function fetchPotions() {
  const url = `${GITHUB_API_URL}/search/repositories?q=topic:javascript+stars:>5000&sort=stars&order=desc`;
  const githubToken = process.env.GITHUB_TOKEN;

  const headers = {
    Accept: "application/vnd.github+json",
    ...(githubToken && {
      Authorization: `Bearer ${githubToken}`,
    }),
  };
  try {
    const response = await fetch(url, { headers, cache: "force-cache" });
    if (!response.ok) {
      throw new Error(`Echec de recuperation des portions`);
    }
    const data = await response.json();

    return data.items.map((repo: GithubRepo, index: number) =>
      transformRepoToPortion(repo, index)
    );
  } catch (error) {
    console.error(
      "Echec de recuperation des portions",
      (error as Error).message
    );
    return [];
  }
}

//---------------------------
//Obtenir une potion
//---------------------------
export async function fetchPotion(owner: string, repo: string) {
  const url = `${GITHUB_API_URL}/repos/${owner}/${repo}`;
  const githubToken = process.env.GITHUB_TOKEN;

  const headers = {
    Accept: "application/vnd.github+json",
    ...(githubToken && {
      Authorization: `Bearer ${githubToken}`,
    }),
  };
  try {
    const response = await fetch(url, {
      headers,
      cache: "force-cache",
      next: { revalidate: 3600 }, //chaque 1h
    });
    if (!response.ok) {
      throw new Error(`Echec de recuperation des portions`);
    }
    const data = await response.json();
    return transformRepoToPortion(data, 0);
  } catch (error) {
    console.error(
      "Echec de recuperation des portions",
      (error as Error).message
    );
    return null;
  }
}

export async function fetchRandomTrendingPotion() {
  const url = `${GITHUB_API_URL}/search/repositories?q=topic:javascript+stars:>7000&sort=stars&order=desc`;
  const githubToken = process.env.GITHUB_TOKEN;

  const headers = {
    Accept: "application/vnd.github+json",
    ...(githubToken && {
      Authorization: `Bearer ${githubToken}`,
    }),
  };
  try {
    const response = await fetch(url, { headers, cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Echec de recuperation des portions`);
    }
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.items.length);
    return transformRepoToPortion(data.items[randomIndex], randomIndex);
  } catch (error) {
    if (
      error instanceof Error &&
      "digest" in error &&
      error.digest === "DYNAMIC_SERVER_USAGE"
    ) {
      throw error;
    }
    console.error(
      "Echec de recuperation des portions",
      (error as Error).message
    );
    return null;
  }
}
