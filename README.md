# Nexus CLI

![Nexus. The composable backend. Build with intention](Assets/Nexus%20-%20Card.png "Nexus Banner")

A simple and powerful CLI tool for generating projects and components for the **Nexus** framework.

Bootstrap a new Nexus project in seconds, then keep your architecture clean as it grows. Generate `Layers`, `Events`, and `Services` without ever writing boilerplate by hand.

## Features

* **Project Bootstrapping:** Scaffold a complete, TypeScript-ready Nexus project with a single command, including sensible defaults and a starter `EventType.ts`.

* **Built-in Test Suite:** Every generated project ships with [Jest](https://jestjs.io/) + [ts-jest](https://kulshekhar.github.io/ts-jest/) pre-configured and a matching `Tests/` directory that mirrors your `Source/` layout.

* **Component Scaffolding:** Generate boilerplate for `Layers`, `Events`, and `Services` that are compatible with the latest Nexus architecture.

* **Smart Configuration:** Reads `nexus.config.json` in your project root to know exactly where to place new files.

* **Always Up-to-Date:** Automatically resolves the latest versions of `@prism-dev/nexus`, `typescript`, `jest`, `ts-jest`, and related types from the NPM registry at project creation time.

* **Update Notifier:** Lets you know when a new version of the CLI itself is available.

## Installation

Install the CLI globally via `npm`:

```bash
npm install -g @prism-dev/nexus-cli
```

## Usage

The main command is `nexus`. See all available commands at any time:

```bash
nexus --help
```

## Commands

### Create a New Project

Generates a complete, ready-to-run project structure with TypeScript config, a Jest test suite, and a starter `EventType.ts`.

```bash
nexus create:project <project-name>

# Alias:
nexus cp <project-name>
```

**Example:** `nexus create:project my-app`

This creates a `my-app/` folder with the following layout:

```
my-app/
├── .gitignore
├── jest.config.js
├── nexus.config.json
├── package.json
├── tsconfig.json
├── tsconfig.test.json
├── Source/
│   ├── main.ts
│   ├── Events/
│   │   ├── MyEvent.ts
│   │   └── Types/
│   │       └── EventType.ts
│   ├── Layers/
│   │   └── MyLayer.ts
│   └── Services/
│       └── MyService.ts
└── Tests/
    ├── Events/
    │   └── MyEvent.test.ts
    ├── Layers/
    │   └── MyLayer.test.ts
    ├── Services/
    │   └── MyService.test.ts
    └── tsconfig.json
```

The generated `package.json` includes the latest compatible versions of `@prism-dev/nexus`, `jest`, `ts-jest`, and all required TypeScript dev dependencies. No manual version pinning needed.

### Scaffolding Components

These commands work inside an existing Nexus project and read `nexus.config.json` to determine where to place files.

> **Note:** The generator automatically appends the component type (`Layer`, `Event`, `Service`) to the name you provide.

#### Create a Layer

```bash
nexus create:layer <LayerName>

# Alias:
nexus cl <LayerName>
```

**Example:** `nexus cl Http` creates `Source/Layers/HttpLayer.ts` with the `HttpLayer` class.

#### Create an Event

```bash
nexus create:event <EventName>

# Alias:
nexus ce <EventName>
```

**Example:** `nexus ce UserRegistered` creates `Source/Events/UserRegisteredEvent.ts` with the `UserRegisteredEvent` class.

#### Create a Service

```bash
nexus create:service <ServiceName>

# Alias:
nexus cs <ServiceName>
```

**Example:** `nexus cs Database` creates `Source/Services/DatabaseService.ts` with the `DatabaseService` class, implementing `OnInitialize` and `OnShutdown`.

## Configuration (`nexus.config.json`)

The scaffolding commands look for a `nexus.config.json` in the current directory. If none is found, these defaults are used:

```json
{
  "paths": {
    "layers": "Source/Layers",
    "events": "Source/Events",
    "services": "Source/Services"
  }
}
```

You can point any path to a custom location. For example:

```json
{
  "paths": {
    "layers": "Source/Application/Layers",
    "events": "Source/Application/Events",
    "services": "Source/Infrastructure/Services"
  }
}
```

Running `nexus cs Database` after this change will place the file at `Source/Infrastructure/Services/DatabaseService.ts`.

## License

MIT
