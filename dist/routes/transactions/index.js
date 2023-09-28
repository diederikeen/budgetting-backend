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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = __importDefault(require("zod"));
const index_1 = require("../../index");
const auth_1 = require("../../lib/auth");
const router = (0, express_1.Router)();
const transactionPostSchema = zod_1.default.object({
    category: zod_1.default.number(),
    note: zod_1.default.string().optional(),
    amount: zod_1.default.string(),
    data: zod_1.default.date().optional(),
});
router.use(auth_1.authenticateUser);
router.get('/transactions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield index_1.supabase.from('transactions').select(`
        *,
        category (id, name, icon_name)
      `).eq('uuid', res.locals.user.id);
        return res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        return new Error(JSON.stringify(error));
    }
}));
router.delete('/transactions/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transaction_id } = res.req.query;
    if (!transaction_id) {
        return;
    }
    try {
        const { error } = yield index_1.supabase.from('transactions').delete().eq('id', transaction_id);
        if (error) {
            return res.status(500).json({ error });
        }
        return res.status(200).json({
            message: 'Transaction succesfully deleted',
        });
    }
    catch (error) {
        throw new Error(JSON.stringify(error));
    }
}));
router.post('/transactions/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = transactionPostSchema.parse(req.body);
    const { id } = res.locals.user;
    if (!id) {
        return;
    }
    try {
        const data = yield index_1.supabase.from('transactions').insert(Object.assign(Object.assign({}, body), { uuid: id }));
        return res.status(201).json(data);
    }
    catch (error) {
        console.error(error);
        return new Error(JSON.stringify(error));
    }
}));
exports.default = router;
