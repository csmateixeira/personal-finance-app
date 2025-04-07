export interface Budget {
  id?: string;
  category: string;
  maximum: number;
  theme: string;

  spent?: number;
  percent?: number;
  remaining?: number;
}
