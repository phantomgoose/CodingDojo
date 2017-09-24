module.exports = class ServerResponse {

    constructor(isError, comment, content) {
        this._isError = isError;
        this._comment = comment;
        this._content = content;
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
