import type { ListConfig } from "./ListConfig";
import type { RankItem } from "./RankTypes";

/** One year's ranked list: header/branding config plus its items. */
export interface YearList {
  config: ListConfig;
  items: RankItem[];
  /** Work in progress: shown in the switcher but only viewable when running locally */
  draft?: boolean;
}
