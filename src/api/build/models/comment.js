"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const paradigm_web_di_1 = require("@miracledevs/paradigm-web-di");
let Comment = class Comment {
    constructor() {
        this.id = 0;
        this.body = "";
        this.created_at = new Date();
        this.created_by = 0;
        this.post_id = 0;
        this.created_by_name = "";
    }
};
Comment = __decorate([
    (0, paradigm_web_di_1.Injectable)({ lifeTime: paradigm_web_di_1.DependencyLifeTime.Transient })
], Comment);
exports.Comment = Comment;
