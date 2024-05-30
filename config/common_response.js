class ApiResponse {
    constructor({message, data = null, status = 'success'}) {
        this.message = message;
        this.data = data;
        this.status = status;
    }
}

module.exports = ApiResponse;