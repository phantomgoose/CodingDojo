export class ServerResponse {
    private _isError;
    private _comment;
    private _content;

    constructor(response: any) {
        this._isError = response._isError;
        this._comment = response._comment;
        this._content = response._content;
    }

    set isError(val) {
        this._isError = val;
    }

    set comment(val) {
        this._comment = val;
    }

    set content(val) {
        this._content = val;
    }

    get isError() {
        return this._isError;
    }

    get comment() {
        return this._comment;
    }

    get content() {
        return this._content;
    }
}