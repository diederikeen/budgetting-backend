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
exports.authenticateUser = void 0;
const __1 = require("..");
function authenticateUser(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            const { data } = yield __1.supabase.auth.getUser(accessToken);
            if (data) {
                res.locals.user = data.user;
                next();
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Authentication token is invalid." });
        }
    });
}
exports.authenticateUser = authenticateUser;
