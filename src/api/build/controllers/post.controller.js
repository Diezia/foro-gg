"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const paradigm_express_webapi_1 = require("@miracledevs/paradigm-express-webapi");
const comment_repository_1 = require("../respositories/comment.repository");
const post_repository_1 = require("../respositories/post.repository");
const valoration_repository_1 = require("../respositories/valoration.repository");
let PostController = class PostController extends paradigm_express_webapi_1.ApiController {
    constructor(repoPost, repoComment, repoValoration) {
        super();
        this.repoPost = repoPost;
        this.repoComment = repoComment;
        this.repoValoration = repoValoration;
    }
    getPostsByGameid() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gameId = this.httpContext.request.params.gameId;
                const data = yield this.repoPost.getOrderedPostsByDateByGameId("game_id = ?", [gameId]);
                this.httpContext.response.status(200).send(data);
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { gameId, postId } = this.httpContext.request.params;
                const data = yield this.repoPost.find("game_id = ? AND id = ?", [
                    gameId,
                    postId,
                ]);
                this.httpContext.response.status(200).send(data);
                return;
            }
            catch (error) {
                console.log("Error en getById", error);
            }
        });
    }
    createPost() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.repoPost.insertOne(this.httpContext.request.body);
                this.httpContext.response.status(200).send(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updatePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, body, updated_at } = this.httpContext.request.body;
                const mydata = {
                    id: this.httpContext.request.params.postId,
                    title,
                    body,
                    updated_at,
                };
                const data = yield this.repoPost.update(mydata);
                this.httpContext.response.status(200).send(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { gameId, postId } = this.httpContext.request.params;
                const getPostById = yield this.repoPost.find("game_id = ? AND id = ?", [
                    gameId,
                    postId,
                ]);
                const { created_by } = this.httpContext.request.body;
                if (created_by == getPostById[0].created_by) {
                    yield this.repoComment.deleteComments(parseInt(this.httpContext.request.params.postId));
                    yield this.repoValoration.deleteValorations(parseInt(this.httpContext.request.params.postId));
                    const data = yield this.repoPost.delete(parseInt(this.httpContext.request.params.postId));
                    this.httpContext.response.status(200).send(data);
                }
                else {
                    this.httpContext.response
                        .status(403)
                        .send("Not authorized to do this action");
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getValoration(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.repoValoration.countPostValorations(parseInt(this.httpContext.request.params.postId));
                this.httpContext.response
                    .status(200)
                    .send(JSON.stringify(res[0][0]["valoration"]));
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getValorationStateByUser(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mydata = {
                    user_id: this.httpContext.request.body.user_id,
                    post_id: this.httpContext.request.params.postId,
                };
                const valorationExists = yield this.repoValoration.find("user_id = ? and post_id = ?", [mydata.user_id, mydata.post_id]);
                if (valorationExists.length > 0) {
                    this.httpContext.response.status(200).send(true);
                    return;
                }
                else {
                    this.httpContext.response.status(404).send(false);
                    return;
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addValoration(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mydata = {
                    user_id: this.httpContext.request.body.user_id,
                    post_id: this.httpContext.request.params.postId,
                };
                const valorationExists = yield this.repoValoration.find("user_id = ? and post_id = ?", [mydata.user_id, mydata.post_id]);
                if (valorationExists.length === 0) {
                    const data = yield this.repoValoration.insertOne(mydata);
                    this.httpContext.response.status(200).send(data);
                    return;
                }
                else {
                    this.httpContext.response.status(404).send("valoration already added");
                    return;
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteValoration(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mydata = {
                    user_id: this.httpContext.request.body.user_id,
                    post_id: this.httpContext.request.params.postId,
                };
                const valorationExists = yield this.repoValoration.find("user_id = ? and post_id = ?", [mydata.user_id, mydata.post_id]);
                if (valorationExists.length > 0) {
                    const data = yield this.repoValoration.delete(valorationExists[0].id);
                    this.httpContext.response
                        .status(200)
                        .send("valoration deleted succesfully");
                    return;
                }
                else {
                    this.httpContext.response.status(404).send("valoration wasn't found");
                    return;
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getCommentsByPostid(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.repoComment.find("post_id = ?", [
                    this.httpContext.request.params.postId,
                ]);
                this.httpContext.response.status(200).send(data);
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    postComment(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mydata = {
                    body: this.httpContext.request.body.body,
                    created_at: this.httpContext.request.body.created_at,
                    created_by: this.httpContext.request.body.created_by,
                    post_id: this.httpContext.request.params.postId,
                    created_by_name: this.httpContext.request.body.created_by_name,
                };
                const data = yield this.repoComment.insertOne(mydata);
                this.httpContext.response.status(200).send(data);
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteComment(postId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.repoComment.delete(parseInt(this.httpContext.request.params.commentId));
                this.httpContext.response.status(200).send(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: "/", method: paradigm_express_webapi_1.HttpMethod.GET }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostsByGameid", null);
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: ":postId", method: paradigm_express_webapi_1.HttpMethod.GET }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPost", null);
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: "/create", method: paradigm_express_webapi_1.HttpMethod.POST }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: "/:postId", method: paradigm_express_webapi_1.HttpMethod.PUT }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updatePost", null);
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: "/:postId", method: paradigm_express_webapi_1.HttpMethod.DELETE }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: "/:postId/valoration", method: paradigm_express_webapi_1.HttpMethod.GET }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getValoration", null);
__decorate([
    (0, paradigm_express_webapi_1.Action)({
        route: "/:postId/valoration/valorationexist",
        method: paradigm_express_webapi_1.HttpMethod.POST,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getValorationStateByUser", null);
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: "/:postId/valoration", method: paradigm_express_webapi_1.HttpMethod.POST }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "addValoration", null);
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: "/:postId/valoration", method: paradigm_express_webapi_1.HttpMethod.DELETE }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deleteValoration", null);
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: "/:postId/comments", method: paradigm_express_webapi_1.HttpMethod.GET }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getCommentsByPostid", null);
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: "/:postId/comments/create", method: paradigm_express_webapi_1.HttpMethod.POST }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "postComment", null);
__decorate([
    (0, paradigm_express_webapi_1.Action)({ route: "/:postId/comments/:commentId", method: paradigm_express_webapi_1.HttpMethod.DELETE }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deleteComment", null);
PostController = __decorate([
    (0, paradigm_express_webapi_1.Controller)({ route: "/api/games/:gameId/posts" }),
    __metadata("design:paramtypes", [post_repository_1.PostRepository,
        comment_repository_1.CommentRepository,
        valoration_repository_1.ValorationRepository])
], PostController);
exports.PostController = PostController;
