- [grilla](#grid)
- [colores](#colors)


### <a name="colors"></a>Sistema grid:

Bootstrap utiliza el sistema de 12 columnas, con cinco niveles de respuesta predetrminados. 

Esta construido con [`flexbox`](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) y es totalmente responsivo.

Ejemplo:  


```html
<div class="container">
  <div class="row">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>
</div>
```

Este ejemplo crea tres columnas de igual ancho en dispositivos pequeños, medianos, grandes y extragrandes.


##<a name="responsive-container"> Contenedores Responsivo:  

Los contenedores responsive son nuevos a partir de bootstrap v4.4. Le permiten especificar una clase que tiene un 100% de ancho hasta que se alcanza un punto de interrupción especificado, después de lo cual se aplica `max-width` para cada uno de los puntos de interrupción. más altos. Por ejemplo `.container-sm` tiene un 100% de ancho para comenzar hasta que `sm` alcanza el punto de interrupción, donde se ampliará coj `md`, `lg` y `xl`.  

Dado que bootstrap está desarrollado para ser móvil primero, se usan una variedad de [`media queries`](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) para establecer los puntos de interrupción sensibles para los diseños e interfaces. Estos puntos de interrupción se basan principalmente en anchos mínimos de ventana gráfica y nos permiten la escala de los elementos a medida que cambia la ventana gráfica (viewport).  

Bootrap utiliza principalmente los siguientes rangos de media queriesm o puntos de interrupción.  

```css
// Dispositivos extra pequeños (menor que 576px)
// No hay media querie para `xs` ya que este es el valor predetrminado en Bootstrap

// Dispositivos pequeños (desde 576px hacia arriba)
@media (min-width: 576px) { ... }

// Dispositivos medianos (tablets, desde 768px hacia arriba)
@media (min-width: 768px) { ... }

// Dispositivos grandes (pantallas con resolución desde 992px hacia arriba)
@media (min-width: 992px) { ... }

// Dispositivos extra grandes (pantallas cpm resolución desde 1200px hacia arriba)
@media (min-width: 1200px) { ... }
```

Dado que el CSS de bootstrap es de origen SASS, todas las media queries están disponibles a través de SASS mixins:  

```css
// No es necesario un media query para `xs` ya que es efectivamente `@media (min-width: 0) { ... }`
@include media-breakpoint-up(sm) { ... }
@include media-breakpoint-up(md) { ... }
@include media-breakpoint-up(lg) { ... }
@include media-breakpoint-up(xl) { ... }

// Ejemplo: Ocultar comenzando en `min-width: 0`, y luego mostrar en el punto de interrupción `sm`.
.custom-class {
  display: none;
}
@include media-breakpoint-up(sm) {
  .custom-class {
    display: block;
  }
}
```

Ocasionalmente bootstrap usa media queries que van en la otra dirección (el tamaño de pantalla dado o más pequeño)

```css
// Extra small devices (portrait phones, less than 576px)
@media (max-width: 575.98px) { ... }

// Small devices (landscape phones, less than 768px)
@media (max-width: 767.98px) { ... }

// Medium devices (tablets, less than 992px)
@media (max-width: 991.98px) { ... }

// Large devices (desktops, less than 1200px)
@media (max-width: 1199.98px) { ... }

// Dispositivos extra grandes 
// Sin media queries ya que el punto de interrupción extra grande no tiene límite superior a su ancho
```

### <a name="colors"></a>Colores:

- `text-reset`
- `text-muted`


### <a name="transorm"></a>Transformar texto:  

- `text-lowercase`: minúscula
- `text-uppercase`: mayúscula
- `text-capitalize` : primera letra en mayúscula
- `word-wrap`: salto de línea
- `text-nowrap`: el texto desborda al padre

### <a name="transorm"></a>Alineación:

- `text-left`: alinea a la izquierda de su contenedor.
- `text-center`: alinea al centro de su contenedor.
- `text-right`: alinea a la derecha de su contenedor.


- `text-sm-left`: alinea a la izquierda de su contenedor.




### <a name="w&i"></a>Peso y cursiva:  

- `font-weight-bold`
- `font-weight-bolder`
- `font-weight-normal`
- `font-weight-light`
- `font-weight-lighter`
- `font-italic`

### <a name="w&i"></a>Cambiar fuente:

- `text-monospace`

### <a name="w&i"></a>Quitar subrayado:

- `text-decoration-none`

---

### Bordes 

- `border border-primary`
- `border border-secondary`
- `border border-success`
- `border border-danger`
- `border border-warning`
- `border border-info`
- `border border-light`
- `border border-dark`
- `border border-white`

**Radios**  


- `rounded`
- `rounded-top`
- `rounded-right`
- `rounded-bottom`
- `rounded-left`
- `rounded-circle`
- `rounded-pill`
- `rounded-0`



### <a name="extras"></a>Extras

HTML5 agrega un nuevo atributo global llamado [hidden\], que tiene el estilo `display:none` predeterminado. bootstrap mejora este valor predeterminado por un `[hidden] {display:none !important;}` para ayudar a evitar que `display` se anule accidentalmente. Si bien IE10 no lo admite de forma nativa, la declaración explícita en el CSS soluciona ese problema:  

```html
<input type="text" hidden>
```

>Incompatibilidad JQuery  
>[hidden] no es compatible con los métodos `$(..).hide()` y `$(...).show()` de Jquery. Por lo tanto, actualmente no funciona si usas estos métodos si incluyes bootstrap.

### Cards

Una `card` es un contenedor flexible y extensible. Incluye opciones para encabezados y pies de página, una amplia variedad de contenido, colores de fondo contextuales y potentes opciones de visualización. Si está familiarizado con Bootstrap3, las tarjetas reemplazan a los viejos paneles, pozos y miniaturas. Una funcionalidad similar a esos componentes está disponible como clases de modificadores para tarjetas.

#### Ejemplos  

Las tarjetas se construyen con la menor cantidad de marcas y estilos posibles, pero aun así logran ofrecer una tonelada de control y personalización. Construidos con flexbox, ofrecen una fácil alineación y se combinan bien con otros componentes de Bootstrap. No tienen `margin` por defecto, así que  puede usar las utilidades de espaciado según sea necesario. 

Para crear una tarjeta básica con contenido mixto y un ancho fijo. Las tarjetas no tienen un ancho fijo para comenzar, por lo que naturalmente llenarán todo el ancho de su padre. Esto se puede personalizar fácilmente con las opciones de tamaño Ej: `col-sm-6` , `w-75`


```html
<div class="card w-75">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Button</a>
  </div>
</div>

<div class="card w-50 text-center">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Button</a>
  </div>
</div>
```

Ejemplo con una imagen.  

```html
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

#### Dimensionamiento  

Las tarjetas no asumen un `width` de inicio específico, por lo que tendrán un 100% de ancho a menos que se indique lo contrario. Puede cambiar esto según sea necesario con CSS personalizado, clases de cuadrícula, mixins Sass de cuadrícula o utilidades.  

```html
<div class="row">
  <!-- col-6 -->
  <div class="col-sm-6">
    <!-- card -->
    <div class="card">
      <!-- body card -->
      <div class="card-body">
        <h5 class="card-title">Special title</h5>
        <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis odit eue mollitia maxime ipsam, reprehenderit earum magni est incidunt ab aut! Vitae nemo quis commodi voluptates amet unde inventore aliquam!</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <!-- col-6 -->
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title</h5>
        <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis odit eue mollitia maxime ipsam, reprehenderit earum magni est incidunt ab aut! Vitae nemo quis commodi voluptates amet unde inventore aliquam!</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</div>
```


#### Navegación en una card

Agregar una navegación al encabezado (o bloque) de una tarjeta con los componentes de navegación de Bootstrap.  


```html
<div class="card text-center">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <a class="nav-link active" href="#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled">Disabled</a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```


#### Superposiciones de imágenes  

Convierta una imagen en un fondo de tarjeta y superponga el texto de su tarjeta. Dependiendo de la imagen, es posible que necesite o no estilos o utilidades adicionales.  

```html
<div class="card bg-dark text-white">
  <img src="..." class="card-img" alt="...">
  <div class="card-img-overlay">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text">Last updated 3 mins ago</p>
  </div>
</div>
```
>Tener en cuenta el contenido no debe ser más grande que la altura de la imagen.


#### Horizontal  

Usando una combinación de cuadrícula y clases de servicios públicos, las tarjetas se pueden hacer horizontales de una manera receptiva y compatible