export interface MyProfile {
    myID: string;
    isActive: boolean;
    isSuspended: boolean;
    firstName: string;
    lastName: string;
    mpNumber: string;
    photoURL?: string;
    cvUrl?: string;
    certificationUrl?: string;
    [key: string]: any; // Allow additional properties
    gender?: string;
    email: string | null;
    country: string;
    initials: string;
    language: string;
    physicalAddress1: string;
    physicalAddress2: string;
    physicalSuburb: string;
    physicalAddressCode: string;
    regionName: string;
    hcpType: string;
    discipline: string;
    subRegionName: string;
    cellNumber: string;
    phoneNumber: string;
    title: string;
    town: string;
    market: string;
    governmentOfficial?: string;
    healthCareProfessional: boolean;
    agreetoTermsOfUse?: boolean;
    acceptConcent?: boolean;
    acceptPrivacy?: boolean;
    acceptPopi?: boolean;
    role: string;
    isVerified: boolean;
}
