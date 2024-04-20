function handleError(...err) {
    const error = new Error;
    error.status = err.status || 500;
    error.message = err.message 

    return error;
}

export default {handleError};