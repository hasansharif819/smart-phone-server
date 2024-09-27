import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AuthValidations from './Auth.validation';
import AuthControllers from './Auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidations.LoginUserValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
