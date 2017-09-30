
import { MasterCommandController } from '../controller/command/MasterCommandController';
import { DMLMethodEnum } from '../../lib/common/constant/enum/DMLMethodEnum';

export class MasterRest {

    private static INSTANCE: MasterRest;

    private _commandController: MasterCommandController;
    private _server: any;

    constructor(server: any) {
        this._server = server;
        this.loadDependencies();
        this.loadRoutes();
    }

    public static getInstance(server: any): MasterRest {

        if(!MasterRest.INSTANCE) {
            MasterRest.INSTANCE = new MasterRest(server);
        }

        return MasterRest.INSTANCE;
    }

    private loadDependencies(): void {
        this._commandController = MasterCommandController.getInstance();
    }

    private loadRoutes(): void {
        this._server.post('/save', (req, res) => {
            
            this._commandController.doACommand(req, res, DMLMethodEnum.SAVE);
        });

        this._server.post('/update', (req, res) => {
            this._commandController.doACommand(req, res, DMLMethodEnum.UPDATE);
        });
    }
}