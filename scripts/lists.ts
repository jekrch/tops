/**
 * Manage yearly lists in src/data/lists/.
 *
 *   bun run list:new <year> [--default]   scaffold an empty draft list for <year>,
 *                                         copying config from the newest existing year
 *   bun run list:default <year>           make <year> the list shown by default
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import type { YearList } from "../src/types/YearList";

const root = resolve(import.meta.dirname, "..");
const listsDir = join(root, "src/data/lists");
const registryFile = join(root, "src/data/lists.ts");

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function existingYears(): string[] {
  return readdirSync(listsDir)
    .filter((f) => /^\d{4}\.ts$/.test(f))
    .map((f) => f.slice(0, -3))
    .sort((a, b) => Number(a) - Number(b));
}

function parseYear(arg: string | undefined): string {
  if (!arg || !/^\d{4}$/.test(arg)) fail("expected a four-digit year, e.g. 2027");
  return arg;
}

function setDefault(year: string) {
  if (!existingYears().includes(year)) fail(`no list for ${year} in src/data/lists/`);
  const source = readFileSync(registryFile, "utf8");
  const pattern = /export const DEFAULT_YEAR = "[^"]*";/;
  if (!pattern.test(source)) fail(`could not find DEFAULT_YEAR in ${registryFile}`);
  writeFileSync(registryFile, source.replace(pattern, `export const DEFAULT_YEAR = "${year}";`));
  console.log(`default list is now ${year}`);
}

/** JSON → TS object literal with bare identifier keys, to match the hand-written files. */
function toObjectLiteral(value: unknown): string {
  return JSON.stringify(value, null, 2).replace(/^(\s*)"([A-Za-z_$][\w$]*)":/gm, "$1$2:");
}

async function createList(year: string, makeDefault: boolean) {
  const target = join(listsDir, `${year}.ts`);
  if (existsSync(target)) fail(`src/data/lists/${year}.ts already exists`);

  const years = existingYears();
  const template = years.at(-1);
  if (!template) fail("no existing list to copy config from");

  const { default: previous } = (await import(join(listsDir, `${template}.ts`))) as {
    default: YearList;
  };
  const config = structuredClone(previous.config);
  config.meta.year = Number(year);
  config.content.introText = "";

  const file = `import type { ListConfig } from "../../types/ListConfig";
import type { RankItem } from "../../types/RankTypes";
import type { YearList } from "../../types/YearList";

/**
 * Configuration for the ${year} list (copied from ${template})
 */
const config: ListConfig = ${toObjectLiteral(config)};

/**
 * The ranked items for ${year}
 */
const items: RankItem[] = [];

// Drafts are only viewable locally; remove \`draft: true\` to publish.
export default { config, items, draft: true } satisfies YearList;
`;

  writeFileSync(target, file);
  console.log(`created draft src/data/lists/${year}.ts (config copied from ${template})`);
  if (makeDefault) setDefault(year);
}

const [command, yearArg, ...flags] = process.argv.slice(2);

switch (command) {
  case "new":
    await createList(parseYear(yearArg), flags.includes("--default"));
    break;
  case "default":
    setDefault(parseYear(yearArg));
    break;
  default:
    fail("usage: bun scripts/lists.ts new <year> [--default] | default <year>");
}
