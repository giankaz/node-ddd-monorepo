# Entity Generator CLI

## Adding it:

- On the root of the project run the build command to build and install it as dev dependency locally:

```bash
  pnpm ecli:build
```

## Using it:

To use it as a raw CLI you can run `pnpm ecli <cmd>` followed or not by its flags (optional):

- Entity Name:

flags: -n, --name

Example:

```bash
  pnpm ecli <cmd> -n example
```

- Path:

flags: -p, --path

Example:

```bash
  pnpm ecli <cmd> -p ./src/core/src
```

- Json Path:

If you choose to start from a json file, pass its path;

flags: -j, --json

Example:

```bash
  pnpm ecli <cmd> -j ./json/sample-entity.json
```

OBS: You can chain flags.

### Generating Entity:

Example:

```bash
  pnpm ecli gen -n example
```

### Adding to Entity:

Example:

```bash
  pnpm ecli add -p ./src/core/src/example
```

### Running as a pnpm pre-built script:

From the root of the project add the following scripts to the package json:

```json
    "g:e": "pnpm ecli gen -p ./src/core/src",
    "g:e:json": "pnpm ecli gen -p ./src/core/src --json ./sample-entity.json "
```

`pnpm g:e` will start the process with the pre-defined output

`pnpm g:e:json` will start the process with the pre-defined output and the pre-defined path to the sample entity file, just customize the sample entity.
