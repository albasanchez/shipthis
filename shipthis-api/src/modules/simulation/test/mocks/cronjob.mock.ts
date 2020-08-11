
import { CronTime } from 'cron';
export const job: any= {
  setTime: function(time:CronTime){
    return jest.fn()
  },
  start: function(){
    return jest.fn()
  },
  running: jest.fn().mockReturnThis(),
  fireOnTick: jest.fn().mockReturnThis(),
  stop: jest.fn().mockReturnThis(),
  lastDate: jest.fn().mockReturnThis(),
  nextDate: jest.fn().mockReturnThis(),
  nextDates: jest.fn().mockReturnThis(),
  addCallback: jest.fn().mockReturnThis(),

}
