import { customAlphabet } from "nanoid";
const nanoid = customAlphabet(
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
);

const prefixes = {
  user: "us",
  jobs: "job",
  content: "c",
  waitlist: "waitlist",
  projects: "p",
  services: "sr",
  database: "db",
} as const;

export function createId(prefix: keyof typeof prefixes): string {
  return [prefixes[prefix], nanoid(16)].join("_");
}
