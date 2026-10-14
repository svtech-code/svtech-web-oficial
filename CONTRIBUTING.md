# Contributing to SV Tech Web Oficial

Thank you for your interest in contributing. This guide describes the workflow
and checks for changes to the public website.

> **Language:** English | [Español](CONTRIBUTING_ES.md)

## Branching and pull requests

1. Create a descriptive branch from `main`, for example `feat/contact-form` or
   `fix/mobile-navigation`.
2. Make focused changes and open a pull request targeting `main`. Contributors
   without write access can fork the repository and open a pull request from
   their fork.
3. Describe the change and its user impact in the pull request. Address review
   feedback and keep the automated checks passing.

## Development setup

Use Bun, the package manager and lockfile used by this repository:

```sh
bun install --frozen-lockfile
```

Set up local environment variables by copying `.env.example` to `.env` and adding
your own values. Never commit `.env` files or real credentials.

## Checks before opening a pull request

```sh
bun run lint
bun run build
```

The CI workflow runs these checks on pull requests and pushes to `main`, and
checks formatting for the repository's governance documents.

## Commit messages

Use Conventional Commits with a concise English description, for example:

- `fix(contact): validate Turnstile response`
- `docs(security): clarify vulnerability reporting`
