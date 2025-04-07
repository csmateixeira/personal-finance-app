import {Colors} from './colors.model';

export interface Theme {
  id: number;
  name: string;
  color: Colors;
  isUsed: boolean;
}
