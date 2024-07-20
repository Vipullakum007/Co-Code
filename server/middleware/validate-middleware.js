const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;
        const message = "Fill the input properly";
        const extraDetails = err.errors ? err.errors[0].message : "Unknown validation error";

        const error = {
            status,
            message,
            extraDetails
        };
        next(error);
    }
};

module.exports = { validate };
