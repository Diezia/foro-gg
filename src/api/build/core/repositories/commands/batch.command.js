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
exports.BatchDbCommand = void 0;
const db_command_1 = require("./db.command");
class BatchDbCommand extends db_command_1.DbCommand {
    constructor(connection) {
        super(connection);
        this._callbacks = [];
    }
    addCommand(command, callback) {
        this._callbacks.push(callback);
        this._query += command.query + ";";
        this._parameters = this._parameters.concat(command.parameters);
    }
    executeQuery() {
        const _super = Object.create(null, {
            executeQuery: { get: () => super.executeQuery }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const results = (yield _super.executeQuery.call(this));
            if (results && results.length) {
                for (let i = 0; i < results.length; i++) {
                    const callback = this._callbacks[i];
                    const result = results[i];
                    if (callback) {
                        callback(result);
                    }
                }
            }
            return results;
        });
    }
}
exports.BatchDbCommand = BatchDbCommand;
