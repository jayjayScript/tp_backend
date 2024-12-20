"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const routers_1 = __importDefault(require("./routers"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI || '';
const BASE_URL = process.env.BASE_URL || '';
app.use((0, cors_1.default)({
    credentials: true,
    origin: '*'
}));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api', routers_1.default);
const server = http_1.default.createServer(app);
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGO_URI).then(() => {
    console.log('Database is connected');
    server.listen(PORT, () => {
        console.log(`server listening from http://localhost:${PORT}/`);
    });
}).catch(e => console.warn('connection error'));
