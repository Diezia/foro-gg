import { HttpContext, IFilter } from "@miracledevs/paradigm-express-webapi";
import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import jwt from "jsonwebtoken";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class AuthFilter implements IFilter {
  constructor() {}
  beforeExecute(httpContext: HttpContext): void {
    try {
      const token = httpContext.request.headers["authorization"];
      if (!token) {
        httpContext.response.sendStatus(401);
      }
      const decoded = jwt.verify(token as string, "my secret");
      if (!decoded) {
        httpContext.response.sendStatus(401);
      }
    } catch (err) {
      httpContext.response.sendStatus(500);
    }
  }
}
