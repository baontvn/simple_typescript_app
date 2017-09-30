

export class DatabaseConstants {
    
    public static SCHEMA: string = "ulegal";
    
    // tables
    public static USER_DATA_TABLE: string = "user";
    public static ROLE_DATA_TABLE: string = "user_role";
    public static CONFIG_DATA_TABLE: string = "config";

    // columns
    // User Table columns
    public static USER_ID_COL: string = "id";
    public static USER_USERNAME_COL: string = "userName";
    public static USER_HASHEDPASSWORD_COL: string = "hashedPassword";
    public static USER_FULLNAME_COL: string = "fullName";
    public static USER_EMAIL_COL: string = "email";
    public static USER_PHONENO_COL: string = "phone";
    public static USER_ROLEID_COL: string = "roleId";
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
    public static CONFIG_LANGUAGE_COL: string = "language";
    public static CONFIG_LINK_SIGNUP_COL: string = "linkSignUp";
    public static CONFIG_LINK_SIGNIN_COL: string = "linkSignIn";
    public static CONFIG_LINK_RESET_PASSWORD_COL: string = "linkResetPassword";
    public static CONFIG_FONT_SIZE_COL: string = "fontSize";
    public static CONFIG_FONT_COLOR_COL: string = "fontColor";
    public static CONFIG_FONT_FAMILY_COL: string = "fontFamily";
    public static CONFIG_HASH_KEY_COL: string = "hashKey";
    public static CONFIG_HASH_ALGORITHM_COL: string = "hashAlgorithm";
    public static CONFIG_CREATED_BY_COL: string = "createdBy";
    public static CONFIG_CREATED_TIME_COL: string = "createdTime";
    public static CONFIG_MODIFIED_BY_COL: string = "editedBy";
    public static CONFIG_MODIFIED_TIME_COL: string = "editedTime";
}