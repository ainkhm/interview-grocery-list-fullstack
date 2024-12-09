import { Module } from "@nestjs/common";
import { UserModule } from "@grocery-app/user";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy, JwtStrategy } from "./strategies";
import { JwtModule } from "@nestjs/jwt";
import { config } from "@grocery-app/configs";

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: { expiresIn: "3600s" },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}