import type { RoleEnum } from "TYPES/role-type";
import type { UserType } from "TYPES/user-type";

type InputStudentType = {
  user_id: number;
  name: string;
  email: string;
  password: string;
  role_id: number;
  role_name: RoleEnum;
  role_description: string;
  classes_id: number;
  classes_name: string;
  schools_id: number;
  schools_name: string;
  schools_status: string;
  schools_address: string;
  schools_created_at: string;
  schools_updated_at: string;
  parent_user_id: number;
  parent_name: string;
  parent_email: string;
  parent_address: string;
  parent_relationship: string;
  parent_emergency_contact: string;
};

export class TransformStudent {
  static transform(data: InputStudentType): UserType;
  static transform(data: InputStudentType[]): UserType[];
  static transform(data: InputStudentType | InputStudentType[]): UserType | UserType[] {
    if (Array.isArray(data)) {
      return data.map(value => ({
        id: value.user_id,
        name: value.name,
        email: value.email,
        password: value.password,
        role: {
          id: value.role_id,
          name: value.role_name,
          description: value.role_description,
        },
        class: {
          id: value.classes_id,
          name: value.classes_name,
          school: {
            id: value.schools_id,
            name: value.schools_name,
            status: value.schools_status,
            address: value.schools_address,
            created_at: value.schools_created_at,
            updated_at: value.schools_updated_at,
          },
        },
        parent: {
          id: value.parent_user_id,
          name: value.parent_name,
          email: value.parent_email,
          address: value.parent_address,
          relationship: value.parent_relationship,
          emergency_contact: value.parent_emergency_contact,
        },
      }));
    } else {
      return {
        id: data.user_id,
        name: data.name,
        email: data.email,
        password: data.password,
        role: {
          id: data.role_id,
          name: data.role_name,
          description: data.role_description,
        },
        studentDetails: {
          class: {
            id: data.classes_id,
            name: data.classes_name,
            school: {
              id: data.schools_id,
              name: data.schools_name,
              status: data.schools_status,
              address: data.schools_address,
              created_at: data.schools_created_at,
              updated_at: data.schools_updated_at,
            },
          },
          parent: {
            id: data.parent_user_id,
            name: data.parent_name,
            email: data.parent_email,
            address: data.parent_address,
            relationship: data.parent_relationship,
            emergency_contact: data.parent_emergency_contact,
          },
        },
      };
    }
  }
}
