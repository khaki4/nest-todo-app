import * as config from 'config';

const jwtEnv: any = config.get('jwt');

export const jwtConfig = {
  secret: process.env.JWT_SECRET || jwtEnv.secret,
  expiresIn: jwtEnv.expiresIn,
};

const dbEnv: any = config.get('db');
export const dbConfig = {
  type: dbEnv.type,
  host: process.env.RDS_HOSTNAME || dbEnv.host,
  port: process.env.RDS_PORT || dbEnv.port,
  username: process.env.RDS_USRNAME || dbEnv.username,
  password: process.env.RDS_PASSWORD || dbEnv.password,
  database: process.env.RDS_DB_NAME || dbEnv.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbEnv.synchronize,
};
