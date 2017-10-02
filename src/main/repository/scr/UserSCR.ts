
import { SingleCommandRepository } from '../../../lib/database-layer/SingleCommandRepository';
import { ServiceStatus } from '../../../lib/common/ServiceStatus';
import { RequestContext } from '../../../lib/controller-layer/RequestContext';
import { DMLMethodEnum } from '../../../lib/common/constant/enum/DMLMethodEnum';
import { KnexConfiguration } from '../../../bin/KnexConfiguration';
import { DatabaseConstants } from '../../constant/DatabaseConstants';
import { RestStatusCodeEnum } from '../../../lib/common/constant/enum/RestStatusCodeEnum';
import { ServiceStatusFactory } from '../../../lib/common/ServiceStatusFactory';

export class UserSCR implements SingleCommandRepository {

    private static INSTANCE: UserSCR;

    // USER - 1
    private static DEFAULT_ROLE_ID: any = 1;

    private _knexConfiguration: KnexConfiguration;

    constructor() {
        this.loadDependencies();
    }

    public static getInstance(): UserSCR {

        if (!UserSCR.INSTANCE) {
            UserSCR.INSTANCE = new UserSCR();
        }

        return UserSCR.INSTANCE;
    }

    loadDependencies(): void {
        this._knexConfiguration = KnexConfiguration.getInstance();
    }

    public async save(requestContext: RequestContext, form: any): Promise<ServiceStatus> {

        var serviceStatus = await ((requestContext, form) => {

            var knex = this._knexConfiguration.getKnex();

            return this.checkExistedInfo(DatabaseConstants.USER_DATA_TABLE, DatabaseConstants.USER_USERNAME_COL, form.userName).then((isExisted) => {

                if (isExisted) return { message: "User is existed" };

                return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.USER_DATA_TABLE)
                    .insert({
                        userName: form.userName,
                        hashedPassword: form.hashedPassword,
                        fullName: form.fullName,
                        email: form.email,
                        phone: form.phone,
                        isActive: true,
                        createdBy: requestContext.userId,
                        createdTime: new Date()
                    })
                    .returning(DatabaseConstants.USER_ID_COL)
                    .then((returnIds) => {
                        // Add User and Role
                        var roleIds = form.roleIds.map(roleId => { return { userId: returnIds[0], roleId: roleId } });
                        if (roleIds.length > 0) {
                            knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.USER_ROLE_DATA_TABLE)
                                .insert(roleIds).then(() => {
                                    console.log('Added user and role...');
                                });
                        } else {
                            knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.USER_ROLE_DATA_TABLE)
                                .insert({ userId: returnIds[0], roleId: UserSCR.DEFAULT_ROLE_ID }).then(() => {
                                    console.log('Added user and role...');
                                });
                        }
                        return ServiceStatusFactory
                            .getStatus(RestStatusCodeEnum.SAVE_SUCCESSFUL, returnIds[0]);
                    })
                    .catch((err) => {
                        console.log(err);
                        return ServiceStatusFactory
                            .getStatus(RestStatusCodeEnum.DATABASE_ERROR, undefined);
                    });
            });
        })(requestContext, form);

        return serviceStatus;
    }

    public async update(requestContext: RequestContext, form: any): Promise<ServiceStatus> {
        var serviceStatus = await ((requestContext, form) => {

            var knex = this._knexConfiguration.getKnex();


            return this.checkExistedInfo(DatabaseConstants.USER_DATA_TABLE, DatabaseConstants.USER_USERNAME_COL, form.userName).then((isExisted) => {

                if (!isExisted) return { message: "User is not existed!" };

                return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.USER_DATA_TABLE)
                    .where(DatabaseConstants.USER_USERNAME_COL, form.userName)
                    .update({
                        userName: form.userName,
                        hashedPassword: form.hashedPassword,
                        fullName: form.fullName,
                        email: form.email,
                        phone: form.phone,
                        isActive: form.isActive,
                        editedBy: requestContext.userId,
                        editedTime: new Date()
                    }, [DatabaseConstants.USER_ID_COL, DatabaseConstants.USER_USERNAME_COL, DatabaseConstants.USER_MODIFIED_TIME_COL, DatabaseConstants.USER_MODIFIED_BY_COL])
                    .then((responseData) => {
                        // Update User and Role
                        var roleIds = form.roleIds.map(roleId => { return { userId: responseData[0][DatabaseConstants.USER_ID_COL], roleId: roleId } });

                        console.log(roleIds);
                        if (roleIds.length > 0) {
                            knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.USER_ROLE_DATA_TABLE)
                                .where(DatabaseConstants.USER_ROLE_USERID_BY_COL, responseData[0][DatabaseConstants.USER_ID_COL])
                                .del()
                                .then(() => {
                                    knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.USER_ROLE_DATA_TABLE).insert(roleIds).then(() => {
                                        console.log('Updated user and role...');
                                    });
                                })
                        }
                        return ServiceStatusFactory
                            .getStatus(RestStatusCodeEnum.UPDATE_SUCCESSFUL, responseData[0]);
                    })
                    .catch((err) => {
                        return ServiceStatusFactory
                            .getStatus(RestStatusCodeEnum.DATABASE_ERROR, undefined);
                    });
            });
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
                    return result.length > 0 ? true : false;
                })
                .catch((err) => {
                    return true;
                });

        })(table, columnName, value);

        return serviceStatus;
    }
}