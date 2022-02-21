# [1.2.4]

- When a class calls an outside function now still have a prefix in logger message
  - Add a `customLogger` class
  - Use `reflect-metadata` to store and retrieve when write a log
  - Modify `logGroup`, and `container` config to adapt new logger

# [1.2.3]

- Add decorator `logGroup` to add called method to logger prefix

# [1.2.2]

- Add Github `CodeQL` pipeline

# [1.2.1]

- Update `README`

# [1.2.0]

- Add IOC container using [inversify](https://www.npmjs.com/package/inversify)
- Fix script `npm start`

# [1.1.2]

- Up version to get sample log when running `npm publish` for tech blog

# [1.1.1]

- Update `README`

# [1.1.0]

- Add npm command `init`
- Add option pipeline selection, currently supported CircleCI and Github
- Update `README`

# [1.0.5]

- Add npm command `typescript-maker my-project`
- Update `README`
