import { ConfigurationBuilder, HttpContext, IFilter } from "@miracledevs/paradigm-express-webapi";
import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import jwt from "jsonwebtoken";
import { Configuration } from "../configuration/configuration";
import { JwtConfiguration } from "../configuration/jwt.configuration";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class AuthFilter implements IFilter {
  private jwt: JwtConfiguration;
  constructor(configurationBuilder: ConfigurationBuilder) {
    const configuration = configurationBuilder.build(Configuration);
    this.jwt = configuration.jwt
  }
  beforeExecute(httpContext: HttpContext): void {
    try {
      const token = httpContext.request.headers["authorization"];
      if (!token) {
        httpContext.response.sendStatus(401);
      }
      const decoded = jwt.verify(token as string, this.jwt.secret);
      if (!decoded) {
        httpContext.response.sendStatus(401);
      }
    } catch (err) {
      httpContext.response.sendStatus(500);
    }
  }
}
