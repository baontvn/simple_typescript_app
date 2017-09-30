
import { Request, Response } from 'express';

import { ControllerTemplate } from './ControllerTemplate';
import { DMLMethodEnum } from '../common/constant/enum/DMLMethodEnum';

export abstract class CommandControllerTemplate extends ControllerTemplate {

    constructor() {
        super();
    }

    private getBody(req: Request, res: Response, method: DMLMethodEnum): Promise<string> {
        
        if(method === DMLMethodEnum.SAVE) {
            return this.save(req, res);
        }

        if(method === DMLMethodEnum.UPDATE) {
            return this.update(req, res);
        }

        if(method === DMLMethodEnum.MERGE) {
            return this.merge(req, res);
        }

        if(method === DMLMethodEnum.DELETE) {
            return this.delete(req, res);
        }

        if(method === DMLMethodEnum.BULK) {
            return this.bulk(req, res);
        }
    }

    public doACommand(req: Request, res: Response, method: DMLMethodEnum): void {

        var shouldBizProcess = super.shouldBusinessProcessing(req, res, method);

        if(shouldBizProcess) {
            this.getBody(req, res, method).then((body) => {
                res.json(JSON.parse(body));
            });
        }
    }

    protected abstract save(req: Request, res: Response): Promise<string>;
    protected abstract update(req: Request, res: Response): Promise<string>;
    protected abstract merge(req: Request, res: Response): Promise<string>;
    protected abstract delete(req: Request, res: Response): Promise<string>;
    protected abstract bulk(req: Request, res: Response): Promise<string>;
}