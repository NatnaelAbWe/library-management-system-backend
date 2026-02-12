"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = Number(process.env.PORT) || 8000;
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, cors_1.default)());
// health route
server.get("/health", (req, res) => {
    res.status(200).json({ message: "The sever is running properly" });
});
// start your server
server.listen(port, () => {
    console.log("your app is running on port: ", port);
});
//# sourceMappingURL=server.js.map