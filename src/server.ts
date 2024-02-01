import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
import config from './app/config';
import seedSuperAdmin from './app/DB';

let server:Server;

//connect mondodb collection
//username :admin-next-level
//password: 569PGn3TQ3d1mk4t
//569PGn3TQ3d1mk4t

//console.log(config.database_url);
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    seedSuperAdmin();
    console.log('successfully run');
   server= app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();

process.on('unhandledRejection',()=>{
  
  if(server)
  {
    server.close(()=>{
      process.exit(1);
    })
  }
  process.exit(1);
});


process.on('uncaughtException',()=>{

  
  process.exit(1);
})
