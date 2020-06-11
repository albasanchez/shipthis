import AuthorizeRepository from "./authorize.repository";
import CommentRepository from "./comment.repository";
import OrderRepository from "./order.repository";
import ItemTypeRepository from "./itemType.repository";
import OrderTypeRepository from "./orderType.repository";
import OfficeRepository from "./office.repository";

const repositories = {
  authorize: AuthorizeRepository,
  comment: CommentRepository,
  order: OrderRepository,
  itemType: ItemTypeRepository,
  office: OfficeRepository,
  orderType: OrderTypeRepository
};
export default {
  get: name => repositories[name]
};
