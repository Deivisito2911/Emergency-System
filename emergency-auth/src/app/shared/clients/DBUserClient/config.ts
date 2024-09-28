import { User } from '../../../user/entities/user';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERS_USERNAME,
    password: process.env.DB_USERS_PASSWORD,
    database: process.env.DB_USERS_DATABASE,
    entities: [User],
    synchronize:  false,
  },
});
