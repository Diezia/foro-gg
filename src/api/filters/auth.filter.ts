import {
  HttpContext,
  IFilter,
  RoutingContext,
} from "@miracledevs/paradigm-express-webapi";
import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import jwt from "jsonwebtoken";

interface MyToken {
  name: string;
  id: number;
  iat: number;
  exp: number;
}

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class AuthFilter implements IFilter {
  constructor() {}
  beforeExecute(httpContext: HttpContext): void {
    try {
      const token = httpContext.request.headers["authorization"];
      console.log("token 1", token);
      if (!token) {
        httpContext.response.sendStatus(401);
      }
      const decoded = jwt.verify(token as string, 'my secret');
      if (!decoded) {
        httpContext.response.sendStatus(401);
      }
      console.log("decoded", decoded)
    } catch (err) {
      console.log(err);
      httpContext.response.sendStatus(500);

    }
  }
  /* afterExecute(httpContext: HttpContext, routingContext: RoutingContext): void | Promise<void> {
    try {
      const decoded: any = jwt.verify(httpContext.request.headers["authorization"] as string, 'my secret');
      const newToken = jwt.sign({
        id: decoded.id,
        name: decoded.name
      }, "my secret", { expiresIn: '3h' })
      httpContext.response.setHeader('authorization', newToken)
      // console.log(httpContext.response.getHeader("authorization"))
      console.log('httpContext.response.getHeader("authorization")', httpContext.response.getHeader("authorization"))
    } catch (error) {
      console.log(error);
      httpContext.response.sendStatus(500);
    }
  } */
}

// que diferencia hay entre httpContext.request.headers["authorization"] y httpContext.response.getHeader("authorization")? uno es de request y el otro de response? cuál tengo que usar para setear el token?
