import { AvaliableDiscountDto } from './dto/avaliable-discount.dto';
import { DiscountService } from './discount.service';
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('discount')
export class DiscountController {
  constructor(private readonly _discountServ: DiscountService) {}

  @Post('avaliable-discounts')
  @UsePipes(ValidationPipe)
  async getAvaliableDiscounts(@Body() data: AvaliableDiscountDto) {
    return this._discountServ.getAvaliableDiscounts(data.useremail);
  }
}
