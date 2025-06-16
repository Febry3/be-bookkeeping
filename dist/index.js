"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const express_1 = __importStar(require("express"));
const config_1 = __importDefault(require("./config/config"));
const auth_router_1 = require("./api/auth/auth.router");
const income_router_1 = require("./api/income/income.router");
const financial_router_1 = require("./api/financial/financial.router");
const handle_error_1 = __importDefault(require("./middlewares/handle-error"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const model_1 = require("./model");
// Import semua model
const app = (0, express_1.default)();
// Middleware
app.use((0, express_1.json)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// Router
app.use('/api', auth_router_1.router);
app.use('/api', income_router_1.router);
app.use('/api', financial_router_1.router);
// Tes endpoint utama
app.get("/", (req, res) => {
    res.send("✅ API is running!");
});
// Error handling
app.use(handle_error_1.default);
// Start server
app.listen(config_1.default.port, '0.0.0.0', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_1.User.sync();
        yield model_1.Income.sync({ force: true });
        yield model_1.Asset.sync({ force: true });
        yield model_1.Equity.sync({ force: true });
        yield model_1.Investation.sync({ force: true });
        yield model_1.Liability.sync({ force: true });
        yield model_1.Loan.sync({ force: true });
        yield model_1.Spend.sync({ force: true });
        console.log("✅ Successfully connected to the database! Sequelize instance is ready.");
    }
    catch (error) {
        console.error("❌ Failed to connect to the database:", error);
    }
    console.log(`🚀 Running on port ${config_1.default.port}`);
}));
