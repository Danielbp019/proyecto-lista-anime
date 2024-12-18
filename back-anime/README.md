<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

-   [Simple, fast routing engine](https://laravel.com/docs/routing).
-   [Powerful dependency injection container](https://laravel.com/docs/container).
-   Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
-   Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
-   Database agnostic [schema migrations](https://laravel.com/docs/migrations).
-   [Robust background job processing](https://laravel.com/docs/queues).
-   [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

# Instrucciones

## 💿 Instalación

Teniendo composer instalado y php en el equipo:

1. Se importan los paquetes.

```sh
composer install
```

2. Realiza una copia de .env example, recombra la copia para que se llame ".env" y configura tus variables.

3. Generar una nueva clave de aplicacion:

```sh
php artisan key:generate
```

4. Activar las migraciones (Asegurate de tener una db disponible), por defecto se usa sqlite:

```sh
php artisan migrate
```

5. Levantar el servidor:

```sh
php artisan serve
```

## 💡 Rutas

CRUD anime:

```sh
GET:    http://localhost:8000/api/animes
POST:   http://localhost:8000/api/animes
PUT:    http://localhost:8000/api/animes/1/
DELETE: http://localhost:8000/api/animes/1
```

Subir un archivo csv:

```sh
POST:   http://localhost:8000/api/excelcsv
```

Bajar lista (El {id} es un placeholder, pero no se usará en esta función realmente):

```sh
GET:    http://localhost:8000/api/excelcsv/{id}
```

Borra toda la informacion de la tabla animes:

```sh
DELETE: http://localhost:8000/api/excelcsv/{id}
```

Registro con sactum y uuid ( La contraseña debe tener al menos dos letras mayúsculas, dos letras minúsculas, dos números y una longitud mínima de 12 caracteres):

```sh
POST:   http://localhost:8000/api/register
```

Login y logout:

```sh
POST    http://localhost:8000/api/login
POST    http://localhost:8000/api/logout
```

Ejecución de pruebas (Las pruebas suelen crean archivos en la carpeta storage/app que son desechables):

```sh
php artisan test
```

## 📑 Notas:

Limpiar la cache de los providers:

```sh
composer dump-autoload
```

Limpiar todo:

```sh
php artisan optimize:clear
```

### Consideraciones

La tabla "personal_access_tokens" necesita un vaciado cada cierto tiempo por acumulación de historial.
