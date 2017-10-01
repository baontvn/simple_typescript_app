
var knex = require('knex');
import { DatabaseConstants } from '../main/constant/DatabaseConstants';
import { KnexConfiguration } from './KnexConfiguration';

export class DatabaseInitializer {

    private static INSTANCE: DatabaseInitializer;

    constructor() {
        this.init();
    }

    public static getInstance(): DatabaseInitializer {

        if (!DatabaseInitializer.INSTANCE) {
            DatabaseInitializer.INSTANCE = new DatabaseInitializer();
        }

        return DatabaseInitializer.INSTANCE;
    }

    private init(): void {

        var knexConfiguration = KnexConfiguration.getInstance();
        var knex = knexConfiguration.getKnex();

        knex.schema
            .createTableIfNotExists(DatabaseConstants.SCHEMA + '.' + DatabaseConstants.ROLE_DATA_TABLE, (table) => {

                table.increments();
                table.string(DatabaseConstants.ROLE_NAME_COL, 50);
                table.string(DatabaseConstants.ROLE_DESCRIPTION_COL, 255);

                table.unique(DatabaseConstants.ROLE_NAME_COL);
            })
            .createTableIfNotExists(DatabaseConstants.SCHEMA + '.' + DatabaseConstants.USER_DATA_TABLE, (table) => {

                table.increments();
                table.string(DatabaseConstants.USER_USERNAME_COL, 100);
                table.string(DatabaseConstants.USER_HASHEDPASSWORD_COL, 100);
                table.string(DatabaseConstants.USER_FULLNAME_COL, 100);
                table.string(DatabaseConstants.USER_EMAIL_COL, 100);
                table.string(DatabaseConstants.USER_PHONENO_COL, 100);

                table.boolean(DatabaseConstants.USER_ACTIVE_COL);

                table.timestamp(DatabaseConstants.USER_CREATED_TIME_COL, 'timestamptz');
                table.integer(DatabaseConstants.USER_CREATED_BY_COL);
                table.timestamp(DatabaseConstants.USER_MODIFIED_TIME_COL, 'timestamptz');
                table.integer(DatabaseConstants.USER_MODIFIED_BY_COL);
                table.unique(DatabaseConstants.USER_USERNAME_COL);

                table.integer(DatabaseConstants.USER_ROLEID_COL).unsigned().references(DatabaseConstants.ROLE_ID_COL).inTable(DatabaseConstants.SCHEMA + '.' + DatabaseConstants.USER_DATA_TABLE);
            })
            .createTableIfNotExists(DatabaseConstants.SCHEMA + '.' + DatabaseConstants.CONFIG_DATA_TABLE, (table) => {

                table.increments();
                table.string(DatabaseConstants.CONFIG_ENV_COL, 50);
                table.string(DatabaseConstants.CONFIG_APPNAME_COL, 100);
                table.string(DatabaseConstants.CONFIG_URL_SIGNUP_COL, 100);
                table.string(DatabaseConstants.CONFIG_URL_SIGNIN_COL, 100);
                table.string(DatabaseConstants.CONFIG_URL_RESET_PASSWORD_COL, 100);
                table.string(DatabaseConstants.CONFIG_URL_APP_COL, 100);

                table.timestamp(DatabaseConstants.CONFIG_CREATED_TIME_COL, 'timestamptz');
                table.integer(DatabaseConstants.CONFIG_CREATED_BY_COL);
                table.timestamp(DatabaseConstants.CONFIG_MODIFIED_TIME_COL, 'timestamptz');
                table.integer(DatabaseConstants.CONFIG_MODIFIED_BY_COL);

                table.unique(DatabaseConstants.CONFIG_ENV_COL);
            })

            .then((obj) => {
                console.log("Create master data table successful ::: ", obj);
            })
            .catch((err) => {
                console.log("Error when creating master data table ::: ", err);
            });
    }
}