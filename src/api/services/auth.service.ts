import {
  DependencyContainer,
  DependencyLifeTime,
  Injectable,
} from "@miracledevs/paradigm-web-di";
import bcrypt from "bcrypt";
import { UserRepository } from "../respositories/user.repository";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class AuthService {
  constructor(dependencyContainer: DependencyContainer) {}
  register(
    email: string,
    name: string,
    password: string,
    repoUser: UserRepository
  ) {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const mydata: any = {
          email,
          name,
          password: hash,
        };
        const data = await repoUser.insertOne(mydata);
      });
    });
  }
}
