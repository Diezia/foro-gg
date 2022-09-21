import {
  Action,
  ApiController,
  Controller,
  HttpMethod,
} from "@miracledevs/paradigm-express-webapi";
import { TestRepository } from "../respositories/test.repository";

@Controller({ route: "/" })
export class TestController extends ApiController {
  constructor(private repo: TestRepository) {
    super();
  }

  @Action({ route: "/" })
  async get() {
    try {
      const some = await this.repo.getAll()
      console.log(some)
      this.httpContext.response.status(200).send(some);
      return;
    } catch {
      this.httpContext.response.sendStatus(500);
      return;
    }
  }
  @Action({ route: "data", method: HttpMethod.GET })
  getData() {
    try {
      return ["uno", "dos", "test", "cuarto"];
    } catch {
      this.httpContext.response.sendStatus(500);
      return;
    }
  }
  @Action({ route: "/" })
  post() {
    try {
      this.httpContext.response.status(200).send(this.httpContext.request.body);
      return;
    } catch {
      this.httpContext.response.sendStatus(500);
      return;
    }
  }
}
