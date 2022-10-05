import {
  Action,
  ApiController,
  Controller,
  HttpMethod,
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
  @Action({ route: ":gameId", method: HttpMethod.GET })
  async getGame(gameId: number) {
    try {
      const { gameId } = this.httpContext.request.params;

      const data = await this.repoGame.find("id = ?", [
        gameId
      ]);
      this.httpContext.response.status(200).send(JSON.stringify(data[0]));
      return;
    } catch (error) {
      console.log("Error en get game by id", error);
    }
  }
}
