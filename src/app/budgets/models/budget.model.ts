import {ThemedItem} from '../../shared/models/themed-item';
import {CategorisedItem} from '../../shared/models/categorised-item';

export interface Budget extends ThemedItem, CategorisedItem {
  id?: string;
  maximum: number;

  spent?: number;
  percent?: number;
  remaining?: number;
}
