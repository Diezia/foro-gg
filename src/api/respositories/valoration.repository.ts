import {
  DependencyContainer,
  DependencyLifeTime,
  Injectable,
} from "@miracledevs/paradigm-web-di";
import { MySqlConnection } from "../core/mysql/mysql.connection";
import { EditRepositoryBase } from "../core/repositories/edit.repository";
import { Valoration } from "../models/valoration";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class ValorationRepository extends EditRepositoryBase<
  Valoration,
  number
> {
  constructor(
    dependencyContainer: DependencyContainer,
    connection: MySqlConnection
  ) {
    super(dependencyContainer, connection, Valoration, "valorations");
  }
  async countPostValorations(postId: number): Promise<any> {
    const res = await this.connection.connection.query(
      `SELECT COUNT(*) AS valoration FROM ${this.tableName} WHERE post_id = ${postId}`
    );
    return res;
  }
  async deleteValorations(id: number) {
    await this.connection.connection.query(
      `DELETE FROM \`${this.tableName}\` WHERE post_id=?`,
      [id]
    );
  }
}
