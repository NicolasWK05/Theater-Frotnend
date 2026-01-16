import { PremiumSeatRow } from "./PremiumSeatRow";

export interface Screen {
  id: number;
  name: string;
  capacity: number;
  rowCount: number;
  columnCount: number;
  premiumSeatCount: number;

  theaterId: number;
  premiumSeatRows?: PremiumSeatRow[];
}
