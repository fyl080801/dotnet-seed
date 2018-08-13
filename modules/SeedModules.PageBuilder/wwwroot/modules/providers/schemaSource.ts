import boot = require('SeedModules.PageBuilder/modules/boot');

class Provider implements PageBuilder.providers.ISchemaSourceProvider {
  static $inject = ['$schemaSourceTable'];
  constructor(private $schemaSourceTable) {}

  register(sourceType: any) {
    throw new Error('Method not implemented.');
  }

  $get: () => {};
}

boot.constant('$schemaSourceTable', {}).provider('$schemaSource', Provider);
