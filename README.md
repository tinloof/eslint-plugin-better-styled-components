# eslint-plugin-better-styled-components 💅

Auto fixable ESlint's rules for styled components.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-better-styled-components`:

```
$ npm install eslint-plugin-better-styled-components --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-better-styled-components` globally.

## Usage

Add `better-styled-components` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "better-styled-components"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "plugins": [
        "better-styled-components"
    ],
    "rules": {
        "better-styled-components/sort-declarations-alphabetically": 2
    }
}
```

## Supported Rules

* 🔤`sort-declarations-alphabetically`: auto fixable rule that enforces alphabetically sorted declarations.


## License
Unless otherwise specified this project is licensed under [Apache License Version 2.0](./LICENSE).



