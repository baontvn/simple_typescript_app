
var fs = require('fs');
var path = require('path');

export class MessageSource {

    private static _INSTANCE: MessageSource;

    private _source: any;
    private _messages: any;

    constructor(source: any) {
        this._source = source;
        this.init();
    }

    public static getInstance(...source: any[]): MessageSource {

        if(!MessageSource._INSTANCE) {
            if(source.length > 0) {
                MessageSource._INSTANCE = new MessageSource(source[0]);
            }
        }

        return MessageSource._INSTANCE;
    }

    private init(): void {
        // check if source is reachable
        if(!this._source) {
            // log
            return;
        }

        var data = fs.readFileSync(this._source, 'utf8');
        if(!data) {
            // log
            console.log('error when reaching message source');
            return;
        }
        
        try {
            this._messages = JSON.parse(data);
            console.log('message source is', this._messages);
        } catch (err) {
            // log
            return;
        }
    }

    public get(key: string): string {

        if(!this._messages) {
            return null;
        }

        if(!this._messages[key]) {
            return null;
        }

        return this._messages[key];
    }
}