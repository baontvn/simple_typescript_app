


export class RequestContext {
    
    private _userId: number;
    private _token: string;

    constructor(userId: number) {
		this._userId = userId;
	}


	public get userId(): number {
		return this._userId;
	}

	public set userId(value: number) {
		this._userId = value;
	}
    
}