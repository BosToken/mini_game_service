module.exports = {
  success: (data, message = "Success") => ({
    status: 200,
    message,
    data,
  }),
  error: (error, status = 500) => ({
    status,
    message: error instanceof Error ? error.message : error,
  }),
};
