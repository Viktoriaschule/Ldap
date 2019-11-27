"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var express_basic_auth_1 = __importDefault(require("express-basic-auth"));
var auth_butler_1 = __importStar(require("./authentication/auth_butler"));
var app = express_1.default();
app.use(cors_1.default());
app.use(express_basic_auth_1.default({ authorizer: auth_butler_1.default, challenge: true, authorizeAsync: true }));
app.get('/', function (req, res) {
    res.send('Hello world!');
});
app.use('/login', auth_butler_1.authRouter);
exports.default = app;
//# sourceMappingURL=app.js.map