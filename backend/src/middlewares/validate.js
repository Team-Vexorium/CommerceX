const validate = (schema) => (req, _res, next) => {
  const parsed = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query
  });

  if (!parsed.success) {
    return next({
      statusCode: 400,
      message: parsed.error.issues.map((issue) => issue.message).join(', ')
    });
  }

  req.validated = parsed.data;
  return next();
};

module.exports = validate;
