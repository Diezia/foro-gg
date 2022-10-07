import {
  DependencyContainer,
  DependencyLifeTime,
  Injectable,
} from "@miracledevs/paradigm-web-di";
import { MySqlConnection } from "../core/mysql/mysql.connection";
import { EditRepositoryBase } from "../core/repositories/edit.repository";
import { Post } from "../models/post";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class PostRepository extends EditRepositoryBase<Post, number> {
  constructor(
    dependencyContainer: DependencyContainer,
    connection: MySqlConnection
  ) {
    super(dependencyContainer, connection, Post, "posts");
  }

  async getOrderedPostsByDateByGameId(
    where: string,
    args: any
  ): Promise<Post[]> {
    const [rows] = await this.connection.connection.execute(
      `SELECT * FROM \`${this.tableName}\` WHERE ${where} ORDER BY created_at DESC`,
      args
    );
    return this.map(rows, this.entityType);
  }
}
