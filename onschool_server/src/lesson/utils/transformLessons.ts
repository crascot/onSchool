import { LessonType } from "types/lesson-type";
import { SchoolType } from "types/school-type";

type InputLessonType = {
  lessons_id: number;
  subject: string;
  start_time: string;
  end_time: string;
  type: string;
  date: string;
  schedule_id: number;
  day_of_week: string;
  class_id: number;
  class_name: string;
  class_school: SchoolType;
};

export class TransformLessons {
  static transform(data: InputLessonType): LessonType;
  static transform(data: InputLessonType[]): LessonType[];
  static transform(data: InputLessonType | InputLessonType[]): LessonType | LessonType[] {
    if (Array.isArray(data)) {
      return data.map(e => ({
        id: e.lessons_id,
        subject: e.subject,
        start_time: e.start_time,
        end_time: e.end_time,
        type: e.type,
        date: e.date,
        schedule: {
          id: e.schedule_id,
          class: {
            id: e.class_id,
            name: e.class_name,
            school: e.class_school,
          },
          day_of_week: e.day_of_week,
        },
      }));
    } else {
      return {
        id: data.lessons_id,
        subject: data.subject,
        start_time: data.start_time,
        end_time: data.end_time,
        type: data.type,
        date: data.date,
        schedule: {
          id: data.schedule_id,
          class: {
            id: data.class_id,
            name: data.class_name,
            school: data.class_school,
          },
          day_of_week: data.day_of_week,
        },
      };
    }
  }
}
