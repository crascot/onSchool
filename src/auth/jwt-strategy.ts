import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || "defaultSecret",
    });
  }

  async validate(payload: any) {
    console.log("Decoded JWT Payload:", payload);

    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
