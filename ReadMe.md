# Build-chain

## Installation

    npm install -g build-chain

## Usage

`build.json` in project location
``` json
{
    "default": [
        "# compile run"
    ],
    "compile": [
        "tsc -m commonjs --outDir build src/app.ts",
        "echo Ok compiling done!"
    ],
    "run": [
        "node build/app.js",
        "echo Ok everything looks good"
    ]
}
```

build and run project

	build-chain
