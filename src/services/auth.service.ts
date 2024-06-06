import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@src/models/user.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateToken = (user: any) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret_key', {
    expiresIn: '1h',
  });
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string,
) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  await newUser.save();

  const token = generateToken(newUser);
  return { user: newUser, token };
};

export const authenticateUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user);
  return token;
};
