# Cómo contribuir a SV Tech Web Oficial

Gracias por tu interés en contribuir. Esta guía describe el flujo y las
verificaciones para proponer cambios al sitio público.

> **Idioma:** [English](CONTRIBUTING.md) | Español

## Ramas y pull requests

1. Crea una rama descriptiva desde `main`, por ejemplo `feat/contact-form` o
   `fix/mobile-navigation`.
2. Realiza cambios acotados y abre un pull request hacia `main`. Si no tienes
   acceso de escritura, puedes hacer un fork y abrir el pull request desde allí.
3. Describe el cambio y su impacto en el pull request. Atiende los comentarios
   de revisión y mantén los checks automatizados en verde.

## Preparar el entorno

Usa Bun, el gestor de paquetes y lockfile de este repositorio:

```sh
bun install --frozen-lockfile
```

Copia `.env.example` a `.env` y completa tus propios valores. Nunca subas
archivos `.env` ni credenciales reales.

## Verificaciones antes de abrir un pull request

```sh
bun run lint
bun run build
```

El workflow de CI ejecuta estas verificaciones en pull requests y en los push a
`main`, y valida el formato de los documentos de gobernanza del repositorio.

## Mensajes de commit

Usa Conventional Commits con una descripción breve en inglés, por ejemplo:

- `fix(contact): validate Turnstile response`
- `docs(security): clarify vulnerability reporting`
