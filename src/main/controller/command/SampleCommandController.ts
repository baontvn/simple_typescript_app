
import { Request, Response } from 'express';
import { CommandControllerTemplate } from '../../../lib/controller-layer/CommandControllerTemplate';

export class SampleCommandController extends CommandControllerTemplate {

    private static INSTANCE: SampleCommandController;

    constructor() {
        super();
    }

    public static getInstance(): SampleCommandController {
        if(!SampleCommandController.INSTANCE) {
            SampleCommandController.INSTANCE = new SampleCommandController();
        }

        return SampleCommandController.INSTANCE;
    }
    
    public save(req: Request, res: Response): Promise<string> {
        return null;
    }
    public update(req: Request, res: Response): Promise<string> {
        return null;
    }
    public merge(req: Request, res: Response): Promise<string> {
        return null;
    }
    public delete(req: Request, res: Response): Promise<string> {
        return null;
    }
    public bulk(req: Request, res: Response): Promise<string> {
        return null;
    }

}