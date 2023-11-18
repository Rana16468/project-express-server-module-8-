export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContractNo: string;
  motherName: string;
  motherOccupation: string;
  motherContractNo: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  address: string;
  contractNo: string;
};
export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  email: string;
  dethOfBirth: string;
  contractNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'B+' | 'AB+' | 'O+' | 'A-' | 'B-' | 'AB-' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuargian: LocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'inActive';
};
