# <%= projectName %>

> Scaffolded with [Nexus CLI](https://github.com/prism-coder/nexus-cli) v<%= currentVersion %>

## Getting started

Start the project in a single command:

```bash
npm start
```

This builds the project and runs the compiled output from `dist/`.

## Code scaffolding

Nexus CLI can generate layers, events, and services for you so you spend less time writing boilerplate. For example, to add a new layer:

```bash
# nexus create:layer|cl [options] <layer-name>
nexus create:layer Test
```

See everything that's available:

```bash
nexus --help
```

## Testing

The project ships with a [Jest](https://jestjs.io/) + [ts-jest](https://kulshekhar.github.io/ts-jest/) test suite ready to go. Test files live in `Tests/` and mirror the layout of `Source/`.

| Command | Description |
|---|---|
| `npm test` | Run the full test suite |
| `npm run test:verbose` | Detailed per-test output |
| `npm run test:watch` | Re-run tests on file changes |
| `npm run test:coverage` | Generate a coverage report |
| `npm run test:ci` | CI mode — no watch, strict snapshot checks |

## Building

Compile the project to JavaScript:

```bash
npm run build
```

Build artifacts are written to `dist/`. Use `npm run clean` to remove them.

## Additional Resources

- [Nexus CLI repository](https://github.com/prism-coder/nexus-cli): Full command reference and documentation.
- [Nexus repository](https://github.com/prism-coder/nexus): Full documentation on the framework.
