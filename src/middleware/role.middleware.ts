import { Request, Response, NextFunction } from 'express';

export const checkRole =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (userRole && roles.includes(userRole)) {
      next();
    }
    return res
      .status(403)
      .json({ message: 'Access denied: insufficient permissions' });
  };
