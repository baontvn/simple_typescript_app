
import { Request, Response } from 'express';
import { RequestContext } from '../../../lib/controller-layer/RequestContext';
import { RequestUtils } from '../../../lib/controller-layer/RequestUtils';
import { CommandControllerTemplate } from '../../../lib/controller-layer/CommandControllerTemplate';
import { UserSCR } from '../../repository/scr/UserSCR';
import { RestStatusFactory } from '../../../lib/controller-layer/RestStatusFactory';

export class UserCommandController extends CommandControllerTemplate {

    private static INSTANCE: UserCommandController;

    private _userScr: UserSCR;

    constructor() {
        super();
        this.loadDependencies();
    }

    public static getInstance(): UserCommandController {
        
        if(!UserCommandController.INSTANCE) {
            UserCommandController.INSTANCE = new UserCommandController();
        }

        return UserCommandController.INSTANCE;
    }

    private loadDependencies(): void {
        this._userScr = UserSCR.getInstance();
    }
    
    public async save(req: Request, res: Response): Promise<string> {

        var headers: any = req.headers;
        var form: any = req.body.command;
        var requestContext: RequestContext = RequestUtils.getRequestContext(headers);
        var responseBody = await (() => { 
            return this._userScr
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
            return this._userScr
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
        var userId: string = req.params.userId;
        var requestContext: RequestContext = RequestUtils.getRequestContext(headers);
    
        var responseBody = await (() => { 
            return this._userScr
                .delete(requestContext, userId)
                .then((status) => {
                    console.log("asdasdasd" + JSON.stringify(status));
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