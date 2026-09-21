<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## API del MVP

Base URL local:

```text
http://localhost:3000
```

Las rutas protegidas requieren el header:

```http
Authorization: Bearer <accessToken>
```

Los cuerpos deben enviarse como JSON con:

```http
Content-Type: application/json
```

## Flujo de autenticación

### Registrar usuario

```http
POST /auth/register
```

Body:

```json
{
  "email": "cliente@correo.com",
  "password": "Cliente1234!"
}
```

La cuenta se crea con:

```text
estado: PENDING
rol: CLIENT
```

Mientras esté pendiente, el usuario no puede iniciar sesión.

Respuesta `201`:

```json
{
  "message": "Registro exitoso. Tu cuenta está pendiente de aprobación.",
  "user": {
    "id": 2,
    "email": "cliente@correo.com",
    "estado": "PENDING"
  }
}
```

### Iniciar sesión

```http
POST /auth/login
```

Body:

```json
{
  "email": "cliente@correo.com",
  "password": "Cliente1234!"
}
```

Respuesta `201`:

```json
{
  "accessToken": "<jwt>",
  "user": {
    "id": 2,
    "email": "cliente@correo.com",
    "rol": "CLIENT",
    "estado": "ACTIVE",
    "perfilCompleto": false
  }
}
```

Guarda `accessToken` y envíalo en las rutas protegidas. Una cuenta `PENDING` o `REJECTED` recibe `401`.

El administrador inicial es:

```text
email: admin@tienda.local
password: Admin1234!
```

## Usuarios y perfiles

### Listar solicitudes pendientes

```http
GET /users/pending
```

Requiere JWT de un usuario con rol `ADMIN`.

### Activar usuario y asignar rol

```http
PATCH /users/:id/activate
```

Requiere JWT de administrador.

Body:

```json
{
  "rol": "CLIENT"
}
```

Roles válidos:

```text
CLIENT
ADMIN
```

La cuenta pasa de `PENDING` a `ACTIVE`.

### Listar clientes activos

```http
GET /users/clients
```

Requiere JWT de administrador.

### Consultar perfil propio

```http
GET /users/profile
```

Requiere JWT. El backend obtiene el usuario desde el token.

### Actualizar perfil propio

```http
PATCH /users/profile
```

Requiere JWT. No se envía el ID del usuario.

Body:

```json
{
  "nombre": "Ana",
  "apellido": "Gómez",
  "tipoDocumento": "CC",
  "numeroDocumento": "123456789",
  "email": "ana@correo.com",
  "telefono": "3000000000",
  "direccion": "Calle 1 # 2-3"
}
```

## Productos

### Listar productos disponibles

```http
GET /products
```

Requiere JWT. Devuelve únicamente productos activos con stock mayor que cero.

Respuesta:

```json
{
  "id": 1,
  "nombre": "Café especial",
  "descripcion": "Café de origen",
  "precio": 1500,
  "stock": 10
}
```

Este endpoint no devuelve el campo `activo` porque todos los resultados ya están activos.

### Listar todos los productos

```http
GET /products/all
```

Requiere JWT de administrador. Devuelve productos activos, inactivos, con stock o sin stock.

### Crear producto

```http
POST /products
```

Requiere JWT de administrador.

Body:

```json
{
  "nombre": "Café especial",
  "descripcion": "Café de origen",
  "precio": 1500,
  "stock": 10
}
```

Validaciones:

- `nombre`: obligatorio.
- `descripcion`: opcional.
- `precio`: numérico y mayor que `0`.
- `stock`: entero mayor o igual que `0`.

### Actualizar producto

```http
PATCH /products/:id
```

Requiere JWT de administrador.

Body parcial:

```json
{
  "precio": 1750,
  "stock": 8,
  "activo": true
}
```

Los campos omitidos conservan su valor actual. Los cambios aparecen inmediatamente en `GET /products`.

## Ventas

Todas las rutas de ventas requieren JWT.

### Crear compra

```http
POST /sales
```

El usuario comprador se obtiene del JWT. No se envía `idUsuario` en el body.

Body:

```json
{
  "detalles": [
    {
      "idProducto": 1,
      "cantidad": 2
    }
  ]
}
```

El backend valida usuario activo, perfil completo, producto existente, producto activo y stock suficiente. Después calcula subtotales, total y descuenta el inventario dentro de una transacción atómica.

### Listar ventas

```http
GET /sales
```

- `ADMIN`: recibe todas las ventas.
- `CLIENT`: recibe únicamente sus propias ventas.

### Consultar una venta con detalles

```http
GET /sales/:id
```

La respuesta incluye fecha, total, usuario, productos, cantidades, precios unitarios y subtotales. Un cliente no puede consultar una venta de otro usuario.

## Respuestas y errores

Errores frecuentes:

| Código | Significado |
|---|---|
| `400` | Datos inválidos, stock insuficiente o perfil incompleto |
| `401` | Token faltante/inválido o cuenta no activa |
| `403` | No tiene permisos de administrador |
| `404` | Recurso no encontrado |
| `409` | Correo o nombre duplicado |

## Orden recomendado para integrar el frontend

1. Registrar usuario con `POST /auth/register`.
2. Iniciar sesión como administrador.
3. Consultar `GET /users/pending`.
4. Activar el usuario con `PATCH /users/:id/activate`.
5. Iniciar sesión con el usuario activado.
6. Completar `PATCH /users/profile`.
7. Consultar `GET /products`.
8. Crear una compra con `POST /sales`.
9. Consultar las compras con `GET /sales` o `GET /sales/:id`.

El registro se realiza únicamente mediante `POST /auth/register`. No existe `POST /users`.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
