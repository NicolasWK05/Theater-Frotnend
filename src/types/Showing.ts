export default interface Showing {
  id: number;
  filmId: number;
  theaterId: number;
  startTime: Date;
  endTime: Date;
  seatsTaken: number[];
}
