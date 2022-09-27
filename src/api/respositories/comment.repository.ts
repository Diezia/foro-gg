import { DependencyContainer, DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { MySqlConnection } from "../core/mysql/mysql.connection";
import { EditRepositoryBase } from "../core/repositories/edit.repository";
import { Comment } from "../models/comment";

@Injectable({ lifeTime: DependencyLifeTime.Scoped})
export class CommentRepository extends EditRepositoryBase<Comment, number> {
  constructor(dependencyContainer: DependencyContainer, connection: MySqlConnection) {
    super(dependencyContainer, connection, Comment, 'comments');
  }
  async deleteComments(id: number) {
    await this.connection.connection.query(`DELETE FROM \`${this.tableName}\` WHERE post_id=?`, [id]);
  }
}