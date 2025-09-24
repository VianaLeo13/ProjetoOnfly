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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var n8n_workflow_1 = require("n8n-workflow");
var axios_1 = require("axios");
var Random = /** @class */ (function () {
    function Random() {
        this.description = {
            displayName: 'Random',
            name: 'random',
            icon: 'file:icon.svg', // verifique se o icon.svg está na mesma pasta
            group: ['transform'],
            version: 1,
            description: 'True Random Number Generator usando Random.org',
            defaults: {
                name: 'Random',
                color: '#6f49fd',
            },
            inputs: ['main'],
            outputs: ['main'],
            properties: [
                {
                    displayName: 'Operação',
                    name: 'operation',
                    type: 'options',
                    options: [
                        {
                            name: 'True Random Number Generator',
                            value: 'trueRandom',
                            description: 'Gera um número verdadeiramente aleatório usando Random.org',
                        },
                    ],
                    default: 'trueRandom',
                    description: 'Escolha a operação',
                },
                {
                    displayName: 'Min',
                    name: 'min',
                    type: 'number',
                    default: 1,
                    description: 'Valor mínimo (inclusivo). Apenas números inteiros.',
                    required: true,
                    typeOptions: { integer: true },
                },
                {
                    displayName: 'Max',
                    name: 'max',
                    type: 'number',
                    default: 60,
                    description: 'Valor máximo (inclusivo). Apenas números inteiros.',
                    required: true,
                    typeOptions: { integer: true },
                },
            ],
        };
    }
    // ✅ Corrigido: use IExecuteFunctions do 'n8n-workflow'
    Random.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items, returnData, executionCount, i, operation, min, max, url, randomNumber, rawResponse, resp, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        items = this.getInputData();
                        returnData = [];
                        executionCount = Math.max(1, items.length);
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < executionCount)) return [3 /*break*/, 8];
                        operation = this.getNodeParameter('operation', i);
                        if (!(operation === 'trueRandom')) return [3 /*break*/, 6];
                        min = this.getNodeParameter('min', i);
                        max = this.getNodeParameter('max', i);
                        // Validações
                        if (!Number.isFinite(min) || !Number.isFinite(max)) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Os valores Min e Max devem ser números.');
                        }
                        if (!Number.isInteger(min) || !Number.isInteger(max)) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Min e Max devem ser inteiros.');
                        }
                        if (min > max) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Min não pode ser maior que Max.');
                        }
                        url = "https://www.random.org/integers/?num=1&min=".concat(min, "&max=").concat(max, "&col=1&base=10&format=plain&rnd=new");
                        randomNumber = void 0;
                        rawResponse = '';
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios_1.default.get(url, { responseType: 'text', timeout: 10000 })];
                    case 3:
                        resp = _b.sent();
                        rawResponse = String(resp.data).trim();
                        randomNumber = parseInt(rawResponse, 10);
                        if (Number.isNaN(randomNumber)) {
                            throw new Error("Resposta inv\u00E1lida do Random.org: \"".concat(rawResponse, "\""));
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), "Erro ao chamar Random.org: ".concat((_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.message) !== null && _a !== void 0 ? _a : String(error_1)));
                    case 5:
                        returnData.push({
                            random: randomNumber,
                            min: min,
                            max: max,
                            raw: rawResponse,
                        });
                        return [3 /*break*/, 7];
                    case 6: throw new n8n_workflow_1.NodeOperationError(this.getNode(), "Opera\u00E7\u00E3o desconhecida: ".concat(operation));
                    case 7:
                        i++;
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/, [this.helpers.returnJsonArray(returnData)]];
                }
            });
        });
    };
    return Random;
}());
module.exports = { random: Random };
