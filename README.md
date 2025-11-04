# Nexus CLI

A simple and powerful CLI tool for generating projects and components for the **Nexus** framework.

This CLI helps you bootstrap new Nexus projects and manage your architecture (`Layers`, `Events`, `Services`) as your application grows.

## Features

* **Project Bootstrapping:** Create a new Nexus project with all TypeScript configuration and folder structures ready to go.

* **Component Scaffolding:** Quickly generate boilerplate files for `Layers`, `Events`, and `Services`.

* **Smart Configuration:** Reads a `nexus.config.json` in your project root to know where to place new files.

* **Always Up-to-Date:** Automatically fetches the latest versions of `@prism-dev/nexus`, `typescript`, and `@types/node` from the NPM registry when creating a new project.

* **Update Notifier:** Notifies you when a new version of the CLI itself is available.

## Installation

To use the CLI globally, install it using `npm`:

```bash
npm install -g @prism-dev/nexus-cli
```

## Usage

The main command is `nexus`. You can see all available commands by running:

```bash
nexus --help
```

## Commands

### Create a New Project

This command generates a complete, ready-to-run project structure.

```bash
nexus create:project <project-name>

# Alias:
nexus cp <project-name>
```

**Example:** `nexus create:project my-app`

This will create a new folder `my-app/` with the following structure:

```
my-app/
├── .gitignore
├── nexus.config.json
├── package.json
├── tsconfig.json
└── Source/
    ├── main.ts
    ├── Events/
    │   └── .gitkeep
    ├── Layers/
    │   └── MyLayer.ts
    └── Services/
        └── .gitkeep
```

The generated `package.json` will already include the latest versions of `@prism-dev/nexus` and its development dependencies.

### Scaffolding Components

These commands are used *inside* an existing Nexus project. They will read your `nexus.config.json` to determine where to place the files.

#### Create a Layer

```bash
nexus create:layer <LayerName>

# Alias:
nexus cl <LayerName>
```

**Example:** `nexus cl HttpLayer`

This will create `Source/Layers/HttpLayer.ts` (based on the default config).

#### Create an Event

```bash
nexus create:event <EventName>

# Alias:
nexus ce <EventName>
```

**Example:** `nexus ce UserRegisteredEvent`

This will create `Source/Events/UserRegisteredEvent.ts`.

#### Create a Service

```bash
nexus create:service <ServiceName>

# Alias:
nexus cs <ServiceName>
```

**Example:** `nexus cs DatabaseService`

This will create `Source/Services/DatabaseService.ts`.

## Configuration (`nexus.config.json`)

When you run the `create:layer`, `create:event`, or `create:service` commands, the CLI will look for a `nexus.config.json` file in the current directory.

If not found, it will use these defaults:

`nexus.config.json` **(Default)**

```json
{
  "paths": {
    "layers": "Source/Layers",
    "events": "Source/Events",
    "services": "Source/Services"
  }
}
```

You can customize this file. For example, if you prefer to have your services in an `App/Infrastructure/` folder, you can change it:

`nexus.config.json` **(Custom)**

```json
{
  "paths": {
    "layers": "Source/Application/Layers",
    "events": "Source/Application/Events",
    "services": "Source/Infrastructure/Services"
  }
}
```

Now, running `nexus cs DatabaseService` will create the file at `Source/Infrastructure/Services/DatabaseService.ts`.

## License

MIT