import { USER_ROLE } from './../module/user/user.constant';
import config from "../config"
import { User } from "../module/user.model"




const superAdmin={
    id:"0001",
    password:config.super_admin_password,
    email:"amsohelrana.me@gmail.com",
    needsPasswordChange:false,
    role: USER_ROLE.superAdmin,
    status:'in-progress',
    isDeleted:false
}
const seedSuperAdmin=async()=>{

    const isSuperAdminExist=await User.findOne({role:USER_ROLE.superAdmin});
   
    if(!isSuperAdminExist)
    {
      
        await User.create(superAdmin);
    }



}

export default seedSuperAdmin;