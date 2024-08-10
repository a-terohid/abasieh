export enum ROLE  {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
}


export enum ERROR {
    SERVER_ERROR = "There is error in server!",
    USER_EXIST = "This user already exists!",
    CANT_FIND_USER = "This user cannot be found!",
    CANT_FIND_ADMIN = "This admin cannot be found!",
    INVALID_DATA = "please enter a valid data!",
    REPEAT_PASSWORD = "The password and its repetition are not equal!",
    CREATE_ACCOUNT = "Please create an account first!",
    WRONG_PASSWORD = "Email or password is incorrect!",
    PROBLEM = "There is a Problem!",
    LOGIN = "Please login to your account!",
    NO_ADS = "No advertisement have been registered!",
    NO_USER = "There is no user!",
    AD_ACCESS = "Your access is limited to this action!",
    ACCESS_DENIED = "access denied!",
}

export enum MESSAGE {
    NEW_USER = "user cteated successfully!",
    AD_DELETE = "Admin deleted successfully!",
}