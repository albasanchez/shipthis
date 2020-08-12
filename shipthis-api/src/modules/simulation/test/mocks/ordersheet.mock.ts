
let ordersheet = {
  ordersheet_id: 3,
  creation_date: new Date(),
  status: 'DELIVERED',
  delivery_date: new Date(),
  ignore_holidays: true,
  facturation_amount: 45,
  trajectories:{
    trajectory_id: 2,
    distance: 23,
    check_points: [],
  }
}

let check_points= [
  {
  check_point_id: 1,
  check_point_order: 2,
  time_mark: new Date(),
},
{
  check_point_id: 1,
  check_point_order: 3,
  time_mark: new Date(),
},
{
  check_point_id: 1,
  check_point_order: 1,
  time_mark: new Date(),
},
{
  check_point_id: 1,
  check_point_order: 1,
  time_mark: new Date(),
},
{
  check_point_id: 1,
  check_point_order: 4,
  time_mark: new Date(),
},
{
  check_point_id: 1,
  check_point_order: 5,
  time_mark: new Date(),
},
]

export class OrdersheetMock {
  find(status: string, hasCheckpoints: boolean, timeMarkMustBeNull: boolean) {
    ordersheet.status = status;
    check_points[0].time_mark = timeMarkMustBeNull? null: new Date(); 
    ordersheet.trajectories.check_points = hasCheckpoints? check_points:[];
    return jest.fn().mockResolvedValue([ordersheet]);
  }
}

export const ordersheetCreateQueryBuilder: any = {
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  execute: jest.fn().mockReturnThis(),
};

