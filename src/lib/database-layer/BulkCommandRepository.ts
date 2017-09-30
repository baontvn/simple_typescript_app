
import { ServiceStatus } from '../common/ServiceStatus';
import { RequestContext } from '../controller-layer/RequestContext';

export interface BulkCommandRepository {

    saveAll(requestContext: RequestContext, form: any[]): ServiceStatus;
    updateAll(requestContext: RequestContext, form: any[]): ServiceStatus;
    saveOrUpdateAll(requestContext: RequestContext, form: any[]): ServiceStatus;
    deleteAll(requestContext: RequestContext, ids: number[]): ServiceStatus;
}