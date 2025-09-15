import type { ClassType } from "./class-type";
import type { LessonType } from "./lesson-type";
import type { StudentDetailsType } from "./user-type";

export type TaskType = {
  id: number;
  task: string;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
  end_at: string;
  class: ClassType;
  lesson: LessonType;
  student: StudentDetailsType | null;
};
