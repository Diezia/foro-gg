import {
  Action,
  ApiController,
  Controller,
  HttpMethod,
} from "@miracledevs/paradigm-express-webapi";
import { UserRepository } from "../respositories/user.repository";
import { AuthService } from "../services/auth.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthFilter } from "../filters/auth.filter";


@Controller({ route: "/api/auth" })
export class AuthController extends ApiController {
  constructor(
    private repoUser: UserRepository,
    private authService: AuthService
  ) {
    super();
  }
  @Action({ route: "/register", method: HttpMethod.POST })
  async register() {
    try {
      const findRes = await this.repoUser.find("email = ?", [
        this.httpContext.request.body.email,
      ]);
      console.log('this.httpContext.request.body', this.httpContext.request.body)
      if (findRes.length === 0) {
        console.log("no existe el user");
        this.authService.register(
          this.httpContext.request.body.email,
          this.httpContext.request.body.name,
          this.httpContext.request.body.password,
          this.repoUser
        );
        this.httpContext.response.status(200).send("User created");
        return;
      }
      console.log(findRes);
      this.httpContext.response.status(409).send("User already exists");
      return;
    } catch {
      this.httpContext.response.sendStatus(500);
      return;
    }
  }
  @Action({ route: "/login", method: HttpMethod.POST })
  async login() {
    try {
      const user = await this.repoUser.find("email = ?", [
        this.httpContext.request.body.email,
      ]);
      if (user.length === 0) {
        this.httpContext.response.status(404).send("User not exists");
        return;
      }
      const match = await bcrypt.compare(
        this.httpContext.request.body.password,
        user[0].password
      );
      if (match) {
        // user logged in
        const token: string = jwt.sign({
          id: user[0].id,
          name: user[0].name
        }, "my secret", { expiresIn: '3h' });
        this.httpContext.response.setHeader('Authorization', JSON.stringify(token));
        this.httpContext.response.cookie('jwt', JSON.stringify(token));
        this.httpContext.response.status(200).send(JSON.stringify(token));
        return;
      }
      this.httpContext.response.status(401).send("password incorrect");
    } catch (error) {
      console.log(error);
      this.httpContext.response.sendStatus(500);
      return;
    }
  }
  @Action({ route: "/logout" })
  logout() {}
  @Action({ route: "/example", method: HttpMethod.GET, filters: [AuthFilter] })
  exampleGetWithToken() {
    // this.httpContext.response.setHeader('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6ImxvY28iLCJpYXQiOjE2NjQ3Nzc0NTgsImV4cCI6MTY2NDc4MTA1OH0.eLArZr8N056Vj9SA-89-ImiIVMEqPgCv_YyX-ByWvoY');

    // this.authService.authEndpoint();
  }
}
