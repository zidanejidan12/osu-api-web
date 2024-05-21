import { OsuUser } from '../../domain/models/osuUser';

export const saveUserData = async (userId: string, data: any) => {
  const existingUser = await OsuUser.findOne({ userId });

  if (existingUser) {
    existingUser.data = data;
    existingUser.updatedAt = new Date();
    await existingUser.save();
  } else {
    const newUser = new OsuUser({ userId, data });
    await newUser.save();
  }
};

export const getUserData = async (userId: string) => {
  return await OsuUser.findOne({ userId });
};
