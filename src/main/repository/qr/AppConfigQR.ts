
import { QueryRepository } from '../../../lib/database-layer/QueryRepository';
import { ServiceStatus } from '../../../lib/common/ServiceStatus';
import { RequestContext } from '../../../lib/controller-layer/RequestContext';
import { DMLMethodEnum } from '../../../lib/common/constant/enum/DMLMethodEnum';
import { KnexConfiguration } from '../../../bin/KnexConfiguration';
import { DatabaseConstants } from '../../constant/DatabaseConstants';
import { RestStatusCodeEnum } from '../../../lib/common/constant/enum/RestStatusCodeEnum';
import { ServiceStatusFactory } from '../../../lib/common/ServiceStatusFactory';

export class AppConfigQR implements QueryRepository {

    private static INSTANCE: AppConfigQR;

    private _knexConfiguration: KnexConfiguration;

    constructor() {
        this.loadDependencies();
    }

    public static getInstance(): AppConfigQR {

        if (!AppConfigQR.INSTANCE) {
            AppConfigQR.INSTANCE = new AppConfigQR();
        }

        return AppConfigQR.INSTANCE;
    }

    loadDependencies(): void {
        this._knexConfiguration = KnexConfiguration.getInstance();
    }

    public async findByKey(requestContext: RequestContext, environment: string): Promise<ServiceStatus> {

        var serviceStatus = await ((requestContext, form) => {

            var knex = this._knexConfiguration.getKnex();
            return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.CONFIG_DATA_TABLE)
                .where(DatabaseConstants.CONFIG_ENV_COL, environment)
                .then((userInfo) => {
                    return userInfo ? ServiceStatusFactory
                        .getStatus(RestStatusCodeEnum.QUERY_HAS_DATA, userInfo) : ServiceStatusFactory.getStatus(RestStatusCodeEnum.QUERY_HAS_NO_DATA, null);
                })
                .catch((err) => {
                    return ServiceStatusFactory
                        .getStatus(RestStatusCodeEnum.DATABASE_ERROR, undefined);
                });

        })(requestContext, environment);

        return serviceStatus;
    }

    findByQueryString(requestContext: RequestContext, ...args: any[]): Promise<ServiceStatus> {
        throw new Error("Method not implemented.");
    }
    query(requestContext: RequestContext, form: any): Promise<ServiceStatus> {
        throw new Error("Method not implemented.");
    }
    queryByDemand(requestContext: RequestContext, form: any): Promise<ServiceStatus> {
        throw new Error("Method not implemented.");
    }
}