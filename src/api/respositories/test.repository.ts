import { DependencyContainer, DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { MySqlConnection } from "../core/mysql/mysql.connection";
import { EditRepositoryBase } from "../core/repositories/edit.repository";
import { Test } from "../models/test";

@Injectable({ lifeTime: DependencyLifeTime.Scoped})
export class TestRepository extends EditRepositoryBase<Test, number> {
  constructor(dependencyContainer: DependencyContainer, connection: MySqlConnection,) {
    super(dependencyContainer, connection, Test, 'user');

  }
}