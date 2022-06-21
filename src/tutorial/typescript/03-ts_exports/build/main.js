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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const greetings_module_1 = require("./greetings_module");
const allGreetingFuntions = __importStar(require("./greetings_module"));
const greetings_utilities_module_1 = require("./greetings-utilities_module");
(0, greetings_module_1.returnGreeting)("Hola!"); // Mostrará el mensaje del módulo Greetings_module es Hola!
allGreetingFuntions.returnGreeting("Hola Mundo!"); // Mostrará el mensaje del módulo Greetings_module es Hola Mundo!
(0, greetings_utilities_module_1.returnGreeting)("Adios Mundo!"); // Mostrará el mensaje del módulo GreetingsWithLength_module es Hola Mundo!. Contiene 5 caracteres de longitud.
