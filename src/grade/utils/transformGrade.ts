import { Grade, GradeType } from "types/grade-type";

type InputGradeType = {
  grade_id: number;
  grade: Grade;
  message: string;
  diary_id: number;
  student_id: number;
  student_name: string;
  student_email: string;
  parent_address: string;
  relationship: string;
  emergency_contact: string;
  student_class_id: number;
  student_class_name: string;
  school_id: number;
  school_name: string;
  school_status: string;
  school_address: string;
  school_created_at: string;
  school_updated_at: string;
  lesson_id: number;
  subject: string;
  start_time: string;
  end_time: string;
  type: string;
  date: string;
  schedule_id: number;
  day_of_week: string;
};

export class TransformGrade {
  static transform(data: InputGradeType): GradeType;
  static transform(data: InputGradeType[]): GradeType[];
  static transform(data: InputGradeType | InputGradeType[]): any {
    if (Array.isArray(data)) {
      return data.map(value => ({
        id: value.grade_id,
        grade: value.grade,
        message: value.message,
        diary: {
          id: value.diary_id,
          student: {
            id: value.student_id,
            name: value.student_name,
            email: value.student_email,
            studentDetails: {
              class: {
                id: value.student_class_id,
                name: value.student_class_name,
                school: {
                  id: value.school_id,
                  name: value.school_name,
                  status: value.school_status,
                  address: value.school_address,
                  created_at: value.school_created_at,
                  updated_at: value.school_updated_at,
                },
                parent: {
                  address: value.parent_address,
                  relationship: value.relationship,
                  emergency_contact: value.emergency_contact,
                },
                lesson: {
                  id: value.lesson_id,
                  subject: value.subject,
                  start_time: value.start_time,
                  end_time: value.end_time,
                  type: value.type,
                  date: value.date,
                },
                schedule: {
                  id: value.schedule_id,
                  day_of_week: value.day_of_week,
                },
              },
            },
          },
        },
      }));
    } else {
      return {
        id: data.grade_id,
        grade: data.grade,
        message: data.message,
        diary: {
          id: data.diary_id,
          student: {
            id: data.student_id,
            name: data.student_name,
            email: data.student_email,
            studentDetails: {
              class: {
                id: data.student_class_id,
                name: data.student_class_name,
                school: {
                  id: data.school_id,
                  name: data.school_name,
                  status: data.school_status,
                  address: data.school_address,
                  created_at: data.school_created_at,
                  updated_at: data.school_updated_at,
                },
                parent: {
                  address: data.parent_address,
                  relationship: data.relationship,
                  emergency_contact: data.emergency_contact,
                },
                lesson: {
                  id: data.lesson_id,
                  subject: data.subject,
                  start_time: data.start_time,
                  end_time: data.end_time,
                  type: data.type,
                  date: data.date,
                },
                schedule: {
                  id: data.schedule_id,
                  day_of_week: data.day_of_week,
                },
              },
            },
          },
        },
      };
    }
  }
}
