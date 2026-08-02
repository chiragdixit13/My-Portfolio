import { useQuery } from "@tanstack/react-query";
import { GitFork, Github, Star, Users } from "lucide-react";
import { profile } from "@/data/portfolio";
import { GlassCard, Reveal, Section } from "@/components/ui-kit";

type User = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
};

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
};

const user = profile.githubUsername;

export function GitHubPanel() {
  const profileQuery = useQuery({
    queryKey: ["gh-user", user],
    queryFn: async (): Promise<User> => {
      const r = await fetch(`https://api.github.com/users/${user}`);
      if (!r.ok) throw new Error("GitHub profile unavailable");
      return r.json();
    },
    retry: 1,
    staleTime: 1000 * 60 * 30,
  });

  const reposQuery = useQuery({
    queryKey: ["gh-repos", user],
    queryFn: async (): Promise<Repo[]> => {
      const r = await fetch(
        `https://api.github.com/users/${user}/repos?sort=updated&per_page=100`,
      );
      if (!r.ok) throw new Error("GitHub repositories unavailable");
      return r.json();
    },
    retry: 1,
    staleTime: 1000 * 60 * 30,
  });

  const repos = (reposQuery.data ?? [])
    .slice()
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  const languages = Object.entries(
    (reposQuery.data ?? []).reduce<Record<string, number>>((acc, r) => {
      if (r.language) acc[r.language] = (acc[r.language] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const totalLang = languages.reduce((s, [, n]) => s + n, 0) || 1;
  const u = profileQuery.data;
  const failed = profileQuery.isError && reposQuery.isError;

  const counters = [
    { label: "Public repos", value: u?.public_repos, icon: Github },
    { label: "Followers", value: u?.followers, icon: Users },
    { label: "Following", value: u?.following, icon: Users },
    {
      label: "Total stars",
      value: (reposQuery.data ?? []).reduce((s, r) => s + r.stargazers_count, 0),
      icon: Star,
    },
  ];

  return (
    <Section
      id="github"
      eyebrow="GitHub"
      title={
        <>
          Open source, <span className="text-gradient">live from the API</span>
        </>
      }
      description={`Pulled in real time from github.com/${user} — repositories, languages and activity.`}
    >
      <Reveal>
        <GlassCard className="p-7">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <img
                src={u?.avatar_url ?? profile.avatar}
                alt={`${user} avatar`}
                loading="lazy"
                width={112}
                height={112}
                className="h-14 w-14 shrink-0 rounded-2xl object-cover ring-1 ring-cyan/40"
              />
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold">{u?.name ?? profile.name}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {u?.bio ?? "AI/ML Engineer · Software Engineer"}
                </p>
              </div>
            </div>
            <a
              href={u?.html_url ?? profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs hover:border-cyan/50"
            >
              <Github className="h-3.5 w-3.5" /> @{user}
            </a>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
            {counters.map((c) => (
              <div key={c.label} className="glass rounded-2xl p-4">
                <c.icon className="mb-2 h-4 w-4 text-cyan" />
                <p className="font-display text-2xl font-semibold">
                  {c.value ?? (failed ? "—" : "···")}
                </p>
                <p className="text-xs text-muted-foreground">{c.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <p className="mb-3 text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Contribution activity
            </p>
            <img
              src={`https://ghchart.rshah.org/6ea8fe/${user}`}
              alt={`${user} GitHub contribution graph`}
              loading="lazy"
              className="w-full rounded-xl opacity-90"
            />
          </div>

          {languages.length > 0 && (
            <div className="mt-7">
              <p className="mb-3 text-xs tracking-[0.18em] text-muted-foreground uppercase">
                Top languages
              </p>
              <div className="flex h-2.5 overflow-hidden rounded-full bg-white/8">
                {languages.map(([lang, n], i) => (
                  <span
                    key={lang}
                    title={lang}
                    style={{
                      width: `${(n / totalLang) * 100}%`,
                      opacity: 1 - i * 0.12,
                    }}
                    className="h-full bg-[image:var(--gradient-brand)]"
                  />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {languages.map(([lang, n]) => (
                  <span
                    key={lang}
                    className="rounded-full border border-border bg-white/5 px-3 py-1 text-[0.7rem] text-muted-foreground"
                  >
                    {lang} · {Math.round((n / totalLang) * 100)}%
                  </span>
                ))}
              </div>
            </div>
          )}
        </GlassCard>
      </Reveal>

      {repos.length > 0 && (
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.05}>
              <a
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                className="glass block h-full rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40"
              >
                <p className="truncate font-medium">{r.name}</p>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {r.description ?? "No description provided."}
                </p>
                <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                  {r.language && (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-cyan" />
                      {r.language}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3" /> {r.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="h-3 w-3" /> {r.forks_count}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      )}

      {failed && (
        <p className="mt-6 text-sm text-muted-foreground">
          Live GitHub data couldn't be loaded right now. Update{" "}
          <code className="text-cyan">profile.githubUsername</code> in{" "}
          <code className="text-cyan">src/data/portfolio.ts</code> to point at your account.
        </p>
      )}
    </Section>
  );
}
