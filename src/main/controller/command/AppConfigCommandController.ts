
import { Request, Response } from 'express';
import { RequestContext } from '../../../lib/controller-layer/RequestContext';
import { RequestUtils } from '../../../lib/controller-layer/RequestUtils';
import { CommandControllerTemplate } from '../../../lib/controller-layer/CommandControllerTemplate';
import { AppConfigSCR } from '../../repository/scr/AppConfigSCR';
import { RestStatusFactory } from '../../../lib/controller-layer/RestStatusFactory';

export class AppConfigCommandController extends CommandControllerTemplate {

    private static INSTANCE: AppConfigCommandController;

    private _appConfigScr: AppConfigSCR;

    constructor() {
        super();
        this.loadDependencies();
    }

    public static getInstance(): AppConfigCommandController {
        
        if(!AppConfigCommandController.INSTANCE) {
            AppConfigCommandController.INSTANCE = new AppConfigCommandController();
        }

        return AppConfigCommandController.INSTANCE;
    }

    private loadDependencies(): void {
        this._appConfigScr = AppConfigSCR.getInstance();
    }
    
    public async save(req: Request, res: Response): Promise<string> {

        var headers: any = req.headers;
        var form: any = req.body.command;
        var requestContext: RequestContext = RequestUtils.getRequestContext(headers);
        var responseBody = await (() => { 
            return this._appConfigScr
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
            return this._appConfigScr
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
        var env: string = req.params.env;
        var requestContext: RequestContext = RequestUtils.getRequestContext(headers);
    
        var responseBody = await (() => { 
            return this._appConfigScr
                .delete(requestContext, env)
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