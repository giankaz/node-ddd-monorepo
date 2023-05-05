# Entity Generator CLI

## Adding it:

- On the root of the project run the build command to build and install it as dev dependency locally:

```bash
  pnpm ecli:build
```

## Using it:

To use it as a raw CLI you can run `pnpm ecli gen` followed or not by its flags:

- Entity Name:

flags: -n, --name

Example:

```bash
  pnpm ecli gen -n example
```

- Output Path:

flags: -p, --path

Example:

```bash
  pnpm ecli gen -p ./src/core/src
```

- Json Path:

If you choose to start from a json file, pass its path;

flags: -j, --json

Example:

```bash
  pnpm ecli gen -j ./sample-entity.json
```

OBS: You can chain flags.

### Running as a pnpm pre-built script:

From the root of the project add the following scripts to the package json:

```json
    "g:e": "pnpm ecli gen -p ./src/core/src",
    "g:e:json": "pnpm ecli gen -p ./src/core/src --json ./sample-entity.json "
```

`pnpm g:e` will start the process with the pre-defined output

`pnpm g:e:json` will start the process with the pre-defined output and the pre-defined path to the sample entity file, just customize the sample entity.
