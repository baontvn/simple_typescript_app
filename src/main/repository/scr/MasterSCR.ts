
import { SingleCommandRepository } from '../../../lib/database-layer/SingleCommandRepository';
import { ServiceStatus } from '../../../lib/common/ServiceStatus';
import { RequestContext } from '../../../lib/controller-layer/RequestContext';
import { DMLMethodEnum } from '../../../lib/common/constant/enum/DMLMethodEnum';
import { KnexConfiguration } from '../../../bin/KnexConfiguration';
import { DatabaseConstants } from '../../constant/DatabaseConstants';
import { RestStatusCodeEnum } from '../../../lib/common/constant/enum/RestStatusCodeEnum';
import { ServiceStatusFactory } from '../../../lib/common/ServiceStatusFactory';

export class MasterSCR implements SingleCommandRepository {

    private static INSTANCE: MasterSCR;

    private _knexConfiguration: KnexConfiguration;

    constructor() {
        this.loadDependencies();
    }

    public static getInstance(): MasterSCR {

        if (!MasterSCR.INSTANCE) {
            MasterSCR.INSTANCE = new MasterSCR();
        }

        return MasterSCR.INSTANCE;
    }

    loadDependencies(): void {
        this._knexConfiguration = KnexConfiguration.getInstance();
    }

    public async save(requestContext: RequestContext, form: any): Promise<ServiceStatus> {

        // var serviceStatus = await ((requestContext, form) => {

        //     var knex = this._knexConfiguration.getKnex();

        //     return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.MASTER_DATA_TABLE)
        //         .insert({
        //             key: form.key,
        //             category: form.category,
        //             name: form.name,
        //             description: !form.description ? null : form.description,
        //             value1: !form.value1 ? null : form.value1,
        //             value2: !form.value2 ? null : form.value2,
        //             value3: !form.value3 ? null : form.value3,
        //             value4: !form.value4 ? null : form.value4,
        //             value5: !form.value5 ? null : form.value5,
        //             createdBy: requestContext.userId,
        //             createdTime: new Date()
        //         })
        //         .returning(DatabaseConstants.ID_COL)
        //         .then((returnId) => {
        //             return ServiceStatusFactory
        //                 .getStatus(RestStatusCodeEnum.SAVE_SUCCESSFUL, returnId);
        //         })
        //         .catch((err) => {
        //             return ServiceStatusFactory
        //                 .getStatus(RestStatusCodeEnum.DATABASE_ERROR, undefined);
        //         });

        // })(requestContext, form);

        // return serviceStatus;
        return null;
    }

    public async update(requestContext: RequestContext, form: any): Promise<ServiceStatus> {

        // var serviceStatus = await((requestContext, form) => {

        //     var knex = this._knexConfiguration.getKnex();

        //     return knex(DatabaseConstants.SCHEMA + "." + DatabaseConstants.MASTER_DATA_TABLE)
        //         .where(DatabaseConstants.KEY_COL , form.key)
        //         .then((returnId) => {
        //             return ServiceStatusFactory
        //                 .getStatus(RestStatusCodeEnum.SAVE_SUCCESSFUL, returnId);
        //         })
        //         .catch((err) => {
        //             return ServiceStatusFactory
        //                 .getStatus(RestStatusCodeEnum.DATABASE_ERROR, undefined);
        //         });

        // })(requestContext, form);

        // return serviceStatus;
        return null;
    }

    saveOrUpdate(requestContext: RequestContext, form: any): Promise<ServiceStatus> {
        return null;
    }

    delete(requestContext: RequestContext, form: any): Promise<ServiceStatus> {
        return null;
    }
}