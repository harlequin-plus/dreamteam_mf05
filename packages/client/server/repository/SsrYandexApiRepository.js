"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SsrYandexAPIRepository = void 0;
const axios_1 = __importDefault(require("axios"));
const API_ROOT = 'https://ya-praktikum.tech/api/v2/';
class SsrYandexAPIRepository {
    constructor(_cookieHeader) {
        this._cookieHeader = _cookieHeader;
    }
    async getCurrent() {
        const { data } = await axios_1.default.get(`${API_ROOT}/auth/user`, {
            headers: {
                cookie: this._cookieHeader,
            },
        });
        // console.log(data)
        return data;
    }
}
exports.SsrYandexAPIRepository = SsrYandexAPIRepository;
