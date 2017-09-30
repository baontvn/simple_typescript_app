
var fs = require('fs'),
    path = require('path');

export class ApplicationConfig {

    private static INSTANCE: ApplicationConfig;

    private _configs: any;

    constructor() {
        this.loadConfigs();
    }

    public static getInstance(): ApplicationConfig {
        
        if(!ApplicationConfig.INSTANCE) {
            ApplicationConfig.INSTANCE = new ApplicationConfig();
        }

        return ApplicationConfig.INSTANCE;
    }

    private loadConfigs(): void {

        var data = fs.readFileSync(path.join(__dirname, './application.json'), 'utf8');
        if(!data) {
            // log
            console.log('error when reaching application config file');
            return;
        }
        
        try {
            this._configs = JSON.parse(data);
            console.log('application configs are: ', this._configs);
        } catch (err) {
            // log
            return;
        }
    }


	public getConfig(key: string): any {
        
        if(!this._configs || !this._configs[key]) {
            return null;
        }

        return this._configs[key];
	}
}