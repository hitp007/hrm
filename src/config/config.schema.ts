import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().default('dev'),
  GOOGLE_CLIENT_ID: Joi.string().default(
    '564108622277-c36j9ecvmc5dodf1ertf53rcn9844jda.apps.googleusercontent.com',
  ),
  clientSecret: Joi.string().default('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'),
  APP_GLOBAL_PREFIX: Joi.string().default('tickets'),
  JWT_SECRET: Joi.string().default('abcdABCD1234554321'),
  JWT_EXP_H: Joi.string().default('3600m'),
  JWT_EXP_D: Joi.string().default('1d'),
});
