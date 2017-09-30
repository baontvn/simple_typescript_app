

export class RestStatus {
    
    private _status: number;
    private _code: string;
    private _message: string;
    private _data: any;

    constructor(status: number, code: string, message: string, data: any) {
        this._status = status;
        this._code = code;
        this._message = message;
        this._data = data;
    }
    
	public get status(): number {
		return this._status;
	}

	public set status(value: number) {
		this._status = value;
	}
        

	public get code(): string {
		return this._code;
	}

	public set code(value: string) {
		this._code = value;
	}

	public get message(): string {
		return this._message;
	}

	public set message(value: string) {
		this._message = value;
	}

	public get data(): any {
		return this._data;
	}

	public set data(value: any) {
		this._data = value;
	}
        
}