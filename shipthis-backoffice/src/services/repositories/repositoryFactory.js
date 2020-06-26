import ConfigurationRepository from "./configuration.repository";
import shipmentsRepository from "./shipments.repository";

const repositories = {
  configuration: ConfigurationRepository,
  shipments: shipmentsRepository,
};
export default {
  get: (name) => repositories[name],
};
