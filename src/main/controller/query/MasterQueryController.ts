
import { Request, Response } from 'express';
import { QueryControllerTemplate } from '../../../lib/controller-layer/QueryControllerTemplate';

export class MasterQueryController extends QueryControllerTemplate {

    private static INSTANCE: MasterQueryController;

    constructor() {
        super();
    }

    public static getInstance(): MasterQueryController {
        
        if(!MasterQueryController.INSTANCE) {
            MasterQueryController.INSTANCE = new MasterQueryController();
        }

        return MasterQueryController.INSTANCE;
    }
    
    protected findByKey(req: Request, res: Response): Promise<string> {
        return null;
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
    

}