
import { QueryRepository } from '../../../lib/database-layer/QueryRepository';
import { ServiceStatus } from '../../../lib/common/ServiceStatus';
import { RequestContext } from '../../../lib/controller-layer/RequestContext';
import { DMLMethodEnum } from '../../../lib/common/constant/enum/DMLMethodEnum';
import { KnexConfiguration } from '../../../bin/KnexConfiguration';
import { DatabaseConstants } from '../../constant/DatabaseConstants';
import { RestStatusCodeEnum } from '../../../lib/common/constant/enum/RestStatusCodeEnum';
import { ServiceStatusFactory } from '../../../lib/common/ServiceStatusFactory';

export class RoleQR implements QueryRepository {

    private static INSTANCE: RoleQR;

    private _knexConfiguration: KnexConfiguration;

    constructor() {
        this.loadDependencies();
    }

    public static getInstance(): RoleQR {

        if (!RoleQR.INSTANCE) {
            RoleQR.INSTANCE = new RoleQR();
        }

        return RoleQR.INSTANCE;
    }

    loadDependencies(): void {
        this._knexConfiguration = KnexConfiguration.getInstance();
    }

    public async findByKey(requestContext: RequestContext, roleName: string): Promise<ServiceStatus> {

        var serviceStatus = await ((requestContext, form) => {

            var knex = this._knexConfiguration.getKnex();

            return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.ROLE_DATA_TABLE)
                .where(DatabaseConstants.ROLE_NAME_COL, roleName)
                .then((userInfo) => {
                    return userInfo ? ServiceStatusFactory
                        .getStatus(RestStatusCodeEnum.QUERY_HAS_DATA, userInfo) : ServiceStatusFactory.getStatus(RestStatusCodeEnum.QUERY_HAS_NO_DATA, null);
                })
                .catch((err) => {
                    return ServiceStatusFactory
                        .getStatus(RestStatusCodeEnum.DATABASE_ERROR, undefined);
                });

        })(requestContext, roleName);

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

    public async findAll(requestContext: RequestContext, queryParams: any): Promise<ServiceStatus> {

        var serviceStatus = await ((requestContext) => {

            var knex = this._knexConfiguration.getKnex();
            
            var result = {
                totalPages: 0,
                totalRecords: 0,
                data: []
            }

            return this.countTotalData(knex, DatabaseConstants.SCHEMA, DatabaseConstants.ROLE_DATA_TABLE)
                .then((response) => {
                    // Calculate the total records and total pages 
                    result.totalRecords = response[0].count;
                    result.totalPages = Math.round((response[0].count / queryParams.pageSize) + 0.5);

                    // Update the query params
                    queryParams.offset = (queryParams.page > result.totalPages) ? 0 : queryParams.pageSize * (queryParams.page - 1);
                })
                .then(() => {
                    return this.getDataByPagination(knex, DatabaseConstants.SCHEMA, DatabaseConstants.ROLE_DATA_TABLE, queryParams);
                })
                .then((responseData) => {
                    result.data = responseData;

                    return ServiceStatusFactory
                        .getStatus(RestStatusCodeEnum.QUERY_HAS_DATA, result)
                })
                .catch((err) => {
                    return ServiceStatusFactory
                        .getStatus(RestStatusCodeEnum.DATABASE_ERROR, undefined);
                });

        })(requestContext);

        return serviceStatus;
    }

    /**
     * countTotalData - Count total number of data
     * @param knex : Query Builder instance
     * @param schema : Schema of DB
     * @param table : Table name of DB
     */
    private countTotalData(knex: any, schema: string, table: string): any {
        return knex(`${schema}.${table}`)
            .count();
    }
    
    /**
     * getDataByPagination - Count total number of data
     * @param knex : Query Builder
     * @param schema : Schema of DB
     * @param table : Table name of DB
     * @param queryParams : included params PAGESIZE, OFFSET, SOFTBY and ORDER to paginate data
     */
    private getDataByPagination(knex: any, schema: string, table: string, queryParams: any): any[] {
        return knex(`${schema}.${table}`)
            .limit(queryParams.pageSize).offset(queryParams.offset).orderBy(queryParams.sortBy, queryParams.order);
    }
}