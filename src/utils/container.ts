import { interfaces } from 'inversify';

const getClassNameFromRequest = (context: interfaces.Context) =>
  (context.currentRequest.parentRequest &&
    context.currentRequest.parentRequest.bindings.length &&
    context.currentRequest.parentRequest.bindings[0].implementationType &&
    (context.currentRequest.parentRequest.bindings[0].implementationType as any).name) ||
  'Undefined';

export { getClassNameFromRequest };
