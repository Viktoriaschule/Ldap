"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var config = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(process.cwd(), 'config.json')).toString());
exports.default = config;
//# sourceMappingURL=config.js.map