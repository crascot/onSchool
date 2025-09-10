export enum RoleEnum {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  PARENT = "PARENT",
  STUDENT = "STUDENT",
  PRINCIPAL = "PRINCIPAL",
}

export type RoleType = {
  id: number;
  name: string;
  description: string;
};
