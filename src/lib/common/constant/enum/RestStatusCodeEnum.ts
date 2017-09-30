

export enum RestStatusCodeEnum {
    QUERY_HAS_DATA = "query_found",
    QUERY_HAS_NO_DATA = "query_not_found",
    SAVE_SUCCESSFUL = "save_success",
    UPDATE_SUCCESSFUL = "update_success",
    DELETE_SUCCESSFUL = "delete_success",
    SAVE_OR_UPDATE_SUCCESSFUL = "merge_success",
    DATABASE_ERROR = "database_error"
}