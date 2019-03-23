export interface Roles {
    user: boolean;
    doctor?: boolean;
    nurse?:  boolean;
}

export class User {
    lat?: number;
    lon?: number;
    center: boolean;
    email: string;
    name: string;
    surname: string;
    id: string;
    fatherInitial: string;
    phone: string;
    fax: string;
    street: string;
    streetNumber: string;
    building: string;
    block: string;
    appartment: string;
    city: string;
    county: string;
    country: string;
    postalCode: string;
    centerName: string;
    iban: string;
    fic: string;
    roles: Roles;
    
    constructor(authData = null) {
        if (authData != null) {
            this.email    = authData.email
            this.roles    = { user: true }
        }
    }
}