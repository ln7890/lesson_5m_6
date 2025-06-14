import Joi from "joi";
export const transportValid = (data) => {
  const validator = Joi.object({
    transport_type: Joi.string().required(),
    class: Joi.string().required(),
    seat: Joi.number().required(),
  });
  return validator.validate(data);
};

export const updateTrVld = (data) => {
  const validator = Joi.object({
    transport_type: Joi.string(),
    class: Joi.string(),
    seat: Joi.number(),
  });
  return validator.validate(data);
};
