import ConfigurationRepository from "./configuration.repository";
import orderTypeRepository from "./orderType.repository";
import AuthorizeRepository from "./authorize.repository";
import shipmentsRepository from "./shipments.repository";

const repositories = {
  configuration: ConfigurationRepository,
  orderType: orderTypeRepository,
  authorize: AuthorizeRepository,
  shipments: shipmentsRepository,
};

export default {
  get: (name) => repositories[name],
};
