export const errorRes = (res, error, code = 500) => {
  const errorMessage = error.message ? error.message : error;
  return res.status(code).json({
    statusCode: code,
    message: errorMessage || "Internal Server Err",
  });
};
