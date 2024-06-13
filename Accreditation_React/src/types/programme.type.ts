export interface ICreateProgrammeDto {
  programID: string;
  programNameEng: string;
  programNameMalay: string;
  faculty: string;
  accreditationType: string;
  expiryDate: Date;
  status: string;
  mqrNum: number;
  referredMQRNum: string;
  registeredMQR: string;
  studyMode: string;
  necCode: string;
  minDurationOfStudy: number;
  maxDurationOfStudy: number;
  creditHrs: string;
  approvedDateSenate: Date;
  accreditationStatus: string;
  approvalCertJPT: string;
  remarks: string;
  phaseReaccreditation: string;
  approvedDateSenateReaccreditation: Date;
  durationReaccreditation: string;
  remarksReaccreditation: string;
}

export interface IGetProgrammeDto {
  programID: string;
  programNameEng: string;
  programNameMalay: string;
  faculty: string;
  accreditationType: string;
  expiryDate: Date;
  status: string;
  programmeDocUrl: string;
  mqrNum: number;
  referredMQRNum: string;
  registeredMqr: string;
  studyMode: string;
  necCode: string;
  minDurationOfStudy: number;
  maxDurationOfStudy: number;
  creditHrs: string;
  approvedDateSenate: Date;
  accreditationStatus: string;
  approvalCertJPT: string;
  remarks: string;
  phaseReAccreditation: string;
  approvedDateSenateReAccreditation: Date;
  durationReaccreditation: string;
  remarksReAccreditation: string;
}

export interface IProgramme {
  programID: string;
  programName: string;
  programNameMalay: string;
  faculty: string[];
  expiryDate: Date;
  status: string[];
  programmeDocUrl: string;
  accreditationType: string[];
  phaseReAccreditation:string[];
}

export interface IAdminUpdateProgrammeDto {
  programID: string;
  programNameEng: string;
  programNameMalay: string;
  faculty: string;
  accreditationType: string;
  expiryDate: Date;
  status: string;
  mqrNum: number;
  referredMQRNum: string;
  registeredMQR: string;
  studyMode: string;
  necCode: string;
  minDurationOfStudy: number;
  maxDurationOfStudy: number;
  creditHrs: string;
  approvedDateSenate: Date;
  accreditationStatus: string;
  approvalCertJPT: string;
  remarks: string;
  phaseReAccreditation: string;
  approvedDateSenateReAccreditation: Date;
  durationReAccreditation: string;
  remarksReAccreditation: string;
}

export interface IFacultyUserUpdateProgrammeDto {
  programID: string;
  programmeDocUrl: string;
}

export enum ProgramStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  FROZEN = "FROZEN",
}

export enum TypeAccreditation {
  "Full Accreditation" = "Full Accreditation",
  "Re-Accreditation" = "Re-Accreditation",
}

export enum FacultyProgramme {
  "Academy of Islamic Studies" = "Academy of Islamic Studies",
  "Academy of Malay Studies" = "Academy of Malay Studies",
  "Asia-Europe Institute" = "Asia-Europe Institute",
  "Centre for Sport and Exercise Sciences" = "Centre for Sport and Exercise Sciences",
  "Institute for Advanced Studies" = "Institute for Advanced Studies",
  "International Institute of Public Policy & Management" = "International Institute of Public Policy & Management",
  "Faculty of Arts and Social Sciences" = "Faculty of Arts and Social Sciences",
  "Faculty of Built Environment" = "Faculty of Built Environment",
  "Faculty of Business and Economics" = "Faculty of Business and Economics",
  "Faculty of Computer Science and Information Technology" = "Faculty of Computer Science and Information Technology",
  "Faculty of Creative Arts" = "Faculty of Creative Arts",
  "Faculty of Dentistry" = "Faculty of Dentistry",
  "Faculty of Education" = "Faculty of Education",
  "Faculty of Engineering" = "Faculty of Engineering",
  "Faculty of Languages and Linguistics" = "Faculty of Languages and Linguistics",
  "Faculty of Law" = "Faculty of Law",
  "Faculty of Medicine" = "Faculty of Medicine",
  "Faculty of Pharmacy" = "Faculty of Pharmacy",
  "Faculty of Science" = "Faculty of Science",
}

export enum PhaseReAccreditation{
  "Phase 1" = "Phase 1",
  "Phase 2" = "Phase 2",
  "Phase 3" = "Phase 3",
  "Phase 4" = "Phase 4",
  "Phase 5" = "Phase 5",
  "Phase 6" = "Phase 6"
}

export const isProgrammeDocUrlExist =(
  programmeDocUrl:string
)=>{
  let result = true;
  if (programmeDocUrl ==null){
    result = false;
  }else result = true;
  return result;
};

export const accreditationTypeCanUpdate=(
  accreditationType:string
)=> {
  let result = true;
  if(accreditationType =="Full Accreditation"){
    result = false;
  }else result = true;
  return result;
};
  