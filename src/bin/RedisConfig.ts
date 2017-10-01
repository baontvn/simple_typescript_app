var redis = require('redis');

export class RedisConfig {

    private static INSTANCE: RedisConfig;
    private _client: any;
    
    constructor() {
        this.loadDependencies();
    }

    public static getInstance(): RedisConfig {

        if (!RedisConfig.INSTANCE) {
            RedisConfig.INSTANCE = new RedisConfig()
        }

        return RedisConfig.INSTANCE;
    }

    private loadDependencies(): void {
        this._client = redis.createClient();        
        console.log('REDIS CONNECTED>>>>>>');
    }

    public getRedisCache(key: string): any {
        return this._client.get(key, function (err, value) {
            if (err) return null;
            console.log('[REDIS] Cache Info : ');
            console.log(value);
            console.log('---------------------');
            return value;
        });
    }

    public setRedisCache(key: string, value: string): void {
        this._client.set(key, value, function (error) {
            if (error) console.log('[REDIS] Cache updates failed'); 
            console.log('[REDIS] Cache updated!'); 
         });
    }

    public removeRedisCache(key: string): void {
        this._client.del(key, function(err, response) {
            if (response == 1) {
               console.log("[REDIS] Cache deleted Successfully!")
            } else{
             console.log("[REDIS] Cache cannot delete")
            }
         })
    }
}