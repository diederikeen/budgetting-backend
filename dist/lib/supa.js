"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supaurl = process.env.SUPABASE_URL;
const supakey = process.env.SUPABASE_KEY;
exports.supabase = (0, supabase_js_1.createClient)(supaurl, supakey);
