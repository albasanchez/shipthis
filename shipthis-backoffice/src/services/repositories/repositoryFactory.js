import ConfigurationRepository from "./configuration.repository";
import AuthorizeRepository from "./authorize.repository";
import shipmentsRepository from "./shipments.repository";

const repositories = {
  configuration: ConfigurationRepository,
  authorize: AuthorizeRepository,
  shipments: shipmentsRepository,
};


export default {
  get: (name) => repositories[name],
};
