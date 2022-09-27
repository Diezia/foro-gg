import {
  Action,
  ApiController,
  Controller,
  HttpMethod,
} from "@miracledevs/paradigm-express-webapi";
import { CommentRepository } from "../respositories/comment.repository";
import { GameRepository } from "../respositories/game.repository";
import { PostRepository } from "../respositories/post.repository";
import { TestRepository } from "../respositories/test.repository";
import { UserRepository } from "../respositories/user.repository";
import { ValorationRepository } from "../respositories/valoration.repository";

@Controller({ route: "/" })
export class TestController extends ApiController {
  constructor(private repo: ValorationRepository) {
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
  @Action({ route: "countposts", method: HttpMethod.GET })
  async getPostCount() {
    try {
      const res = await this.repo.countPostValorations(6);
      console.log(res[0][0]["valoration"])


      this.httpContext.response.status(200).send(JSON.stringify(res[0][0]["valoration"]));
      return;
    } catch {
      this.httpContext.response.sendStatus(500);
      return;
    }
  }
  @Action({ route: "/" })
  async post() {
    try {
      const res = await this.repo.insertOne(this.httpContext.request.body);
      this.httpContext.response.status(200).send(res);
      return;
    } catch {
      this.httpContext.response.sendStatus(500);
      return;
    }
  }
  
}
