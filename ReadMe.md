# Build-chain

## Installation

    npm install -g build-chain

## Usage

`build.json` in project location
``` json
{
    "default": [
        "build-chain compile run"
    ],
    "compile": [
        "tsc -m commonjs --outDir build src/app.ts",
        "echo Ok compiling done!"
    ],
    "run": [
        "node build/app.js",
        "echo Ok everything looks good"
    ],
	"my word": [
		"echo You can use double quotes for string",
		"echo so see you :)"
	]
}
```

call build-chain with default parameter

	build-chain

call build-chain for only compiling

	build-chain compile

call build-chain with double quotes

	build-chain "my word"