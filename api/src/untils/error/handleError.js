function handleError(success, status, message, reportMessage) {
    const error = new Error();
    error.success = success;
    error.status = status || 500;
    error.message = message ;
    error.report = reportMessage
    return error;
}

export default handleError;
