var redis = require('redis');
import { createClient } from 'then-redis';

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
        this._client = createClient();        
    }

    public getRedisCache(key: string): Promise<any> {
        return this._client.get(key);
    }

    public setRedisCache(key: string, value: string): void {
        this._client.set(key, value);
    }

    public removeRedisCache(key: string): void {
        this._client.del(key)
    }
}