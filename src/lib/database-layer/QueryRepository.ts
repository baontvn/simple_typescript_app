
import { ServiceStatus } from '../common/ServiceStatus';
import { RequestContext } from '../controller-layer/RequestContext';

export interface QueryRepository {

    findByKey(requestContext: RequestContext, key: any): Promise<ServiceStatus>;
    findByQueryString(requestContext: RequestContext, ...args: any[]): Promise<ServiceStatus>;
    query(requestContext: RequestContext, form: any): Promise<ServiceStatus>;
    queryByDemand(requestContext: RequestContext, form: any): Promise<ServiceStatus>;
    findAll(requestContext: RequestContext): Promise<ServiceStatus>;
}