/**
 * Created by Peter on 10.02.2018.
 */
export class Openinghour {
  _id: string;
  restaurantId: string;
  weekday: string;
  fromTimeMorning: Date;
  toTimeMorning: Date;
  fromTimeAfternoon: Date;
  toTimeAfternoon: Date;
  allDayClosed: boolean;
  sortorder: number;
}

