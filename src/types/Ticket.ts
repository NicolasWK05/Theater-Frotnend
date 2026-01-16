import { Person } from "./Person";
import { Screening } from "./Screening";

export interface Ticket {
  id: number;
  price: number;

  screeningId: number;
  personId: number;

  seatRow: number;
  seatColumn: number;

  screening?: Screening;
  person?: Person;
}
