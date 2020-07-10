import AuthorizeRepository from "./authorize.repository";
import CommentRepository from "./comment.repository";
import OrderRepository from "./order.repository";
import ItemTypeRepository from "./itemType.repository";
import OrderTypeRepository from "./orderType.repository";
import OfficeRepository from "./office.repository";
import ReceiverRepository from "./receiver.repository";
import commercialAllyRepository from "./commercialAlly.repository";
import userProfileRepository from "./userProfile.repository";

const repositories = {
  authorize: AuthorizeRepository,
  comment: CommentRepository,
  commercialAlly: commercialAllyRepository,
  order: OrderRepository,
  itemType: ItemTypeRepository,
  office: OfficeRepository,
  orderType: OrderTypeRepository,
  receiver: ReceiverRepository,
  userProfile: userProfileRepository,
};
export default {
  get: (name) => repositories[name],
};
