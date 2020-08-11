export class DiscountMock {
    assignWelcomeDiscount() {
        return jest.fn().mockResolvedValue({
            discount_id: 1,
            name: 'WELCOME',
            percentage: 10,
            status: 'ACTIVE'
        });
    }
}