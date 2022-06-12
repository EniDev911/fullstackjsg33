## fullstackjsg33

[Ver en github-pages](https://enidev911.github.io/fullstackjsg33/)


Instalar sass de manera global a través de npm  

```bash
npm install -g sass
```

Modificar el archivo `custom_bootstrap.scss` y compilar con el siguiente comando:  

```bash
sass -w src/public/sass/custom_bootstrap.scss src/public/css/bootstrap.min.css --style compressed
```
