import { CategorisedItem } from "../../shared/models/categorised-item";

export interface Transaction extends CategorisedItem {
  id?: string;
  avatar: string;
  name: string;
  date: string;
  amount: number;
  recurring: boolean;
}
