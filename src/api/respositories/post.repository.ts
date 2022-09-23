import { DependencyContainer, DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { MySqlConnection } from "../core/mysql/mysql.connection";
import { EditRepositoryBase } from "../core/repositories/edit.repository";
import { Post } from "../models/post";

@Injectable({ lifeTime: DependencyLifeTime.Scoped})
export class PostRepository extends EditRepositoryBase<Post, number> {
  constructor(dependencyContainer: DependencyContainer, connection: MySqlConnection) {
    super(dependencyContainer, connection, Post, 'posts');
  }
}