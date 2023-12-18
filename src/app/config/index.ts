import donenv from 'dotenv';
import path from 'path';
donenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  NODE_ENV:process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  byrypt_salt_rounds:process.env.BCRYPT_SALT_ROUNDS,
  default_password:process.env.DEFAULT_PASS,
  jwt_access_srcret:process.env.JWT_ACCESS_SECRET,
  jwt_refeesh_srcret:process.env.JWT_REFRESH_TOKEN
};
