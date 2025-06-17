import Joi from "joi";

export const createCustomer = (data) => {
  const checker = Joi.object({
    email: Joi.string().min(4).required(),
    phone_number: Joi.string()
      .required()
      .regex(/^\+998\s?(9[012345789]|3[3]|7[1])\s?\d{3}\s?\d{2}\s?\d{2}$/)
      .required(),
  });
  return checker.validate(data);
};

export const updateCustomer = (data) => {
  const checker = Joi.object({
    email: Joi.string().min(4),
    phone_number: Joi.string()
      .required()
      .regex(/^\+998\s?(9[012345789]|3[3]|7[1])\s?\d{3}\s?\d{2}\s?\d{2}$/),
  });
  return checker.validate(data);
};
