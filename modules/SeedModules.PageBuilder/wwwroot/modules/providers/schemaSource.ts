import boot = require('SeedModules.PageBuilder/modules/boot');

class Service implements PageBuilder.services.ISchemaSourceService {
  constructor(private $schemaSourceTable: PageBuilder.SchemaSourceTable) {}

  getSource(name: string) {
    return this.$schemaSourceTable[name];
  }
}

class Provider implements PageBuilder.providers.ISchemaSourceProvider {
  private service: PageBuilder.services.ISchemaSourceService;

  static $inject = ['$schemaSourceTable'];
  constructor(private $schemaSourceTable: PageBuilder.SchemaSourceTable) {
    this.service = new Service($schemaSourceTable);
  }

  register(name: string, source: PageBuilder.ISchemaSource) {
    this.$schemaSourceTable[name] = source;
  }

  $get() {
    return this.service;
  }
}

boot.constant('$schemaSourceTable', {}).provider('$schemaSource', Provider);
