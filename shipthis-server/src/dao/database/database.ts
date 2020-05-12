import { Sequelize } from 'sequelize-typescript';
import { Rol } from 'src/dao/entity/rol.entity';
import { UserData } from 'src/dao/entity/user_data.entity';
import { Person } from 'src/dao/entity/person.entity';
import { Place } from 'src/dao/entity/place.entity';
import { Category } from 'src/dao/entity/category.entity';
import { ItemType } from 'src/dao/entity/item_type.entity';
import { ItemPriceHist } from 'src/dao/entity/item_price_hist.entity';
import { OrderType } from 'src/dao/entity/order_type.entity';
import { Office } from 'src/dao/entity/office.entity';
import { OrderSheet } from 'src/dao/entity/order_sheet.entity';
import { Item } from 'src/dao/entity/item.entity';
import { Trajectory } from 'src/dao/entity/trajectory.entity';
import { CheckPoint } from 'src/dao/entity/check_point.entity';
import { CommentBox } from 'src/dao/entity/comment_box.entity';
import { config } from 'dotenv';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
              dialect: 'postgres',
              host: process.env.DB_HOST,
              port: 5432,
              username: process.env.DB_USERNAME,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME_DATABASE,
            });
            sequelize.addModels([Rol, UserData, Person, Place, Category, 
                 ItemType, ItemPriceHist, OrderType, Office, OrderSheet,
                 Item, Trajectory, CheckPoint, CommentBox]);
            await sequelize.sync();
            return sequelize;
        },
    },
];