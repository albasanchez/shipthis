import { CreateOrdersheetDto } from "../../dto/create-ordersheet.dto";
import { CreateItemDto } from "../../dto/create-item.dto";
import { OrderDetailDto } from "../../dto/order-detail.dto";
import { OrderHistoryDto } from "../../dto/order-history.dto";
import { AddressValidationDto } from "../../dto/address-validation.dto";
import { Response } from "express";

export const res : Response = null;

export const items : CreateItemDto[] = [
    {
        description: "Item 1",
        item_weight: 12,
        item_length: 15,
        item_width: 19,
        item_height: 54,
        characteristics: [],
    },
    {
        description: "Item 2",
        item_weight: 14,
        item_length: 19,
        item_width: 17,
        item_height: 45,
        characteristics: [],
    }
]

export const newOrderSheet : CreateOrdersheetDto = {
    ignore_holidays: true,
    order_price_hist: 1,
    useremail: "email@email.com",
    receiver_id: 1,
    discount_id: 1,
    origin_office: 1,
    destination_office: 2,
    destination_address: null,
    items: items
};

export const orderDetail : OrderDetailDto = {
    tracking_id: "TRACKING-TEST"
}

export const orderHist : OrderHistoryDto = {
    useremail: "email@email.com"
}

export const address : AddressValidationDto = {
    address: "Address tested"
}