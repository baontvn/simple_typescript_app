
import { SingleCommandRepository } from '../../../lib/database-layer/SingleCommandRepository';
import { ServiceStatus } from '../../../lib/common/ServiceStatus';
import { RequestContext } from '../../../lib/controller-layer/RequestContext';
import { DMLMethodEnum } from '../../../lib/common/constant/enum/DMLMethodEnum';
import { KnexConfiguration } from '../../../bin/KnexConfiguration';
import { DatabaseConstants } from '../../constant/DatabaseConstants';
import { RestStatusCodeEnum } from '../../../lib/common/constant/enum/RestStatusCodeEnum';
import { ServiceStatusFactory } from '../../../lib/common/ServiceStatusFactory';

export class AppConfigSCR implements SingleCommandRepository {

    private static INSTANCE: AppConfigSCR;

    private _knexConfiguration: KnexConfiguration;

    constructor() {
        this.loadDependencies();
    }

    public static getInstance(): AppConfigSCR {

        if (!AppConfigSCR.INSTANCE) {
            AppConfigSCR.INSTANCE = new AppConfigSCR();
        }

        return AppConfigSCR.INSTANCE;
    }

    loadDependencies(): void {
        this._knexConfiguration = KnexConfiguration.getInstance();
    }

    public async save(requestContext: RequestContext, form: any): Promise<ServiceStatus> {

        var serviceStatus = await ((requestContext, form) => {

            var knex = this._knexConfiguration.getKnex();

            return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.USER_DATA_TABLE)
                .insert({
                    userName: form.userName,
                    hashedPassword: form.hashedPassword,
                    fullName: form.fullName,
                    email: form.email,
                    phone: form.phone,
                    roleId: form.roleId,
                    isActive: true,
                    createdBy: requestContext.userId,
                    createdTime: new Date()
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


            return this.checkExistedInfo(DatabaseConstants.USER_DATA_TABLE, DatabaseConstants.USER_USERNAME_COL, form.userName).then((isExisted) => {

                console.log("User is existed: " + isExisted);

                return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.USER_DATA_TABLE)
                    .where(DatabaseConstants.USER_USERNAME_COL, form.userName)
                    .update({
                        userName: form.userName,
                        hashedPassword: form.hashedPassword,
                        fullName: form.fullName,
                        email: form.email,
                        phone: form.phone,
                        roleId: form.roleId,
                        isActive: form.isActive,
                        editedBy: requestContext.userId,
                        editedTime: new Date()
                    }, [DatabaseConstants.USER_USERNAME_COL, DatabaseConstants.USER_MODIFIED_TIME_COL, DatabaseConstants.USER_MODIFIED_BY_COL])
                    .then((returnId) => {
                        console.log(ServiceStatusFactory
                            .getStatus(RestStatusCodeEnum.UPDATE_SUCCESSFUL, returnId));
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

    public async delete(requestContext: RequestContext, userId: string): Promise<ServiceStatus> {
        var serviceStatus = await ((requestContext, userId) => {

            var knex = this._knexConfiguration.getKnex();

            return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.USER_DATA_TABLE)
                .where(DatabaseConstants.USER_USERNAME_COL, userId)
                .returning(DatabaseConstants.USER_ID_COL)
                .del()
                .then((returnId) => {
                    return ServiceStatusFactory
                        .getStatus(RestStatusCodeEnum.DELETE_SUCCESSFUL, returnId);
                })
                .catch((err) => {
                    return ServiceStatusFactory
                        .getStatus(RestStatusCodeEnum.DATABASE_ERROR, undefined);
                });

        })(requestContext, userId);

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