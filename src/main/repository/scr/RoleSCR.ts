
import { SingleCommandRepository } from '../../../lib/database-layer/SingleCommandRepository';
import { ServiceStatus } from '../../../lib/common/ServiceStatus';
import { RequestContext } from '../../../lib/controller-layer/RequestContext';
import { DMLMethodEnum } from '../../../lib/common/constant/enum/DMLMethodEnum';
import { KnexConfiguration } from '../../../bin/KnexConfiguration';
import { DatabaseConstants } from '../../constant/DatabaseConstants';
import { RestStatusCodeEnum } from '../../../lib/common/constant/enum/RestStatusCodeEnum';
import { ServiceStatusFactory } from '../../../lib/common/ServiceStatusFactory';

export class RoleSCR implements SingleCommandRepository {

    private static INSTANCE: RoleSCR;

    private _knexConfiguration: KnexConfiguration;

    constructor() {
        this.loadDependencies();
    }

    public static getInstance(): RoleSCR {

        if (!RoleSCR.INSTANCE) {
            RoleSCR.INSTANCE = new RoleSCR();
        }

        return RoleSCR.INSTANCE;
    }

    loadDependencies(): void {
        this._knexConfiguration = KnexConfiguration.getInstance();
    }

    public async save(requestContext: RequestContext, form: any): Promise<ServiceStatus> {

        var serviceStatus = await ((requestContext, form) => {

            var knex = this._knexConfiguration.getKnex();
            return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.ROLE_DATA_TABLE)
                .insert({
                    name: form.name,
                    description: form.description
                })
                .returning(DatabaseConstants.USER_ID_COL)
                .then((returnId) => {
                    return ServiceStatusFactory
                        .getStatus(RestStatusCodeEnum.SAVE_SUCCESSFUL, returnId);
                })
                .catch((err) => {
                    console.log(err);
                    return ServiceStatusFactory
                        .getStatus(RestStatusCodeEnum.DATABASE_ERROR, undefined);
                });

        })(requestContext, form);

        return serviceStatus;
    }

    public async update(requestContext: RequestContext, form: any): Promise<ServiceStatus> {
        var serviceStatus = await ((requestContext, form) => {

            var knex = this._knexConfiguration.getKnex();


            return this.checkExistedInfo(DatabaseConstants.ROLE_DATA_TABLE, DatabaseConstants.ROLE_NAME_COL, form.name).then((isExisted) => {
                return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.ROLE_DATA_TABLE)
                    .where(DatabaseConstants.ROLE_NAME_COL, form.name)
                    .update({
                        name: form.name,
                        description: form.description
                    })
                    .returning(DatabaseConstants.ROLE_ID_COL)
                    .then((returnId) => {
                        return ServiceStatusFactory
                            .getStatus(RestStatusCodeEnum.UPDATE_SUCCESSFUL, returnId);
                    })
                    .catch((err) => {
                        return ServiceStatusFactory
                            .getStatus(RestStatusCodeEnum.DATABASE_ERROR, undefined);
                    });
            })
        })(requestContext, form);

        return serviceStatus;
    }

    saveOrUpdate(requestContext: RequestContext, form: any): Promise<ServiceStatus> {
        return null;
    }

    public async delete(requestContext: RequestContext, roleId: string): Promise<ServiceStatus> {
        var serviceStatus = await ((requestContext, userId) => {

            var knex = this._knexConfiguration.getKnex();

            return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.ROLE_DATA_TABLE)
                .where(DatabaseConstants.ROLE_NAME_COL, roleId)
                .del()
                .then((returnId) => {
                    return ServiceStatusFactory
                        .getStatus(RestStatusCodeEnum.DELETE_SUCCESSFUL, returnId);
                })
                .catch((err) => {
                    return ServiceStatusFactory
                        .getStatus(RestStatusCodeEnum.DATABASE_ERROR, undefined);
                });

        })(requestContext, roleId);

        return serviceStatus;
    }

    public async checkExistedInfo(table: string, columnName: string, value: any): Promise<boolean> {
        var serviceStatus = await ((table, columnName, value) => {

            var knex = this._knexConfiguration.getKnex();

            return knex(DatabaseConstants.SCHEMA + "." + table)
                .where(columnName, value)
                .then((result) => {
                    return result ? true : false;
                })
                .catch((err) => {
                    return true;
                });

        })(table, columnName, value);

        return serviceStatus;
    }
}