import { createConnection } from 'typeorm';
import { entities } from '../entities';

require('dotenv').config();

export const connectToDataBase = async () => {
  const user = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  const host = process.env.DATABASE_HOST;
  const port = process.env.DATABASE_PORT;
  const dbName = process.env.DATABASE_DATABASE;
  const dbType = process.env.DATABASE_TYPE;
  const dbUrl = process.env.DATABASE_URL;



  if (process.env.NODE_ENV === 'development') {
    try {
      await createConnection({
        type: dbType as any,
        host: host as any,
        port: port as any,
        username: user as any,
        password: password as any,
        database: dbName as any,
        entities: entities,
        synchronize: true,
      });
      console.log(`You Are Now Connected to Database At Port: ${port}`);
    } catch (error) {
      console.log(error);
      console.log('Unable To Connect To Database');
      process.exit(1);
    }
  } else {
    try {
      await createConnection({
        type: dbType as any,
        url: dbUrl,
        entities: entities,
        synchronize: true,
        ssl: true,
      });
      console.log(`You Are Now Connected to Database At Port: ${port}`);
    } catch (error) {
      console.log(error);
      console.log('Unable To Connect To Database');
      process.exit(1);
    }
  }
};