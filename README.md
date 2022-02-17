# node-typescript-boilerplate

[![TypeScript version][ts-badge]][typescript-4-3]
[![Node.js version][nodejs-badge]][nodejs]

👩🏻‍💻 Developer Ready: A comprehensive template for Typescript Express.Js projects.

🏃🏽 Instant Value: All basic tools included and configured:

- [TypeScript][typescript] [4.3][typescript-4-3]
- [ESLint][eslint] with some initial rules recommendation
- [Jest][jest] for fast unit testing and code coverage
- Type definitions for Node.js and Jest
- [Prettier][prettier] to enforce consistent code style
- NPM [scripts](#available-scripts) for common operations
- Simple example of TypeScript code and unit test
- .editorconfig for consistent file format

## Getting Started

This project is intended to be used with the latest Active LTS release of [Node.js][nodejs].

### Using NPM

This package is used to generate Typescript project, so I recommend to install it **globally**. Then run command to create new project whenever we want

```
npm install -g typescript-maker

# Generate new project

typescript-maker init my-project
```

### Available options
```
- ioc : setup IOC container using [inversify](https://www.npmjs.com/package/inversify) (default: normal express)
- p --pipeline <pipeline tool>: setup pipeline template (default: CircleCI)
```

### Create pipeline template
```
# currently it just supports 'circleci' or 'github'

typescript-maker create-pipeline circleci
```

### Use as a repository template

To start, just click the **[Use template][repo-template-action]** link (or the green button). Then, select which pipeline you gonna use by moving that one out of `pipeline` folder and removing `pipeline` folder. Start adding your code in the `src` and unit tests in the `__tests__` directories.

### Clone repository

To clone the repository, use the following commands:

```sh
git clone https://github.com/Maithanhdanh/express-typescript-biolerplate.git
cd express-typescript-biolerplate
npm install
```

## Note

- A new decorator `logGroup` is add to version `1.2.3`.
- It will add called method to logger prefix by **modifying the definition of the class and method**

## Changelog
[ChangeLog](https://github.com/Maithanhdanh/express-typescript-boilerplate/blob/main/CHANGELOG.md)

[ts-badge]: https://img.shields.io/badge/TypeScript-4.3-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2014.16-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v14.x/docs/api/
[typescript]: https://www.typescriptlang.org/
[typescript-4-3]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html
[jest]: https://facebook.github.io/jest/
[eslint]: https://github.com/eslint/eslint
[prettier]: https://prettier.io
[repo-template-action]: https://github.com/Maithanhdanh/express-typescript-biolerplate.git
