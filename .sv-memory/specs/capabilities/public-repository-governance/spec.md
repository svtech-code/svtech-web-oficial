# public-repository-governance Specification

## Requirements

### Requirement: Dependency update automation MUST cover the Bun project and GitHub Actions.

#### Scenario: Scheduled dependency updates run
- **GIVEN** Dependabot is enabled in repository settings
- **WHEN** the configured weekly schedules arrive
- **THEN** it checks Bun dependencies and GitHub Actions versions for updates.

### Requirement: Public website changes MUST have clear maintainer ownership and contribution guidance.

#### Scenario: A pull request changes website files
- **GIVEN** a pull request targets the public website repository
- **WHEN** GitHub reads the repository governance files
- **THEN** `.github/CODEOWNERS` identifies `@msandoval-93` as the default owner
- **AND** bilingual contribution and pull-request guidance describes the project's actual Bun-based checks.

### Requirement: Public website changes MUST pass automated quality checks in CI.

#### Scenario: A pull request or main-branch push is opened
- **GIVEN** the CI workflow runs
- **WHEN** dependencies are installed from the Bun lockfile
- **THEN** lint, formatting validation, and production build checks run with read-only repository permissions.

### Requirement: SV-Memory security policy contact details MUST match the official email.

#### Scenario: A reporter reads either SV-Memory security policy
- **GIVEN** the English or Spanish security policy is opened
- **WHEN** contact instructions are displayed
- **THEN** the email address is `contacto@svtech.cl`
- **AND** all other content and CODEOWNERS ownership are preserved.

### Requirement: Security vulnerability reports MUST have a private reporting path and the current contact.

#### Scenario: A reporter finds a security issue in the website
- **GIVEN** a reporter needs to disclose a vulnerability
- **WHEN** they consult the security policy in either supported language
- **THEN** the policy directs them to a private GitHub Security Advisory or `contacto@svtech.cl`
- **AND** states the 48-hour acknowledgment target.

### Requirement: The website repository MUST NOT claim an unprovided MIT license.

#### Scenario: A reader checks the repository license statement
- **GIVEN** the repository does not grant an open-source license
- **WHEN** the README is read
- **THEN** it does not claim the project is MIT-licensed and no LICENSE file is added.