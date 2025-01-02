## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Actualizar dependencias.

1. Instala npm-check-updates:

```sh
npm install -g npm-check-updates
```

2. Ejecuta npm-check-updates para ver qué dependencias pueden ser actualizadas:

```sh
ncu
```

3. Ejecuta npm-check-updates -u para actualizar las versiones en package.json:

```sh
ncu -u
```

4. Finalmente, ejecuta npm install para instalar las dependencias actualizadas:

```sh
npm install
```

## Notas

1. Almacenamiento del Token: Cuando el usuario inicia sesión, el token JWT se guarda tanto en el localStorage como en una cookie llamada auth_token.

2. Middleware: En el middleware de Next.js, se verifica la existencia de la cookie auth_token para determinar si el usuario está autenticado. Si la cookie no está presente, se redirige al usuario a la página de login.

3. Verificación en el Cliente: Además, en el DashboardLayout, se verifica el token almacenado en el localStorage para asegurar que el usuario esté autenticado antes de permitir el acceso al contenido del dashboard.

Al combinar el almacenamiento en cookies y localStorage, logramos una protección de rutas más robusta y aseguramos que solo los usuarios autenticados tengan acceso al dashboard.
