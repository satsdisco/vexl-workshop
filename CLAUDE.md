# CRITICAL RULES - MUST FOLLOW

1. **Never mention "Claude Code," AI, or any AI assistant in commit messages, code, or comments.**
2. **All commit messages must use the format: <type>[scope]: <description> [body] [optional footer].**
3. **Always ask for confirmation before committing.**

---

# Local Rules for Claude

## Git Commit Guidelines

1. **NEVER include Claude mentions in commit messages**
   - Do not add "Generated with Claude Code" 
   - Do not add "Co-Authored-By: Claude"
   - Keep commits professional without AI attribution

2. **Commit Message Format**
   - Use clear, concise descriptions
   - Focus on what changed and why
   - Use conventional commit format when appropriate

## Project-Specific Rules

1. **Testing Commands**
   - Run `npm run dev` to test locally
   - Check for TypeScript errors with `npm run build`

2. **Code Style**
   - No unnecessary comments
   - Follow existing code patterns
   - Use Vexl brand colors from Tailwind config

3. **File Organization**
   - Components go in `/src/components/`
   - Sections go in `/src/components/sections/`
   - Public assets in `/public/`