import {ThemedItem} from '../../shared/models/themed-item';

export interface Pot extends ThemedItem {
  id?: string;
  name: string;
  target: number;
  total: number;

  percent?: number;
}
