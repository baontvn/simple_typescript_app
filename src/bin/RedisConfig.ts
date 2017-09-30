var redis = require('redis');

class Redis {

    private static INSTANCE: Redis;
    private _client: any;
    
    constructor() {
        this.loadDependencies();
    }

    public static getInstance(): Redis {

        if (!Redis.INSTANCE) {
            Redis.INSTANCE = redis.createClient(6379, '127.0.0.1');
        }

        return Redis.INSTANCE;
    }

    private loadDependencies(): void {
        this._client = Redis.getInstance();
    }

    public getRedisCache(key: string): any {
        return this._client.get(key, function (err, value) {
            if (err) return null;
            return value;
        });
    }

    public setRedisCache(key: string, value: string): void {
        this._client.set(String, JSON.stringify(value), function (error) { });
    }
}