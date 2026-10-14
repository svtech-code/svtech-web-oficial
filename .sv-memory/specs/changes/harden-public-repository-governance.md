# Add governance and security baseline for public repositories

- **ID:** `3b939f72829b4b7f`
- **Slug:** `harden-public-repository-governance`
- **Status:** `applied`
- **Where:** `.github/,README.md,SECURITY.md,SECURITY_ES.md,CONTRIBUTING.md,CONTRIBUTING_ES.md,sv-memory/SECURITY.md,sv-memory/SECURITY_ES.md`
- **Capability:** `public-repository-governance`
- **Created:** 2026-10-14T00:06:46-03:00

## Proposal

Add maintainer ownership, security disclosure guidance, contribution workflow, pull request template, Dependabot updates, and a least-privilege CI workflow to svtech-web-oficial. Remove the README's unsupported MIT license claim without adding a license file. Update only the security contact email in both language variants in sv-memory; preserve its existing CODEOWNERS and unrelated working-tree changes. GitHub repository settings remain a manual owner task.

## Goal

Establish repository-level security, contribution, dependency-update, and CI practices for the public SV Tech website, and align SV-Memory security-reporting email with the official contact.

## Design

Use @msandoval-93 as CODEOWNER. Keep bilingual policy/contribution docs consistent with sv-memory conventions. Use contacto@svtech.cl and retain the existing 48-hour acknowledgment target. Configure Dependabot for bun and GitHub Actions weekly updates. CI runs on pull requests and main pushes with contents:read and executes Bun frozen-lockfile install, lint, format:check, and build. Do not create a LICENSE; remove the README MIT assertion. Do not edit sv-memory CODEOWNERS or unrelated modified files.

## Tasks

- [x] Add CODEOWNERS, Dependabot, CI, security policy, contribution guides, and PR template to the website repository
- [x] Remove the unsupported MIT claim from the website README without adding a LICENSE
- [x] Change only the security email in sv-memory SECURITY.md and SECURITY_ES.md
- [x] Run relevant validation and inspect diffs in both repositories

## ADDED Requirements

### Requirement: Public website changes MUST have clear maintainer ownership and contribution guidance.

#### Scenario: A pull request changes website files
- **GIVEN** a pull request targets the public website repository
- **WHEN** GitHub reads the repository governance files
- **THEN** `.github/CODEOWNERS` identifies `@msandoval-93` as the default owner
- **AND** bilingual contribution and pull-request guidance describes the project's actual Bun-based checks.

### Requirement: Security vulnerability reports MUST have a private reporting path and the current contact.

#### Scenario: A reporter finds a security issue in the website
- **GIVEN** a reporter needs to disclose a vulnerability
- **WHEN** they consult the security policy in either supported language
- **THEN** the policy directs them to a private GitHub Security Advisory or `contacto@svtech.cl`
- **AND** states the 48-hour acknowledgment target.

### Requirement: Public website changes MUST pass automated quality checks in CI.

#### Scenario: A pull request or main-branch push is opened
- **GIVEN** the CI workflow runs
- **WHEN** dependencies are installed from the Bun lockfile
- **THEN** lint, formatting validation, and production build checks run with read-only repository permissions.

### Requirement: Dependency update automation MUST cover the Bun project and GitHub Actions.

#### Scenario: Scheduled dependency updates run
- **GIVEN** Dependabot is enabled in repository settings
- **WHEN** the configured weekly schedules arrive
- **THEN** it checks Bun dependencies and GitHub Actions versions for updates.

### Requirement: The website repository MUST NOT claim an unprovided MIT license.

#### Scenario: A reader checks the repository license statement
- **GIVEN** the repository does not grant an open-source license
- **WHEN** the README is read
- **THEN** it does not claim the project is MIT-licensed and no LICENSE file is added.

### Requirement: SV-Memory security policy contact details MUST match the official email.

#### Scenario: A reporter reads either SV-Memory security policy
- **GIVEN** the English or Spanish security policy is opened
- **WHEN** contact instructions are displayed
- **THEN** the email address is `contacto@svtech.cl`
- **AND** all other content and CODEOWNERS ownership are preserved.