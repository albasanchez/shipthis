import ConfigurationRepository from "./configuration.repository";

const repositories = {
  configuration: ConfigurationRepository,
};
export default {
  get: (name) => repositories[name],
};
