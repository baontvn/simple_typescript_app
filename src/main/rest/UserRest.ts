
import { UserCommandController } from '../controller/command/UserCommandController';
import { UserQueryController } from '../controller/query/UserQueryController';
import { DMLMethodEnum } from '../../lib/common/constant/enum/DMLMethodEnum';

export class UserRest {

    private static INSTANCE: UserRest;

    private _commandController: UserCommandController;
    private _queryController: UserQueryController;
    private _server: any;

    constructor(server: any) {
        this._server = server;
        this.loadDependencies();
        this.loadRoutes();
    }

    public static getInstance(server: any): UserRest {

        if(!UserRest.INSTANCE) {
            UserRest.INSTANCE = new UserRest(server);
        }

        return UserRest.INSTANCE;
    }

    private loadDependencies(): void {
        this._commandController = UserCommandController.getInstance();
        this._queryController = UserQueryController.getInstance();
    }

    private loadRoutes(): void {
        this._server.get('/user/:userId', (req, res) => {
            this._queryController.doACommand(req, res, DMLMethodEnum.FIND_BY_KEY);
        });
        
        this._server.post('/user/addNewUser', (req, res) => {
            
            this._commandController.doACommand(req, res, DMLMethodEnum.SAVE);
        });

        this._server.put('/user/:userId', (req, res) => {
            this._commandController.doACommand(req, res, DMLMethodEnum.UPDATE);
        });

        this._server.delete('/user/:userId', (req, res) => {
            this._commandController.doACommand(req, res, DMLMethodEnum.DELETE);
        });

    }
}