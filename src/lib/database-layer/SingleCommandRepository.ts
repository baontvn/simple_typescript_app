
import { ServiceStatus } from '../common/ServiceStatus';
import { RequestContext } from '../controller-layer/RequestContext';

export interface SingleCommandRepository {

    save(requestContext: RequestContext, form: any): Promise<ServiceStatus>;
    update(requestContext: RequestContext, form: any): Promise<ServiceStatus>;
    saveOrUpdate(requestContext: RequestContext, form: any): Promise<ServiceStatus>;
    delete(requestContext: RequestContext, form: any): Promise<ServiceStatus>;
}