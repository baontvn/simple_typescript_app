
import { MasterRest } from './MasterRest';
import { UserRest } from './UserRest';
import { RoleRest } from './RoleRest';
import { AppConfigRest } from './AppConfigRest';

export class RestConfiguration {
    
    private _apiRoot: string;
    private _server: any;

    constructor(server: any) {
        this._server = server;
    }

    public configure(): void {        
        
        var masterRest = MasterRest.getInstance(this._server);
        var userRest = UserRest.getInstance(this._server);
        var role = RoleRest.getInstance(this._server);
        var appConfig = AppConfigRest.getInstance(this._server);
    }
}