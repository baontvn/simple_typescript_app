
import { RestStatus } from '../../lib/controller-layer/RestStatus';

import { HttpStatusEnum } from '../../lib/common/constant/enum/HttpStatusEnum';
import { RestStatusCodeEnum } from '../../lib/common/constant/enum/RestStatusCodeEnum';


export class RestStatusFactory {
    
    constructor() {}

    public static getStatus(key: string, data: any[]): RestStatus {

        if(key === RestStatusCodeEnum.SAVE_SUCCESSFUL) {
            return new RestStatus(HttpStatusEnum.OK, 
                RestStatusCodeEnum.SAVE_SUCCESSFUL, null, null);
        }

        return null;
    }
}