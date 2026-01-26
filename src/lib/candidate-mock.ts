type Post = { id: number; userId: number; title: string; body: string };
type Comment = { id: number; postId: number; name: string; email: string; body: string };
type Todo = { id: number; userId: number; title: string; completed: boolean };

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rand: () => number, arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function scoreFromSeed(seed: number) {
  const rand = mulberry32(seed);
  const raw = 3.6 + rand() * 1.3; // 3.6 - 4.9
  return Math.round(raw * 10) / 10;
}

export type CandidateChallenge = {
  title: string;
  status: "PENDING" | "IN REVIEW" | "APPROVED";
  submittedAtLabel: string;
  summary: string;
};

export type CandidateFeedback = {
  reviewerName: string;
  reviewerTitle: string;
  score: number;
  text: string;
  tags: string[];
};

export function buildCandidateChallenge(userId: number, posts: Post[], todos: Todo[]): CandidateChallenge {
  const rand = mulberry32(userId * 999);
  const post = posts?.[0] ?? { id: userId, userId, title: "Challenge Task", body: "" };

  const completedRate = todos?.length ? todos.filter((t) => t.completed).length / todos.length : 0.5;
  const status: CandidateChallenge["status"] =
    completedRate > 0.7 ? "APPROVED" : completedRate > 0.35 ? "IN REVIEW" : "PENDING";

  const submittedAtLabel = (() => {
    const daysAgo = clamp((userId * 3) % 30, 2, 29);
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  })();

  const titleOptions = [
    "Design System Challenge",
    "Take-home Frontend Task",
    "Component Library Exercise",
    "API Integration Challenge",
  ];

  return {
    title: pick(rand, titleOptions),
    status,
    submittedAtLabel,
    summary:
      post?.title?.length > 10
        ? `Candidate was tasked with building a UI flow based on: “${post.title}”.`
        : `Candidate was tasked with implementing a small feature set and submitting a prototype.`,
  };
}

export function buildCandidateFeedback(
  userId: number,
  comments: Comment[]
): { avgScore: number; items: CandidateFeedback[] } {
  const rand = mulberry32(userId * 1337);


  const reviewerPool = [
    { name: "Sarah Jenkins", title: "Recruiter • Screening" },
    { name: "Michael Chen", title: "Lead Engineer • Technical Interview" },
    { name: "Emily Rossi", title: "Product Manager • Portfolio Review" },
    { name: "David Kim", title: "Engineering Manager • System Design" },

    { name: "Ava Patel", title: "Senior Engineer • Pair Programming" },
    { name: "Noah Williams", title: "Staff Engineer • Architecture" },
    { name: "Sophia Martinez", title: "UX Lead • Design Review" },
    { name: "Liam Johnson", title: "QA Lead • Testing & Quality" },

    { name: "Olivia Brown", title: "People Ops • Culture Interview" },
    { name: "Ethan Davis", title: "Tech Lead • Code Review" },
    { name: "Mia Wilson", title: "Design Systems • UI Consistency" },
    { name: "James Anderson", title: "CTO • Final Round" },

    { name: "Isabella Nguyen", title: "Senior PM • Product Sense" },
    { name: "Lucas Garcia", title: "Platform Engineer • Reliability" },
    { name: "Amelia Thompson", title: "Frontend Lead • React Patterns" },
    { name: "Benjamin Lee", title: "Security Engineer • AppSec Review" },

    { name: "Charlotte Harris", title: "Data Analyst • Metrics Review" },
    { name: "Henry Clark", title: "SRE • Performance Review" },
    { name: "Evelyn Wright", title: "UX Researcher • Research Review" },
    { name: "Daniel Young", title: "Engineering Manager • Team Fit" },

    { name: "Harper King", title: "Principal Engineer • System Design" },
    { name: "Jack Scott", title: "Senior Engineer • Implementation" },
    { name: "Ella Baker", title: "Design Lead • Visual Review" },
    { name: "Logan Adams", title: "Tech Lead • Problem Solving" },

    { name: "Sofia Rivera", title: "VP Engineering • Leadership Round" },
    { name: "Aiden Perez", title: "Mobile Lead • Cross-team Review" },
    { name: "Aria Collins", title: "Accessibility • A11y Review" },
    { name: "Carter Reed", title: "QA Automation • Test Strategy" },
  ];

  const tagPool = [
    "#Communication",
    "#Collaboration",
    "#ProblemSolving",
    "#Ownership",
    "#ProductSense",
    "#Frontend",
    "#React",
    "#TypeScript",
    "#APIIntegration",
    "#Performance",
    "#Testing",
    "#UX",
    "#Accessibility",
    "#CleanCode",
  ];

  const base = (comments ?? []).slice(0, 20);

  const makeText = (fallback: string) => {
    const c = base.length ? pick(rand, base).body : fallback;
    return c.length > 220 ? c.slice(0, 217) + "..." : c;
  };

  const pickTwoDistinctReviewers = () => {
    const a = pick(rand, reviewerPool);
    let b = pick(rand, reviewerPool);
    for (let i = 0; i < 10 && b.name === a.name; i++) {
      b = pick(rand, reviewerPool);
    }
    return [a, b] as const;
  };

  const pickTags = (count: number) => {
    const tags: string[] = [];
    for (let i = 0; i < count; i++) tags.push(pick(rand, tagPool));
    return tags.filter((v, i, a) => a.indexOf(v) === i);
  };

  const [r1, r2] = pickTwoDistinctReviewers();

  const item1: CandidateFeedback = {
    reviewerName: r1.name,
    reviewerTitle: r1.title,
    score: scoreFromSeed(userId * 10 + 1),
    text: makeText("Clear communication and solid fundamentals throughout the interview."),
    tags: pickTags(2),
  };

  const item2: CandidateFeedback = {
    reviewerName: r2.name,
    reviewerTitle: r2.title,
    score: scoreFromSeed(userId * 10 + 2),
    text: makeText("Good overall approach; would like to see more tradeoff analysis and edge cases."),
    tags: pickTags(1),
  };

  const avgScore = Math.round(((item1.score + item2.score) / 2) * 10) / 10;
  return { avgScore, items: [item1, item2] };
}
