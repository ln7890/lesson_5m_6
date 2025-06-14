import Joi from "joi";

export const ticketValidation = (data) => {
  const managerVal = Joi.object({
    transport_id: Joi.string().required(),
    from: Joi.string().required(),
    to: Joi.string().required(),
    price: Joi.number().required(),
    departure: Joi.string().required(),
    arrival: Joi.string().required(),
  });
  return managerVal.validate(data);
};

export const updateTcktVld = (data) => {
  const managerVal = Joi.object({
    transport_id: Joi.string(),
    from: Joi.string(),
    to: Joi.string(),
    price: Joi.number(),
    departure: Joi.string(),
    arrival: Joi.string(),
  });
  return managerVal.validate(data);
};
