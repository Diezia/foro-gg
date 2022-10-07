import {
  DependencyContainer,
  DependencyLifeTime,
  Injectable,
} from "@miracledevs/paradigm-web-di";
import { MySqlConnection } from "../core/mysql/mysql.connection";
import { EditRepositoryBase } from "../core/repositories/edit.repository";
import { Game } from "../models/game";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class GameRepository extends EditRepositoryBase<Game, number> {
  constructor(
    dependencyContainer: DependencyContainer,
    connection: MySqlConnection
  ) {
    super(dependencyContainer, connection, Game, "games");
  }
}
