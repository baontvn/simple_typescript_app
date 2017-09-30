


import { RestStatus } from './RestStatus';
import { RestStatusCodeEnum } from '../common/constant/enum/RestStatusCodeEnum';


export class RestStatusFactory {
    
    constructor() {}

    public static getStatus(key: string, data: any): RestStatus {

        if(key === RestStatusCodeEnum.SAVE_SUCCESSFUL) {
            return new RestStatus(200, "code", "message", "deo co data thi biet lam sao");
        }

        if(key === RestStatusCodeEnum.DATABASE_ERROR) {
            return new RestStatus(200, "code", "Data System got error. Please contact to admin", 
                null);
        }
        
        return new RestStatus(200, "code", "System got error. Please contact to admin", 
            null);
    }
}