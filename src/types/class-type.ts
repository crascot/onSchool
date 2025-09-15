import type { SchoolType } from "./school-type";

export type ClassType = {
  id: number;
  name: string;
  school: SchoolType;
};
