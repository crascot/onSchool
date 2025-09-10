import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "USER/user.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt-strategy";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      // TODO: dont remove it
      // privateKey: readFileSync(process.env.JWT_PRIVATE_KEY_PATH!, "utf8"),
      // publicKey: readFileSync(process.env.JWT_PUBLIC_KEY_PATH!, "utf8"),
      signOptions: {
        expiresIn: "1d",
        algorithm: "RS256",
        issuer: process.env.JWT_ISS,
        audience: process.env.JWT_AUD,
      },
      verifyOptions: { algorithms: ["RS256"], issuer: process.env.JWT_ISS, audience: process.env.JWT_AUD },
      global: true,
      secret: process.env.JWT_SECRET || "default",
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
