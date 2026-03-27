import { runReservation } from "./function.js";

await runReservation({
  showName: '빛을 구해줘',
  targetTime: '오후 11:30',
  targetWeekIndex:5,
  targetDayIndex:1,
  startHour: 17,
  startMinute: 34
  
});