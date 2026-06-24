export interface BRANCH_INTERFACE {
    branchName: string;
    phoneNumber: string
    state: string;
    branchAddress: string
}

export interface ASSIGN_BRANCH{
    branchId: string;
    doctorIds: string[];
}