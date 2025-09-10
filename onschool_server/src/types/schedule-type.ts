import { ClassType } from "./class-type";

export type ScheduleType = {
  id: number;
  class: ClassType;
  day_of_week: string;
};
