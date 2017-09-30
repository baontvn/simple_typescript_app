
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
var i18n = require('i18n');   

import { ApplicationConfig } from './ApplicationConfig';
import { RestConfiguration } from '../main/rest/RestConfiguration';
import { DatabaseInitializer } from './DatabaseInitializer';
import { KnexConfiguration } from './KnexConfiguration';
import { MessageSource } from '../lib/common/MessageSource';


class Server {

    private _express: express.Application;

    private static MESSAGE_SOURCE_PATH: string = 'message-source-path';

    constructor() {
        this._express = express();
        this.loadDependencies();
    }

    private loadDependencies(): void {

        this._express.use(bodyParser.json());
        this._express.use(bodyParser.urlencoded({extended: true}));

        // load application configs
        var appConfigs = ApplicationConfig.getInstance();

        // load database connection pool using Knex
        var knexConfiguration = KnexConfiguration.getInstance();
        
        // database initialize
        var databaseInitializer = DatabaseInitializer.getInstance();

        // load message source
        var messageSourcePath = appConfigs.getConfig(Server.MESSAGE_SOURCE_PATH);
        var messageSource = MessageSource.getInstance(messageSourcePath);

        // load rests
        var restConfiguration = new RestConfiguration(this._express);
        restConfiguration.configure();

        i18n.configure({
            locales: ['en'],
            defaultLocale: 'en',
            autoReload: true,
            directory: __dirname + '/locales'
        });

        // set i18n to express
        this._express.use(i18n.init);
    }

	public get express(): express.Application {
		return this._express;
	}

	public set express(value: express.Application) {
		this._express = value;
	}
}

export default new Server().express;




