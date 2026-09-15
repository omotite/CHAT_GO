# Contributing to CHAT GO

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Push to your fork
6. Create a Pull Request

## Development Setup

```bash
npm install
cp .env.example .env.local
# Configure with your Supabase credentials
npm run dev
```

## Code Style

- Use TypeScript for type safety
- Follow ESLint rules (run `npm run lint`)
- Format with Prettier (run `npm run format`)
- Use meaningful commit messages

## Commit Format

```
[type]: Brief description

Optional detailed explanation

Types: feat, fix, docs, style, refactor, test, chore
```

Example:
```
feat: Add emoji reactions to messages

Implement emoji picker and reaction storage
in Supabase database.
```

## Pull Request Process

1. Update tests if applicable
2. Update documentation
3. Describe changes clearly
4. Reference related issues
5. Wait for review

## Testing

```bash
npm run test          # Run tests
npm run test:watch    # Watch mode
```

## Documentation

Update docs for:
- New features
- API changes
- Configuration options
- Deployment procedures

## Performance

- Keep bundle size minimal
- Optimize images
- Lazy load routes
- Use efficient queries

## Security

- Don't commit secrets
- Validate all inputs
- Follow OWASP guidelines
- Report vulnerabilities privately

## Questions?

Open a GitHub Discussion or email support@chatgo.net

Thank you for contributing! 🙏
