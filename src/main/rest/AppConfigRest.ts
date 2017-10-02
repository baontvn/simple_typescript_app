
import { AppConfigCommandController } from '../controller/command/AppConfigCommandController';
import { AppConfigQueryController } from '../controller/query/AppConfigQueryController';
import { DMLMethodEnum } from '../../lib/common/constant/enum/DMLMethodEnum';

export class AppConfigRest {

    private static INSTANCE: AppConfigRest;

    private _commandController: AppConfigCommandController;
    private _queryController: AppConfigQueryController;
    private _server: any;

    constructor(server: any) {
        this._server = server;
        this.loadDependencies();
        this.loadRoutes();
    }

    public static getInstance(server: any): AppConfigRest {

        if(!AppConfigRest.INSTANCE) {
            AppConfigRest.INSTANCE = new AppConfigRest(server);
        }

        return AppConfigRest.INSTANCE;
    }

    private loadDependencies(): void {
        this._commandController = AppConfigCommandController.getInstance();
        this._queryController = AppConfigQueryController.getInstance();
    }

    private loadRoutes(): void {
        this._server.get('/appconfig/:env', (req, res) => {
            this._queryController.doACommand(req, res, DMLMethodEnum.FIND_BY_KEY);
        });

        this._server.get('/appconfig', (req, res) => {
            this._queryController.doACommand(req, res, DMLMethodEnum.FIND_ALL);
        });
        
        this._server.post('/appconfig', (req, res) => {
            
            this._commandController.doACommand(req, res, DMLMethodEnum.SAVE);
        });

        this._server.put('/appconfig/:env', (req, res) => {
            this._commandController.doACommand(req, res, DMLMethodEnum.UPDATE);
        });

        this._server.delete('/appconfig/:env', (req, res) => {
            this._commandController.doACommand(req, res, DMLMethodEnum.DELETE);
        });

    }
}