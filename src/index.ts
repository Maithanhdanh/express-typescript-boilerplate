import * as moduleAlias from 'module-alias';
const sourcePath = process.env.NODE_ENV === 'development' ? 'src' : 'build';
moduleAlias.addAliases({
  '@server': sourcePath,
  '@config': `${sourcePath}/config`,
  '@domain': `${sourcePath}/domain`,
  '@controller': `${sourcePath}/controller`,
  '@application': `${sourcePath}/application`,
  '@utils': `${sourcePath}/utils`,
});

import 'reflect-metadata';
import { createContainer } from '@config/container';
import { startServer } from '@config/express';

(async () => {
  const container = createContainer();

  startServer(container);
})();
