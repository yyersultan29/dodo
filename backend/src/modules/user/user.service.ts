import { NotFoundError } from '../../errors';
import { User } from './user.model';

export const getUser = async (userId: string) => {
  try {
    console.log('USER ID ', userId);

    const findUser = await User.findOne({ _id: userId });
    console.log('USER ', findUser);

    if (!findUser) {
      throw new NotFoundError('User not found');
    }
    return findUser;
  } catch (e) {
    throw e;
  }
};
