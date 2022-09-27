import { DependencyContainer, DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { MySqlConnection } from "../core/mysql/mysql.connection";
import { EditRepositoryBase } from "../core/repositories/edit.repository";
import { Valoration } from "../models/valoration";

@Injectable({ lifeTime: DependencyLifeTime.Scoped})
export class ValorationRepository extends EditRepositoryBase<Valoration, number> {
  constructor(dependencyContainer: DependencyContainer, connection: MySqlConnection) {
    super(dependencyContainer, connection, Valoration, 'valorations');
  }
  // Agregar metodo para hacer el count en db basado en readonly.repository
  async countPostValorations(postId: number): Promise<any> {
    const res = await this.connection.connection.query(`SELECT COUNT(*) AS valoration FROM ${this.tableName} WHERE post_id = ${postId}`)
    return res;
    // ver como carajo hacer para que retorne un numero -> ver como trae la data con un fetch desde el front
  }
  async deleteValorations(id: number) {
    await this.connection.connection.query(`DELETE FROM \`${this.tableName}\` WHERE post_id=?`, [id]);
  }
}