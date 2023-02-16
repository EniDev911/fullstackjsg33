// Crear una clase de objeto ES5 y ES6

// ECMAScript 5:

let Persona = function Persona(nombre, apellido) {
  this.nombre = nombre;
  this.apellido = apellido;
};

Persona.prototype.genero = function (genero) {
  // return genero;
  return (this.genero = genero);
};

Persona.prototype.email = function () {
  return (
    this.nombre.toLowerCase() +
    this.apellido.charAt(0).toUpperCase() +
    this.apellido.slice(1) +
    "@email.com"
  );
};

Persona.prototype.saludar = function () {
  return "Hola soy " + this.nombre + " " + this.apellido;
};

let marco = new Persona("Marco", "Contreras");
console.log(marco.saludar());
console.log(marco.email());
console.log(marco.genero("masculino"));

let daniela = new Persona("Daniela", "Ramirez");
console.log(daniela.saludar());
console.log(daniela.email());
console.log(daniela.genero("femenino"));

// ECMAScript 6
