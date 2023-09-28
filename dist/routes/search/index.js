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
const express_1 = require("express");
const auth_1 = require("../../lib/auth");
const __1 = require("../..");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateUser);
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = res.req.query;
    try {
        const { data } = yield __1.supabase.from('transactions').select(`
        *,
        category (id, name)
      `).textSearch('note', JSON.stringify(search));
        return res.status(200).json(data);
    }
    catch (error) {
        throw new Error(JSON.stringify(error));
    }
}));
exports.default = router;