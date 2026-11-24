export const throwError = (message, statusCode , success) => {
    const error = new Error();
    message = message || "Internal Server Error";
    error.statusCode = statusCode;
    error.success = success;
    error.message = message;
    throw error; 
}