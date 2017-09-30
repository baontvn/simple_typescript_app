
import { Request, Response } from 'express';

import { Interceptor } from './Interceptor';
import { DMLMethodEnum } from '../common/constant/enum/DMLMethodEnum';

export abstract class ControllerTemplate {

    private _interceptors: Interceptor[];

    constructor() {}

    protected shouldBusinessProcessing(req: Request, res: Response, 
        method: DMLMethodEnum): Boolean {
        
        return true;
    }

	protected get interceptors(): Interceptor[] {
		return this._interceptors;
	}

	protected set interceptors(value: Interceptor[]) {
		this._interceptors = value;
	}

    protected addInterceptors(interceptors: Interceptor[]) {

        if(interceptors) {
            this._interceptors.concat(interceptors);
        }
    }
}