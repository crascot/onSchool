import type { RoleEnum } from "TYPES/role-type";
import type { UserType } from "TYPES/user-type";

type InputParentType = {
  user_id: number;
  name: string;
  email: string;
  password: string;
  role_id: number;
  parent_details_balance: number;
  parent_details_address: string;
  parent_details_relationship: string;
  parent_details_emergency_contact: string;
  role_name: RoleEnum;
  role_description: string;
};

export class TransformParent {
  static transform(data: InputParentType): UserType;
  static transform(data: InputParentType[]): UserType[];
  static transform(data: InputParentType | InputParentType[]): UserType | UserType[] {
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
        parentDetails: {
          balance: value.parent_details_balance,
          address: value.parent_details_address,
          relationship: value.parent_details_relationship,
          emergency_contact: value.parent_details_emergency_contact,
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
        parentDetails: {
          balance: data.parent_details_balance,
          address: data.parent_details_address,
          relationship: data.parent_details_relationship,
          emergency_contact: data.parent_details_emergency_contact,
        },
      };
    }
  }
}
