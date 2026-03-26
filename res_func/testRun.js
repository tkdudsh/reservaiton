import { runReservation } from "./function.js";

await runReservation({
  showName: '생존자',
  targetDate: '2',
  targetTime: '오후 8:00',
  startHour: 17,
  startMinute: 37
});