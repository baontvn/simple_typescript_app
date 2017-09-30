
export class ServiceStatus {

    private _code: string;
    private _message: string;
    private _data: any;

    constructor(code: string, message: string, data: string) {
        this._code = code;
        this._message = message;
        this._data = data;
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


