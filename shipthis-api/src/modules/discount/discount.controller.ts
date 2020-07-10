import { AuthGuard } from '@nestjs/passport';
import { AvaliableDiscountDto } from './dto/avaliable-discount.dto';
import { AssignDiscountDto } from './dto/assign-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { AssignDiscountsDto } from './dto/assign-discounts.dto';
import { DiscountService } from './discount.service';
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

@UseGuards(AuthGuard('jwt'))
@Controller('discount')
export class DiscountController {
  constructor(private readonly _discountServ: DiscountService) {}

  @Post('avaliable-discounts')
  @UsePipes(ValidationPipe)
  async getAvaliableDiscounts(@Body() data: AvaliableDiscountDto) {
    return this._discountServ.getAvaliableDiscounts(data.useremail);
  }

  @Get('discounts')
  async getDiscounts() {
    return await this._discountServ.getDiscounts();
  }

  @Get('discounts-info')
  async getDiscountsInfo() {
    return await this._discountServ.getDiscountsInfo();
  }

  @Post('assign-discount')
  @UsePipes(ValidationPipe)
  async assignDiscount(@Body() data: AssignDiscountDto) {
    return this._discountServ.assignDiscount(data);
  }

  @Post('assign-multiple-discounts')
  @UsePipes(ValidationPipe)
  async assignDiscounts(@Body() optionInfo: AssignDiscountsDto) {
    return this._discountServ.assignDiscounts(optionInfo);
  }

  @Post('create-discount')
  @UsePipes(ValidationPipe)
  async createDiscount(@Body() newDiscount: UpdateDiscountDto) {
    return this._discountServ.createDiscount(newDiscount);
  }

  @Patch('update-discount/:id')
  @UsePipes(ValidationPipe)
  async updateDiscount(
    @Param('id', ParseIntPipe) id: number,
    @Body() newdiscount: UpdateDiscountDto,
  ): Promise<UpdateDiscountDto> {
    return this._discountServ.updateDiscount(id, newdiscount);
  }

  @Delete('delete-discount/:id')
  async deleteDiscount(@Param('id', ParseIntPipe) id: number) {
    return await this._discountServ.deleteDiscount(id);
  }
}
