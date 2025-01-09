import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserPrincipal } from './auth.principal';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserPrincipal> {
    return new Promise(async (resolve, reject) => {
      const user = await this.userService.findByUsername(username);
      if (user && user.password === pass) {
        const { password, ...principal } = user;
        console.log('validated user:', principal);
        return resolve(principal);
      }
      reject();
    });
  }

  async login(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
