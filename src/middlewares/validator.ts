import Joi from 'joi'

export const signupSchema = Joi.object({
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
  email: Joi.string().min(6).max(60).required().email({
    tlds: { allow:[ 'com', 'net' ] }
  }),
  password: Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
})

export const signinSchema = Joi.object({
  email: Joi.string().min(6).max(60).required().email({
    tlds: { allow:[ 'com', 'net' ] }
  }),
  password: Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
})

// export const verifyCodeSchema = Joi.object({
//   provided
// })