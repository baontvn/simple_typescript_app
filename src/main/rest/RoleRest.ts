
import { RoleCommandController } from '../controller/command/RoleCommandController';
import { RoleQueryController } from '../controller/query/RoleQueryController';
import { DMLMethodEnum } from '../../lib/common/constant/enum/DMLMethodEnum';

export class RoleRest {

    private static INSTANCE: RoleRest;

    private _commandController: RoleCommandController;
    private _queryController: RoleQueryController;
    private _server: any;

    constructor(server: any) {
        this._server = server;
        this.loadDependencies();
        this.loadRoutes();
    }

    public static getInstance(server: any): RoleRest {

        if(!RoleRest.INSTANCE) {
            RoleRest.INSTANCE = new RoleRest(server);
        }

        return RoleRest.INSTANCE;
    }

    private loadDependencies(): void {
        this._commandController = RoleCommandController.getInstance();
        this._queryController = RoleQueryController.getInstance();
    }

    private loadRoutes(): void {
        this._server.get('/role/:roleId', (req, res) => {
            this._queryController.doACommand(req, res, DMLMethodEnum.FIND_BY_KEY);
        });
        
        this._server.post('/role', (req, res) => {
            
            this._commandController.doACommand(req, res, DMLMethodEnum.SAVE);
        });

        this._server.put('/role/:roleId', (req, res) => {
            this._commandController.doACommand(req, res, DMLMethodEnum.UPDATE);
        });

        this._server.delete('/role/:roleId', (req, res) => {
            this._commandController.doACommand(req, res, DMLMethodEnum.DELETE);
        });

    }
}