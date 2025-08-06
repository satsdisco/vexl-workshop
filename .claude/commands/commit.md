# Git Commit Instructions

## CRITICAL RULES:

1. **Never include "Claude Code" or AI attribution in any commit message.**
2. **Always follow the approved commit format.**
3. **Ask the user for confirmation before any git commit.**

## Commit Message Format:

```
<type>[scope]: <description>

[body]

[optional footer]
```

### Types:
- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests or correcting existing tests
- chore: Changes to the build process or auxiliary tools

### Examples:
```
feat[auth]: add user login functionality

Implemented JWT-based authentication with secure token storage.
Added login form validation and error handling.

Closes #123
```

```
fix[ui]: correct button alignment on mobile devices
```

## Before Committing:

1. Always run `git status` to review changes
2. Ensure all files are properly staged
3. Ask user: "Ready to commit with message: [show message]? (yes/no)"
4. Only proceed with commit after explicit confirmation