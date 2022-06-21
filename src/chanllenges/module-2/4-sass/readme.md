## Desafío 4 - Sass

[Ver en github-pages](https://enidev911.github.io/fullstackjsg33/src/challenges/module-2/4-sass/bs-card-sass/)


Instalar sass de manera global a través de npm  

```bash
npm install -g sass
```

Archivo que modifica bootstrap `main.scss` y ejecutar el siguiente comando:  

```bash
sass -w assets/sass/main.scss:assets/css/main.min.css -t compressed
```