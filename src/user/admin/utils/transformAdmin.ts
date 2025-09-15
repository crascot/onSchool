import type { RoleEnum } from "TYPES/role-type";
import type { UserType } from "TYPES/user-type";

export type InputAdminType = {
  user_id: number;
  name: string;
  email: string;
  password: string;
  role_id: number;
  admin_details_created_at: string;
  admin_details_last_login: string;
  admin_details_phone: string;
  role_name: RoleEnum;
  role_description: string;
};

export class TransformAdmin {
  static transform(data: InputAdminType): UserType;
  static transform(data: InputAdminType[]): UserType[];
  static transform(data: InputAdminType | InputAdminType[]): UserType | UserType[] {
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
        adminDetails: {
          created_at: value.admin_details_created_at,
          last_login: value.admin_details_last_login,
          phone: value.admin_details_phone,
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
        adminDetails: {
          created_at: data.admin_details_created_at,
          last_login: data.admin_details_last_login,
          phone: data.admin_details_phone,
        },
      };
    }
  }
}
