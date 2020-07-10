import { DiscountBasicInfoDto } from '../modules/discount/dto/discount-basic-info.dto';
import { Discount } from '../modules/discount/entities/discount.entity';
import { DiscountInfoDto } from '../modules/discount/dto/discount-info.dto';

export class MapperDiscount {

    static discountToDiscountInfo(discount: Discount): DiscountInfoDto { 

        const discountInfo: DiscountInfoDto = {
              discount_id: discount.discount_id,
              name: discount.name,
              percentage: discount.percentage,
              status: discount.status
          };

        return discountInfo;
    }

    static discountToDiscountBasicInfo(discount: Discount): DiscountBasicInfoDto { 

        const discountInfo: DiscountBasicInfoDto = {
              discount_id: discount.discount_id,
              discount: `${discount.name} (${discount.percentage}%)`
          };

        return discountInfo;
    }
}