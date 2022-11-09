# afex-prueba

Sitio web en Vue3 y Firebase desarrollado por Damir Mandakovic como prueba técnica para proceso de selección Afex Chile
Vue3 and Firebase website developed by Damir Mandakovic for Afex Chile in recruitment process.

Demo: https://damirmandakovic-afex-prueba.netlify.app/

## Objetivos / Objectives

El sitio web tiene como objetivo permitirle al usuario agregar videos de youtube a una galería, manipulando la lista generada y con la posibilidad de revisar algunos de sus datos y ver los videos.

## Requisitos

- Vue3 (Composition API)
- Vite
- eslint

## Setup del proyecto

```sh
npm install
```

### Ejecución en local (desarrollo)

```sh
npm run dev
```

### Compilar y preparar para producción

```sh
npm run build
```

### Lint con [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Funcionamiento

Para agregar un nuevo video, se debe ingresar la dirección completa del video en Youtube, ya sea en formato www.youtube.com o youtu.be y hacer click en Añadir. Se notifica al usuario si se agregó correctamente el video a la lista:
![Captura de Pantalla 2022-11-08 a la(s) 21 44 06](https://user-images.githubusercontent.com/8379864/200708224-08640ba3-ad1d-414f-8729-c20a4bd24129.png)

Haciendo click en la miniatura del video, se abre un modal que permite ver el título del video y su descripción. Haciendo click en la imagen del video del modal, se puede ver el video sin salir del sitio web.
![Captura de Pantalla 2022-11-08 a la(s) 21 46 52](https://user-images.githubusercontent.com/8379864/200708540-d8441238-4374-44e7-bad5-42e4d21164c3.png)

Para eliminar un video, solo basta hacer click en la cruz de la miniatura en la galería.

Todos los modals son cerrables haciendo click en las cruces correspondientes o fuera del modal.
