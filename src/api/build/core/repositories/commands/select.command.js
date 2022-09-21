"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectDbCommand = void 0;
const db_command_1 = require("./db.command");
class SelectDbCommand extends db_command_1.DbCommand {
    constructor(connection, tableName) {
        super(connection);
        this._query = `SELECT * FROM \`${tableName}\``;
    }
}
exports.SelectDbCommand = SelectDbCommand;
