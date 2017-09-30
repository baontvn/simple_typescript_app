
import { Request, Response } from 'express';
import { RequestContext } from '../../../lib/controller-layer/RequestContext';
import { RequestUtils } from '../../../lib/controller-layer/RequestUtils';
import { CommandControllerTemplate } from '../../../lib/controller-layer/CommandControllerTemplate';
import { MasterSCR } from '../../repository/scr/MasterSCR';
import { RestStatusFactory } from '../../../lib/controller-layer/RestStatusFactory';

export class MasterCommandController extends CommandControllerTemplate {

    private static INSTANCE: MasterCommandController;

    private _masterScr: MasterSCR;

    constructor() {
        super();
        this.loadDependencies();
    }

    public static getInstance(): MasterCommandController {
        
        if(!MasterCommandController.INSTANCE) {
            MasterCommandController.INSTANCE = new MasterCommandController();
        }

        return MasterCommandController.INSTANCE;
    }

    private loadDependencies(): void {
        this._masterScr = MasterSCR.getInstance();
    }
    
    public async save(req: Request, res: Response): Promise<string> {

        var headers: any = req.headers;
        var form: any = req.body.command;
        var requestContext: RequestContext = RequestUtils.getRequestContext(headers);
    
        var responseBody = await (() => { 
            return this._masterScr
                .save(requestContext, form)
                .then((status) => {
                    return JSON.stringify(status);
                })
                .catch((err) => {
                    return JSON.stringify(RestStatusFactory.getStatus(null, null));
                });
            })();

        return responseBody;
    }

    public async update(req: Request, res: Response): Promise<string> {
        var headers: any = req.headers;
        var form: any = req.body.command;
        var requestContext: RequestContext = RequestUtils.getRequestContext(headers);
    
        var responseBody = await (() => { 
            return this._masterScr
                .update(requestContext, form)
                .then((status) => {
                    return JSON.stringify(status);
                })
                .catch((err) => {
                    return JSON.stringify(RestStatusFactory.getStatus(null, null));
                });
            })();

        return responseBody;
    }

    public async merge(req: Request, res: Response): Promise<string> {
        return null;
    }

    public async delete(req: Request, res: Response): Promise<string> {
        return null;
    }

    public async bulk(req: Request, res: Response): Promise<string> {
        return null;
    }

}