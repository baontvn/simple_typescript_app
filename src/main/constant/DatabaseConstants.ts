

export class DatabaseConstants {
    
    public static SCHEMA: string = "ulegal";
    
    // tables
    public static USER_DATA_TABLE: string = "user";
    public static ROLE_DATA_TABLE: string = "role";
    public static USER_ROLE_DATA_TABLE: string = "user_role";
    public static CONFIG_DATA_TABLE: string = "config";

    // columns
    // User Table columns
    public static USER_ID_COL: string = "id";
    public static USER_USERNAME_COL: string = "userName";
    public static USER_HASHEDPASSWORD_COL: string = "hashedPassword";
    public static USER_FULLNAME_COL: string = "fullName";
    public static USER_EMAIL_COL: string = "email";
    public static USER_PHONENO_COL: string = "phone";
    public static USER_ACTIVE_COL: string = "isActive";
    public static USER_CREATED_BY_COL: string = "createdBy";
    public static USER_CREATED_TIME_COL: string = "createdTime";
    public static USER_MODIFIED_BY_COL: string = "editedBy";
    public static USER_MODIFIED_TIME_COL: string = "editedTime";

    // Role Table columns
    public static ROLE_ID_COL: string = "id";
    public static ROLE_NAME_COL: string = "name";
    public static ROLE_DESCRIPTION_COL: string = "description";

    // Config Table columns
    public static CONFIG_ID_COL: string = "id";
    public static CONFIG_APPNAME_COL: string = "appName";
    public static CONFIG_ENV_COL: string = "environment";
    public static CONFIG_URL_SIGNUP_COL: string = "urlSignUp";
    public static CONFIG_URL_SIGNIN_COL: string = "urlSignIn";
    public static CONFIG_URL_RESET_PASSWORD_COL: string = "urlResetPassword";
    public static CONFIG_URL_APP_COL: string = "urlApplication";
    public static CONFIG_CREATED_BY_COL: string = "createdBy";
    public static CONFIG_CREATED_TIME_COL: string = "createdTime";
    public static CONFIG_MODIFIED_BY_COL: string = "editedBy";
    public static CONFIG_MODIFIED_TIME_COL: string = "editedTime";

    // User Role table columns
    public static USER_ROLE_USERID_BY_COL: string = "userId";
    public static USER_ROLE_ROLEID_BY_COL: string = "roleId";
}