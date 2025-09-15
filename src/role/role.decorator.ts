import { SetMetadata } from "@nestjs/common";
import type { RoleEnum } from "TYPES/role-type";

export const ROLES_KEY = "roles";
export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);
