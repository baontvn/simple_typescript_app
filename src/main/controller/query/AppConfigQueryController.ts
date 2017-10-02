
import { Request, Response } from 'express';
import { QueryControllerTemplate } from '../../../lib/controller-layer/QueryControllerTemplate';
import { RequestContext } from '../../../lib/controller-layer/RequestContext';
import { RequestUtils } from '../../../lib/controller-layer/RequestUtils';
import { RestStatusFactory } from '../../../lib/controller-layer/RestStatusFactory';
import { RestStatusCodeEnum } from '../../../lib/common/constant/enum/RestStatusCodeEnum';

import { AppConfigQR } from '../../repository/qr/AppConfigQR';

import { RedisConfig } from '../../../bin/RedisConfig';

export class AppConfigQueryController extends QueryControllerTemplate {
    
    private static INSTANCE: AppConfigQueryController;

    private _appConfigQr: AppConfigQR;
    private _redisConfig: RedisConfig;

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
        this._redisConfig = RedisConfig.getInstance();
    }

    public async findByKey(req: Request, res: Response): Promise<string> {
        var headers: any = req.headers;
        var requestContext: RequestContext = RequestUtils.getRequestContext(headers);

        var response = await this._redisConfig.getRedisCache(`appConfig_${req.params.env}`).then((value) => {
            if (value) return JSON.stringify(RestStatusFactory.getStatus(RestStatusCodeEnum.QUERY_HAS_DATA, value));
            else {
                return this._appConfigQr
                .findByKey(requestContext, req.params.env)
                .then((status) => {
                    return JSON.stringify(status);
                })
                .catch((err) => {
                    return JSON.stringify(RestStatusFactory.getStatus(null, null));
                });
            }
            
        });

        return response;
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

    public async findAll(req: Request, res: Response): Promise<string> {
        var headers: any = req.headers;
        var requestContext: RequestContext = RequestUtils.getRequestContext(headers);

        var response = await (()=>{
            return this._appConfigQr
            .findAll(requestContext)
            .then((status) => {
                return JSON.stringify(status);
            })
            .catch((err) => {
                return JSON.stringify(RestStatusFactory.getStatus(null, null));
            });
        })();

        return response;
    }


}