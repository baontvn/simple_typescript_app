
import { Request, Response } from 'express';
import { QueryControllerTemplate } from '../../../lib/controller-layer/QueryControllerTemplate';
import { RequestContext } from '../../../lib/controller-layer/RequestContext';
import { RequestUtils } from '../../../lib/controller-layer/RequestUtils';
import { RestStatusFactory } from '../../../lib/controller-layer/RestStatusFactory';

import { UserQR } from '../../repository/qr/UserQR';

export class UserQueryController extends QueryControllerTemplate {

    private static INSTANCE: UserQueryController;

    private _userQr: UserQR;

    constructor() {
        super();
        this.loadDependencies();
    }

    public static getInstance(): UserQueryController {

        if (!UserQueryController.INSTANCE) {
            UserQueryController.INSTANCE = new UserQueryController();
        }

        return UserQueryController.INSTANCE;
    }

    private loadDependencies(): void {
        this._userQr = UserQR.getInstance();
    }

    public async findByKey(req: Request, res: Response): Promise<string> {
        var headers: any = req.headers;
        var requestContext: RequestContext = RequestUtils.getRequestContext(headers);
        var responseBody = await (() => {
            return this._userQr
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