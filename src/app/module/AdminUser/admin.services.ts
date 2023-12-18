import QueryBuilder from "../../builder/QueryBuilder";
import { Admin } from "./admin.model";




const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
    const adminQuery = new QueryBuilder(Admin.find(), query).filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await adminQuery.modelQuery;
    return result;
  };
  
  const getSingleAdminFromDB = async (id: string) => {
    const result = await Admin.findById(id);
    return result;
  };

  export const AdminService={
    getAllAdminsFromDB,
    getSingleAdminFromDB
  }