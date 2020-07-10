import ConfigurationRepository from "./configuration.repository";
import orderTypeRepository from "./orderType.repository";
import AuthorizeRepository from "./authorize.repository";
import shipmentsRepository from "./shipments.repository";
import commercialAlliesRepository from "./commercialAllies.repository";
import usersRepository from "./users.repository";
import OrderRepository from "./order.repository";

const repositories = {
  configuration: ConfigurationRepository,
  orderType: orderTypeRepository,
  authorize: AuthorizeRepository,
  shipments: shipmentsRepository,
  commercialAlly: commercialAlliesRepository,
  users: usersRepository,
  order: OrderRepository,
};

export default {
  get: (name) => repositories[name],
};
