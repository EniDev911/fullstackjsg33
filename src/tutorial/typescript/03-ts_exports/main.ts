import { returnGreeting } from "./greetings_module";
import * as allGreetingFuntions from "./greetings_module";
import { returnGreeting as returnGreetingLength } from "./greetings-utilities_module";

returnGreeting("Hola!"); // Mostrará el mensaje del módulo Greetings_module es Hola!
allGreetingFuntions.returnGreeting("Hola Mundo!"); // Mostrará el mensaje del módulo Greetings_module es Hola Mundo!
returnGreetingLength("Adios Mundo!"); // Mostrará el mensaje del módulo GreetingsWithLength_module es Hola Mundo!. Contiene 5 caracteres de longitud.
