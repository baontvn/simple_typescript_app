
import { Request, Response } from 'express';

import { ControllerTemplate } from './ControllerTemplate';
import { DMLMethodEnum } from '../common/constant/enum/DMLMethodEnum';

export abstract class QueryControllerTemplate extends ControllerTemplate {

    constructor() {
        super();
    }

    private getBody(req: Request, res: Response, method: DMLMethodEnum): Promise<string> {
        
        if(method === DMLMethodEnum.FIND_BY_KEY) {
            return this.findByKey(req, res);
        }

        if(method === DMLMethodEnum.FIND_BY_QUERYSTRING) {
            return this.findByQuerystring(req, res);
        }

        if(method === DMLMethodEnum.QUERY) {
            return this.query(req, res);
        }

        if(method === DMLMethodEnum.FIND_ALL) {
            return this.findAll(req, res);
        }

        if(method === DMLMethodEnum.QUERY_BY_DEMAND) {
            return this.queryByDemand(req, res);
        }

        return null;
    }

    public doACommand(req: Request, res: Response, method: DMLMethodEnum): void {
        
        var shouldBizProcess = super.shouldBusinessProcessing(req, res, method);

        if(shouldBizProcess) {
            this.getBody(req, res, method).then((result) => {
                res.json(JSON.parse(result));
            });
        }

        // get new header

        // res.json(this.getBody(req, res, method));
    }
    
    protected abstract findAll(req: Request, res: Response): Promise<string>;
    protected abstract findByKey(req: Request, res: Response): Promise<string>;
    protected abstract findByQuerystring(req: Request, res: Response): Promise<string>;
    protected abstract query(req: Request, res: Response): Promise<string>;
    protected abstract queryByDemand(req: Request, res: Response): Promise<string>;
}