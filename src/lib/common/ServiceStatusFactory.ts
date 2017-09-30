
import { ServiceStatus } from './ServiceStatus';
import { RestStatusCodeEnum } from './constant/enum/RestStatusCodeEnum';

export class ServiceStatusFactory {

    public static getStatus(key: RestStatusCodeEnum, data: any): ServiceStatus {
        
        if(key === RestStatusCodeEnum.SAVE_SUCCESSFUL) {
            return new ServiceStatus(RestStatusCodeEnum.SAVE_SUCCESSFUL,
                "acknowledged", data);
        }

        if(key === RestStatusCodeEnum.UPDATE_SUCCESSFUL) {
            return new ServiceStatus(RestStatusCodeEnum.UPDATE_SUCCESSFUL,
                "acknowledged", data);
        }

        if(key === RestStatusCodeEnum.DELETE_SUCCESSFUL) {
            return new ServiceStatus(RestStatusCodeEnum.DELETE_SUCCESSFUL,
                "acknowledged", data);
        }

        if(key === RestStatusCodeEnum.QUERY_HAS_DATA) {
            return new ServiceStatus(RestStatusCodeEnum.QUERY_HAS_DATA,
                "acknowledged", data);
        }

        if(key === RestStatusCodeEnum.QUERY_HAS_NO_DATA) {
            return new ServiceStatus(RestStatusCodeEnum.QUERY_HAS_NO_DATA,
                "acknowledged", data);
        }
        
        if(key === RestStatusCodeEnum.DATABASE_ERROR) {
            return new ServiceStatus(RestStatusCodeEnum.DATABASE_ERROR,
                "System got error. Please contact to administrator for support", data);
        }

        return null;
    }
}