
import { Request, Response } from 'express';
import { QueryControllerTemplate } from '../../../lib/controller-layer/QueryControllerTemplate';

export class SampleQueryController extends QueryControllerTemplate {

    private static INSTANCE: SampleQueryController;

    constructor() {
        super();
    }

    public static getInstance(): SampleQueryController {
        if(!SampleQueryController.INSTANCE) {
            SampleQueryController.INSTANCE = new SampleQueryController();
        }

        return SampleQueryController.INSTANCE;
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