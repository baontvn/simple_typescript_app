
import { Request, Response } from 'express';
import { QueryControllerTemplate } from '../../../lib/controller-layer/QueryControllerTemplate';
import { RoleQR } from '../../repository/qr/RoleQR';

import { RequestContext } from '../../../lib/controller-layer/RequestContext';
import { RequestUtils } from '../../../lib/controller-layer/RequestUtils';
import { RestStatusFactory } from '../../../lib/controller-layer/RestStatusFactory';

export class RoleQueryController extends QueryControllerTemplate {
    

    private static INSTANCE: RoleQueryController;

    private _roleQr : RoleQR;

    constructor() {
        super();
        this.loadDependencies();
    }

    public static getInstance(): RoleQueryController {
        
        if(!RoleQueryController.INSTANCE) {
            RoleQueryController.INSTANCE = new RoleQueryController();
        }

        return RoleQueryController.INSTANCE;
    }

    private loadDependencies(): void {
        this._roleQr = RoleQR.getInstance();
    }
    
    protected async findByKey(req: Request, res: Response): Promise<string> {
        var headers: any = req.headers;
        var requestContext: RequestContext = RequestUtils.getRequestContext(headers);
        var responseBody = await (() => {
            return this._roleQr
                .findByKey(requestContext, req.params.roleId)
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

    protected findByQuerystring(req: Request, res: Response): Promise<string> {
        return null;
    }

    protected query(req: Request, res: Response): Promise<string> {
        return null;
    }

    protected queryByDemand(req: Request, res: Response): Promise<string> {
        return null;
    }

    public async findAll(req: Request, res: Response): Promise<string> {
        var headers: any = req.headers;
        var requestContext: RequestContext = RequestUtils.getRequestContext(headers);
        var queryParams : any = {
            pageSize : !req.query.pageSize || req.query.pageSize <= 0 ? 10 : req.query.pageSize,
            page : !req.query.page || req.query.page <= 0 ? 1 : req.query.page,
            sortBy : req.query.sortBy ? req.query.sortBy : 'id',
            order: req.query.order ? req.query.order : 'ASC',
        }
        var responseBody = await (() => {
            return this._roleQr
                .findAll(requestContext, queryParams)
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
}