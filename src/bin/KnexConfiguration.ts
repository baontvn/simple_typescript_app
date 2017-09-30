
var Knex = require('knex');

import { ApplicationConfig } from './ApplicationConfig';

export class KnexConfiguration {

    private static INSTANCE: KnexConfiguration;
    private _appConfigs: ApplicationConfig;

    private _provider: string;
    private _host: string;
    private _databaseName: string;
    private _port: number;
    private _userName: string;
    private _userSecret: string;

    private _poolSizeMin: number; 
    private _poolSizeMax: number; 

    private _knex: any;

    constructor() {
        this._appConfigs = ApplicationConfig.getInstance();
        this.configure();
    }

    public static getInstance(): KnexConfiguration {

        if(!KnexConfiguration.INSTANCE) {
            KnexConfiguration.INSTANCE = new KnexConfiguration();
        }

        return KnexConfiguration.INSTANCE;
    }

    configure(): void {
        if(this._appConfigs) {
            this._provider = this._appConfigs.getConfig("database-provider");
            this._host = this._appConfigs.getConfig("database-host");
            this._databaseName = this._appConfigs.getConfig("database-name");
            this._port = this._appConfigs.getConfig("database-port");
            this._userName = this._appConfigs.getConfig("database-user");
            this._userSecret = this._appConfigs.getConfig("database-secret");
            this._poolSizeMin = this._appConfigs.getConfig("database-pool-size-min");
            this._poolSizeMax = this._appConfigs.getConfig("database-pool-size-max");

            if(!this._provider ||
                !this._host ||
                !this._databaseName ||
                !this._port || 
                !this._userName || 
                !this._userSecret) {

                    // log
                    return;
            }

            this._knex = Knex({
                client: this._provider,
                connection: {
                    host: this._host,
                    user: this._userName,
                    password: this._userSecret,
                    database: this._databaseName
                },
                pool: {
                    min: this._poolSizeMin,
                    max: this._poolSizeMax
                },
                debug: true
            });
        }
    }

    public getKnex(): any {
        return this._knex;
    }
}