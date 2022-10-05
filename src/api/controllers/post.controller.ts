import {
  Action,
  ApiController,
  Controller,
  HttpMethod,
} from "@miracledevs/paradigm-express-webapi";
import { Post } from "../models/post";
import { CommentRepository } from "../respositories/comment.repository";
import { PostRepository } from "../respositories/post.repository";
import { ValorationRepository } from "../respositories/valoration.repository";

@Controller({ route: "/api/games/:gameId/posts" })
export class PostController extends ApiController {
  constructor(
    private repoPost: PostRepository,
    private repoComment: CommentRepository,
    private repoValoration: ValorationRepository
  ) {
    super();
  }
  @Action({ route: "/", method: HttpMethod.GET })
  async getPostsByGameid() {
    try {
      const gameId = this.httpContext.request.params.gameId;
      const data = await this.repoPost.find("game_id = ?", [gameId]);
      this.httpContext.response.status(200).send(data);
      return;
    } catch (error) {
      console.log(error);
    }
  }
  @Action({ route: ":postId", method: HttpMethod.GET })
  async getPost(postId: number) {
    try {
      const { gameId, postId } = this.httpContext.request.params;
      console.log(gameId);
      console.log(postId);

      const data = await this.repoPost.find("game_id = ? AND id = ?", [
        gameId,
        postId,
      ]);
      this.httpContext.response.status(200).send(data);
      return;
    } catch (error) {
      console.log("Error en getById", error);
    }
  }
  @Action({ route: "/create", method: HttpMethod.POST })
  async createPost() {
    try {
      // validar que los datos sean correctos: title, body, etc sin strings vacíos, formatos válidos, valoration cero, que coincidan los datos con las cols de la db, entre otras
      const { title, body, created_by, valoration, game_id, created_at } =
        this.httpContext.request.body;
      const data = await this.repoPost.insertOne(this.httpContext.request.body);
      this.httpContext.response.status(200).send(data);
    } catch (error) {
      console.log(error);
    }
  }
  @Action({ route: "/:postId", method: HttpMethod.PUT })
  async updatePost(postId: number) {
    try {
      // agregar validaciones similares a /create
      // para el front tener en cuenta que presionar "edit post" si o si tengo que tener por default title y body anterior.
      const { title, body, updated_at } = this.httpContext.request.body;
      const mydata: any = {
        id: this.httpContext.request.params.postId,
        title,
        body,
        updated_at,
      };
      const data = await this.repoPost.update(mydata);
      this.httpContext.response.status(200).send(data);
    } catch (error) {
      console.log(error);
    }
  }
  @Action({ route: "/:postId", method: HttpMethod.DELETE })
  async deletePost(postId: number) {
    try {
      await this.repoComment.deleteComments(
        parseInt(this.httpContext.request.params.postId)
      );
      await this.repoValoration.deleteValorations(
        parseInt(this.httpContext.request.params.postId)
      );

      const data = await this.repoPost.delete(
        parseInt(this.httpContext.request.params.postId)
      );
      this.httpContext.response.status(200).send(data);
    } catch (error) {
      console.log(error);
    }
  }
  @Action({ route: "/:postId/valoration", method: HttpMethod.GET })
  async getValoration(postId: number) {
    try {
      const res = await this.repoValoration.countPostValorations(
        parseInt(this.httpContext.request.params.postId)
      );
      console.log(res[0][0]["valoration"]);
      this.httpContext.response
        .status(200)
        .send(JSON.stringify(res[0][0]["valoration"]));
      return;
    } catch (error) {
      console.log(error);
    }
  }
  @Action({ route: "/:postId/valoration", method: HttpMethod.POST })
  async addValoration(postId: number) {
    try {
      const mydata: any = {
        user_id: this.httpContext.request.body.user_id,
        post_id: this.httpContext.request.params.postId,
      };
      const data = await this.repoValoration.insertOne(mydata);
      this.httpContext.response.status(200).send(data);
      return;
    } catch (error) {
      console.log(error);
    }
  }
  @Action({ route: "/:postId/comments", method: HttpMethod.GET })
  async getCommentsByPostid(postId: number) {
    try {
      const data = await this.repoComment.find("post_id = ?", [this.httpContext.request.params.postId]);
      console.log("comments", data)
      this.httpContext.response.status(200).send(data);
      return;
    } catch (error) {
      console.log(error);
    }
  }
  @Action({ route: "/:postId/comments/create", method: HttpMethod.POST })
  async postComment(postId: number) {
    try {
      const mydata: any = {
        body: this.httpContext.request.body.body,
        created_at: this.httpContext.request.body.created_at,
        created_by: this.httpContext.request.body.created_by,
        post_id: this.httpContext.request.params.postId,
        created_by_name: this.httpContext.request.body.created_by_name
      };

      const data = await this.repoComment.insertOne(mydata);
      this.httpContext.response.status(200).send(data);
      return;
    } catch (error) {
      console.log(error);
    }
  }
  @Action({ route: "/:postId/comments/:commentId", method: HttpMethod.DELETE })
  async deleteComment(postId: number, commentId: number) {
    try {
      const data = await this.repoComment.delete(
        parseInt(this.httpContext.request.params.commentId)
      );
      this.httpContext.response.status(200).send(data);
    } catch (error) {
      console.log(error);
    }
  }
}
