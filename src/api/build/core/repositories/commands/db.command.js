"use strict";
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
exports.DbCommand = void 0;
class DbCommand {
    constructor(connection) {
        this.connection = connection;
        this._query = "";
        this._parameters = [];
    }
    get query() {
        return this._query;
    }
    get parameters() {
        return this._parameters.slice();
    }
    executeQuery() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.connection.connection.query(this._query, this._parameters))[0];
        });
    }
}
exports.DbCommand = DbCommand;
