import type { ClassType } from "./class-type";
import type { RoleType } from "./role-type";
import type { SchoolType } from "./school-type";

export type UserBaseType = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: RoleType;
};

export type UserType = UserBaseType & {
  adminDetails?: AdminDetailsType;
  teacherDetails?: TeacherDetailsType;
  parentDetails?: ParentDetailsType;
  studentDetails?: StudentDetailsType;
};

export type AdminDetailsType = {
  created_at: string;
  last_login: string;
  phone: string;
  school?: SchoolType | null;
};

export type TeacherDetailsType = {
  subject_specialization: string;
  experience_years: number;
  qualification: string;
  employment_date: string;
  salary: number;
};

export type ParentDetailsType = {
  balance: number;
  address: string;
  relationship: string;
  emergency_contact: string;
};

export type StudentDetailsType = {
  class: ClassType;
  parent: ParentInStudentType;
};

type ParentInStudentType = {
  id: number;
  name: string;
  email: string;
  address: string;
  relationship: string;
  emergency_contact: string;
};
