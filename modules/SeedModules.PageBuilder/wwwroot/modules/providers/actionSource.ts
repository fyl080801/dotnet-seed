import boot = require('SeedModules.PageBuilder/modules/boot');

class Service implements PageBuilder.services.ISchemaSourceService {
  constructor(private $sourceActionTable: PageBuilder.SourceActionTable) {}

  resolve(name: string) {
    return this.$sourceActionTable[name];
  }
}

class Provider implements PageBuilder.providers.ISourceActionProvider {
  private service: PageBuilder.services.ISchemaSourceService;

  static $inject = ['$sourceActionTable'];
  constructor(private $sourceActionTable: PageBuilder.SourceActionTable) {
    this.service = new Service($sourceActionTable);
  }

  register(name: string, source: PageBuilder.ISourceAction) {
    this.$sourceActionTable[name] = source;
  }

  $get() {
    return this.service;
  }
}

boot.constant('$sourceActionTable', {}).provider('$schemaSource', Provider);
