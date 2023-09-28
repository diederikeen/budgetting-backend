"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const supabase_js_1 = require("@supabase/supabase-js");
const transactions_1 = __importDefault(require("./routes/transactions"));
const categories_1 = __importDefault(require("./routes/categories"));
const search_1 = __importDefault(require("./routes/search"));
dotenv_1.default.config();
const supaurl = process.env.SUPABASE_URL;
const supakey = process.env.SUPABASE_KEY;
exports.supabase = (0, supabase_js_1.createClient)(supaurl, supakey);
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get('/health', (_, res) => res.status(200).json({ message: 'Everything seems up!' }));
app.use(transactions_1.default);
app.use(categories_1.default);
app.use(search_1.default);
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
