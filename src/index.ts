import * as moduleAlias from 'module-alias';
const sourcePath = process.env.NODE_ENV === 'development' ? 'src' : 'build';
moduleAlias.addAliases({
  '@server': sourcePath,
  '@config': `${sourcePath}/config`,
  '@domain': `${sourcePath}/domain`,
  '@controller': `${sourcePath}/controller`,
  '@application': `${sourcePath}/application`,
});

import createContainer from '@config/container';
import { startServer } from '@config/express';
import { activateLogging } from 'inversify-logging';

(async () => {
  const container = createContainer();

  activateLogging(container);
  startServer(container);
})();
