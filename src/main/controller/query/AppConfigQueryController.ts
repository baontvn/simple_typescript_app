
import { Request, Response } from 'express';
import { QueryControllerTemplate } from '../../../lib/controller-layer/QueryControllerTemplate';
import { RequestContext } from '../../../lib/controller-layer/RequestContext';
import { RequestUtils } from '../../../lib/controller-layer/RequestUtils';
import { RestStatusFactory } from '../../../lib/controller-layer/RestStatusFactory';

import { AppConfigQR } from '../../repository/qr/AppConfigQR';

export class AppConfigQueryController extends QueryControllerTemplate {

    private static INSTANCE: AppConfigQueryController;

    private _appConfigQr: AppConfigQR;

    constructor() {
        super();
        this.loadDependencies();
    }

    public static getInstance(): AppConfigQueryController {

        if (!AppConfigQueryController.INSTANCE) {
            AppConfigQueryController.INSTANCE = new AppConfigQueryController();
        }

        return AppConfigQueryController.INSTANCE;
    }

    private loadDependencies(): void {
        this._appConfigQr = AppConfigQR.getInstance();
    }

    public async findByKey(req: Request, res: Response): Promise<string> {
        var headers: any = req.headers;
        var requestContext: RequestContext = RequestUtils.getRequestContext(headers);
        var responseBody = await (() => {
            return this._appConfigQr
                .findByKey(requestContext, req.params.userId)
                .then((status) => {
                    console.log(status);
                    return JSON.stringify(status);
                })
                .catch((err) => {
                    return JSON.stringify(RestStatusFactory.getStatus(null, null));
                });
        })();

        return responseBody;
    }

    public async findByQuerystring(req: Request, res: Response): Promise<string> {
        return null;
    }

    public async query(req: Request, res: Response): Promise<string> {
        return null;
    }

    public async queryByDemand(req: Request, res: Response): Promise<string> {
        return null;
    }


}