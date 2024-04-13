# Clase Programacion III.
Trabajo de clases - Programacion III 2024.
## Tabla de contenidos
- [Inicio de proyecto clonado](#inicio-de-proyecto-clonado)

- [Creacion proyecto NPM con Eslint desde cero](#Creacion-proyecto-NPM-con-Eslint-desde-cero)

- [Comandos Utiles](#comandos-utiles)

## Inicio de proyecto clonado

Instalación de dependencias.

```
npm install
```

## *Creacion proyecto NPM con Eslint desde cero*

**Paso 1.**

Iniciar proyecto npm:

```
npm init -y
```
**Paso 2.**

Instalar eslint como dependencia de desarrollo del proyecto

```
npm install eslint -D
```

**Paso 3.**

Iniciar configuracion de eslint 

```
npm init @eslint/config
```
[https://www.npmjs.com/package/eslint#installation-and-usage](# "https://www.npmjs.com/package/eslint#installation-and-usage")

**Paso 4.**

Crear scripts en package.json

```
"scripts": {
    "lint": "eslint .",
    "fix": "eslint . --fix"
  },
```

**Paso 5**

Instalar en visual studio code "Eslint" y "Error Lens"

## *Comandos utiles*
 
Ejecutar eslint
```
npm run lint
```

Corregir errores:
```
npm run fix
```