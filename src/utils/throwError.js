export const throwError = (message, statusCode , success) => {
    const error = new Error();
    statusCode = statusCode || 500;
    message = message || "Internal Server Error";
    error.statusCode = statusCode;
    error.success = success;
    error.message = message;
    throw error; 
}