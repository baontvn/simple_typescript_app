
import { Request, Response } from 'express';
import { RequestContext } from '../../../lib/controller-layer/RequestContext';
import { RequestUtils } from '../../../lib/controller-layer/RequestUtils';
import { CommandControllerTemplate } from '../../../lib/controller-layer/CommandControllerTemplate';
import { RoleSCR } from '../../repository/scr/RoleSCR';
import { RestStatusFactory } from '../../../lib/controller-layer/RestStatusFactory';

export class RoleCommandController extends CommandControllerTemplate {

    private static INSTANCE: RoleCommandController;

    private _roleScr: RoleSCR;

    constructor() {
        super();
        this.loadDependencies();
    }

    public static getInstance(): RoleCommandController {
        
        if(!RoleCommandController.INSTANCE) {
            RoleCommandController.INSTANCE = new RoleCommandController();
        }

        return RoleCommandController.INSTANCE;
    }

    private loadDependencies(): void {
        this._roleScr = RoleSCR.getInstance();
    }
    
    public async save(req: Request, res: Response): Promise<string> {

        var headers: any = req.headers;
        var form: any = req.body.command;
        var requestContext: RequestContext = RequestUtils.getRequestContext(headers);
    
        var responseBody = await (() => { 
            return this._roleScr
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
            return this._roleScr
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
        var headers: any = req.headers;
        var form: any = req.body.command;
        var requestContext: RequestContext = RequestUtils.getRequestContext(headers);
    
        var responseBody = await (() => { 
            return this._roleScr
                .delete(requestContext, form)
                .then((status) => {
                    return JSON.stringify(status);
                })
                .catch((err) => {
                    return JSON.stringify(RestStatusFactory.getStatus(null, null));
                });
            })();

        return responseBody;
    }

    public async bulk(req: Request, res: Response): Promise<string> {
        return null;
    }

}