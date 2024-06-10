/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { registerUser, authenticateUser } from '@src/services/auth.service';

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const { user, token } = await registerUser(name, email, password, role);
    res.status(201).json({ user, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authenticateUser(email, password);
    res.status(200).json({ user, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
