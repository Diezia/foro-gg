"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplaceDbCommand = void 0;
const db_command_1 = require("./db.command");
class ReplaceDbCommand extends db_command_1.DbCommand {
    constructor(connection, tableName, entities) {
        super(connection);
        this.prepareStatement(tableName, entities);
    }
    prepareStatement(tableName, entities) {
        if (!entities || !entities.length)
            throw new Error("The array of entities can not be null or empty.");
        this._query = `REPLACE INTO ${tableName} (${this.getColumnNames(entities)}) VALUES ${this.getValues(entities)}`;
        this._parameters = this.getValueArray(entities);
    }
    getColumnNames(entities) {
        const keys = Object.keys(entities[0]).map(x => `\`${x}\``);
        return keys.join(",");
    }
    getValues(entities) {
        const questionMarks = Object.keys(entities[0])
            .map(() => "?")
            .join(",");
        return entities.map(() => `(${questionMarks})`).join(",");
    }
    getValueArray(entities) {
        const keys = Object.keys(entities[0]);
        const parameters = [];
        for (const entity of entities) {
            for (const key of keys) {
                parameters.push(Object.prototype.hasOwnProperty.call(entity, key) ? entity[key] : null);
            }
        }
        return parameters;
    }
}
exports.ReplaceDbCommand = ReplaceDbCommand;
