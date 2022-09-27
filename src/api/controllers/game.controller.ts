import {
  Action,
  ApiController,
  Controller,
} from "@miracledevs/paradigm-express-webapi";
import { GameRepository } from "../respositories/game.repository";

@Controller({ route: "/api/games" })
export class GameController extends ApiController {
  constructor(private repoGame: GameRepository) {
    super();
  }
  @Action({ route: "/" })
  async get() {
    try {
      const data = await this.repoGame.getAll()
      this.httpContext.response.status(200).send(data);
      return;
    } catch (error) {
      console.log(error);
    }
  }
}
