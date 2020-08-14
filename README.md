## API Care: 
## Status code:

* 1.xx : Informational
* 2.xx : Succcess
* 200 : Success
* 201 : Created
* 204 : Not Created
* 3.xx : Redirection
* 304 : Not modified
* 4.xx : Client Error
* 400 : Bad request
* 401 : Unauthorized
* 403 : forbidden
* 404 : Not found
* 405 : Method not allowed 
* 429 : Too Many Requests
* 5.xx : Server Error
* 500 : Internal server error
* 501 : Not Implemented
* 502 : Bad Gateway
* 503 : Service Unavailable
* 504 : Gateway Timeout

## Diagrama de Comunicaciones

---
## Estructura de rutas por Roles

---

## Diagrama de entidad relación

---

## Estructura de Carpetas:
```
└── src
    ├── config
    ├── middleware
    ├── resources
    │   ├── admin
    │   │   ├── controllers
    │   │   └── __test__
    │   └── home
    │       ├── controllers
    │       └── __test__
    ├── services
    │   └── auth
    │       └── user
    │           ├── controllers
    │           └── models
    ├── __test__
    └── utils

```

## Estructura de Archivos:
```
├── ecosystem.config.js
├── jest.config.js
├── nodemon.json
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── config
│   │   ├── cluster.ts
│   │   ├── db.ts
│   │   ├── dev.ts
│   │   ├── index.ts
│   │   ├── prod.ts
│   │   └── testing.ts
│   ├── index.ts
│   ├── middleware
│   │   ├── error.ts
│   │   └── logger.ts
│   ├── resources
│   │   ├── admin
│   │   │   ├── admin.router.ts
│   │   │   ├── controllers
│   │   │   │   ├── admin.controllers.ts
│   │   │   │   └── index.ts
│   │   │   └── __test__
│   │   │       └── admin.spec.ts
│   │   └── home
│   │       ├── controllers
│   │       │   ├── home.controllers.ts
│   │       │   └── index.ts
│   │       ├── home.router.ts
│   │       └── __test__
│   │           └── home.spec.ts
│   ├── routing.ts
│   ├── server.ts
│   ├── services
│   │   └── auth
│   │       └── user
│   │           ├── controllers
│   │           │   ├── index.ts
│   │           │   ├── protect.ts
│   │           │   ├── signin.ts
│   │           │   └── signup.ts
│   │           ├── index.ts
│   │           └── models
│   │               ├── index.ts
│   │               └── user.model.ts
│   ├── __test__
│   │   └── server.spec.ts
│   └── utils
│       ├── catchAsync.ts
│       └── errorResponse.ts
├── test-db-setup.js
└── tsconfig.json
```
---

## Iniciar mongod:
```bash
$ mongod
```
## Iniciar app en modo 'development':
```bash
$ npm run dev
```

## Iniciar prueba de test unitarios:
```bash
$ npm run test
```
## Documentación:

### Tabla de contenidos
1. [Manejo de Errores con catchAsync](#manejo-de-errores-con-catchAsync)
1. [Mensaje de error por consola](#mensaje-de-error-por-consola)
1. [Modelos ](#modelos)
1. [Endpoints](#endpoints)


## Manejo de Errores con catchAsync
```js
// Msg: mensaje descriptivo sobre el controlador
// ErrorResponse(): Función personalizada que recibe tres parametros el cual captura el error.

const catchAsync = (msg, fn) => {
  return(req, res, next) => {
    fn(req, res, next).catch((err) => {
      ErrorResponse(err, msg, 500)
      next(err)
    })
  }
}
```
**[⬆ ir a tabla de contenidos](#tabla-de-contenidos)**

## Mensaje de error por consola
* **MSG**: Mensaje descriptivo donde se encuentra el error (msg pasado en catchAsync()).
* **DETAILS**: Detalles sobre el error.
* **FILENAME**: Nombre del archivo donde se encuentra el error.
* **PATH**: Ruta donde se encuentra el archivo

```js
    SUCCESS    : false
    SATUS CODE : 500
    MESSAGE    : <MSG>
    DETAILS    : <DETAILS>
    FILENAME   : <FILENAME>
    PATH       : <PATH>
    LINE       : <>

```
**[⬆ ir a tabla de contenidos](#tabla-de-contenidos)**

## Modelos
### User: Esquema general para los tipos de Usuarios definidos por sus roles.
* Roles: 
  - 1 : Super Admin
  - 2 : Admin
  - 3 : Teacher Director
  - 4 : Tutor
  - 5 : Other

```json
{
  User: {
    name:String,
    lastname:String,
    username:{
      type:String,
      unique:true,
      lowercase:true
    },
    password:String,
    rol:Number,
    createBy:[ObjectID]
  }
}
```
**[⬆ ir a tabla de contenidos](#tabla-de-contenidos)**

## Endpoints

### Signin:
```bash
POST:
  url: /signin
  data: username, password
```

### Signup:
```bash
POST:
  url: /signup
  data: username, password
```

### Home:
```bash
GET:
  url: /api/home
  headers: {
    "Authorization" : `Bearer ${token}`
  }
```
**[⬆ ir a tabla de contenidos](#tabla-de-contenidos)**