
import { QueryRepository } from '../../../lib/database-layer/QueryRepository';
import { ServiceStatus } from '../../../lib/common/ServiceStatus';
import { RequestContext } from '../../../lib/controller-layer/RequestContext';
import { DMLMethodEnum } from '../../../lib/common/constant/enum/DMLMethodEnum';
import { KnexConfiguration } from '../../../bin/KnexConfiguration';
import { DatabaseConstants } from '../../constant/DatabaseConstants';
import { RestStatusCodeEnum } from '../../../lib/common/constant/enum/RestStatusCodeEnum';
import { ServiceStatusFactory } from '../../../lib/common/ServiceStatusFactory';

export class UserQR implements QueryRepository {

    private static INSTANCE: UserQR;

    private _knexConfiguration: KnexConfiguration;

    constructor() {
        this.loadDependencies();
    }

    public static getInstance(): UserQR {

        if (!UserQR.INSTANCE) {
            UserQR.INSTANCE = new UserQR();
        }

        return UserQR.INSTANCE;
    }

    loadDependencies(): void {
        this._knexConfiguration = KnexConfiguration.getInstance();
    }

    public async findByKey(requestContext: RequestContext, userName: string): Promise<ServiceStatus> {

        var serviceStatus = await ((requestContext) => {

            var knex = this._knexConfiguration.getKnex();
            var userInfo = {roleIDs: []};
            return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.USER_DATA_TABLE)
                .where(DatabaseConstants.USER_USERNAME_COL, userName)
                .then((response) => {
                    if (response.length > 0) {
                        userInfo = response[0];
                        return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.USER_ROLE_DATA_TABLE)
                        .where(DatabaseConstants.USER_ROLE_USERID_BY_COL, userInfo[DatabaseConstants.USER_ID_COL])
                    }
                    return {};
                })
                .then((roleIds)=> {
                    if(roleIds.length > 0) userInfo.roleIDs = roleIds.map(role => {return role.roleId});

                    return userInfo ? ServiceStatusFactory
                    .getStatus(RestStatusCodeEnum.QUERY_HAS_DATA, userInfo) : ServiceStatusFactory.getStatus(RestStatusCodeEnum.QUERY_HAS_NO_DATA, null);
                })
                .catch((err) => {
                    console.log(err);
                    return ServiceStatusFactory
                        .getStatus(RestStatusCodeEnum.DATABASE_ERROR, undefined);
                });

        })(requestContext);

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

    public async findAll(requestContext: RequestContext): Promise<ServiceStatus> {

        var serviceStatus = await ((requestContext) => {

            var knex = this._knexConfiguration.getKnex();
            var users = [];
            return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.USER_DATA_TABLE)
                .select()
                .then((response) => {
                    users = response;
                    if(response.length > 0) {
                        return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.USER_ROLE_DATA_TABLE);
                    }
                })
                .then((userRoles) => {
                    if (userRoles.length > 0) {
                        users.forEach(user => {
                            user.roleIds = userRoles.filter(role => {return role.userId === user.id}).map(roleDetail => {return roleDetail.roleId});
                        });
                    }

                    return ServiceStatusFactory
                        .getStatus(RestStatusCodeEnum.QUERY_HAS_DATA, users)
                })
                .catch((err) => {
                    return ServiceStatusFactory
                        .getStatus(RestStatusCodeEnum.DATABASE_ERROR, undefined);
                });

        })(requestContext);

        return serviceStatus;
    }
}