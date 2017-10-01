
import { SingleCommandRepository } from '../../../lib/database-layer/SingleCommandRepository';
import { ServiceStatus } from '../../../lib/common/ServiceStatus';
import { RequestContext } from '../../../lib/controller-layer/RequestContext';
import { DMLMethodEnum } from '../../../lib/common/constant/enum/DMLMethodEnum';
import { KnexConfiguration } from '../../../bin/KnexConfiguration';
import { RedisConfig } from '../../../bin/RedisConfig';
import { DatabaseConstants } from '../../constant/DatabaseConstants';
import { RestStatusCodeEnum } from '../../../lib/common/constant/enum/RestStatusCodeEnum';
import { ServiceStatusFactory } from '../../../lib/common/ServiceStatusFactory';

export class AppConfigSCR implements SingleCommandRepository {

    private static INSTANCE: AppConfigSCR;

    private _knexConfiguration: KnexConfiguration;
    private _redisConfiguration: RedisConfig;

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
        this._redisConfiguration = RedisConfig.getInstance();
    }

    public async save(requestContext: RequestContext, form: any): Promise<ServiceStatus> {

        var serviceStatus = await ((requestContext, form) => {

            var knex = this._knexConfiguration.getKnex();
            var newConfig = {
                appName: form.appName,
                environment: form.environment,
                urlSignUp: form.urlSignUp,
                urlSignIn: form.urlSignIn,
                urlResetPassword: form.urlResetPassword,
                urlApplication: form.urlApplication,
                createdBy: requestContext.userId,
                createdTime: new Date()
            };

            return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.CONFIG_DATA_TABLE)
                .insert(newConfig)
                .returning(DatabaseConstants.USER_ID_COL)
                .then((returnId) => {
                    this._redisConfiguration.setRedisCache(`appConfig_${form.environment}`, JSON.stringify(newConfig));
                    
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

            var updatedConfig = {
                appName: form.appName,
                environment: form.environment,
                urlSignUp: form.urlSignUp,
                urlSignIn: form.urlSignIn,
                urlResetPassword: form.urlResetPassword,
                urlApplication: form.urlApplication,
                editedBy: requestContext.userId,
                editedTime: new Date()
            };

            return this.checkExistedInfo(DatabaseConstants.CONFIG_DATA_TABLE, DatabaseConstants.CONFIG_ENV_COL, form.environment).then((isExisted) => {

                return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.CONFIG_DATA_TABLE)
                    .where(DatabaseConstants.CONFIG_ENV_COL, form.environment)
                    .update(updatedConfig, [DatabaseConstants.CONFIG_ENV_COL, DatabaseConstants.CONFIG_MODIFIED_BY_COL, DatabaseConstants.CONFIG_MODIFIED_TIME_COL])
                    .then((returnId) => {
                        this._redisConfiguration.setRedisCache(`appConfig_${form.environment}`, JSON.stringify(updatedConfig));
                        
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

    public async delete(requestContext: RequestContext, environment: string): Promise<ServiceStatus> {
        var serviceStatus = await ((requestContext, environment) => {

            var knex = this._knexConfiguration.getKnex();

            return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.CONFIG_DATA_TABLE)
                .where(DatabaseConstants.CONFIG_ENV_COL, environment)
                .del()
                .then((returnId) => {
                    return ServiceStatusFactory
                        .getStatus(RestStatusCodeEnum.DELETE_SUCCESSFUL, returnId);
                })
                .catch((err) => {
                    return ServiceStatusFactory
                        .getStatus(RestStatusCodeEnum.DATABASE_ERROR, undefined);
                });

        })(requestContext, environment);

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