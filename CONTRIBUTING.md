# Contributing to PMPath

Thanks for wanting to help improve PMPath! To keep contributions smooth, follow these steps:

1. **Discuss big changes first.** Open an issue to describe the bugfix or feature so maintainers can provide feedback before you start coding.
2. **Follow existing patterns.** The project uses Next.js 16, Tailwind utilities, and React client components. Mirror the folder structure in `app/` and prefer the same styling conventions.
3. **Keep the code clean.** Run formatting/linting before submitting. If you touch TypeScript files, run `pnpm lint` (or the equivalent) and address the reported issues.
4. **Write tests for regressions** when applicable. Use Vitest for unit logic under `tests/`.
5. **Use descriptive commit messages.** Reference the issue number and keep them concise (e.g., `feat(auth): add validation to signup step`).
6. **Update docs.** If your change affects user-facing behavior, document it in `README.md` or add a note to the `CHANGELOG` (if present).

### Pull Requests
- Target the `main` branch unless otherwise noted in the issue.
- Include screenshots or reproduction steps when fixing visual issues.
- Ensure CI passes before requesting review.

Thanks again for improving PMPath.
