export class User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile: {
        company: string;
        description: string;
        phone_number: string;
        avatar: string
    };
    technology: [{name: string}]
    avatar: string;
    img: any;
}