export type Category = {
  key: string;
  label: string;
  folder: string | null; // null means "all"
};

export const CATEGORIES: Category[] = [
  { key: "iterate-to-greatness", label: "Iterate to greatness", folder: "iterate-to-greatness" },
  { key: "listen-to-users", label: "Listen to users", folder: "listen-to-users" },
  { key: "one-team-one-dream", label: "One team one dream", folder: "one-team-one-dream" },
  { key: "love-the-details", label: "Love the details", folder: "love-the-details" },
  { key: "make-it-happen", label: "Make it happen", folder: "make-it-happen" },
  { key: "this-is-how-we-grow", label: "This is how we grow", folder: "this-is-how-we-grow" },
  { key: "turn-curiosity-into-breakthroughs", label: "Turn curiosity into breakthroughs", folder: "turn-curiosity-into-breakthroughs" },
  { key: "a-world-that-finally-works", label: "A world that finally works the way people want", folder: "a-world-that-finally-works" },
  { key: "listen-labs-generic", label: "Listen Labs generic", folder: "listen-labs-generic" },
  { key: "all", label: "Random (all)", folder: null },
];
