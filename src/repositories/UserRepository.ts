import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { GenderEnum, Role, RoleEnum } from "../enums/enums";
import { RegisterUserInfo } from "../types/CreateUserInfo";

export const registerUser = async (paramsData: RegisterUserInfo) => {
  const { name, email, password } = paramsData;

  // adding New User info + company newly created
  const userRepository = getRepository(User);
  const user = new User();
  user.email = email;
  user.password = password;
  user.name = name;
  await userRepository.save(user);
  return user;
};

// DONE
export const createUser = async (paramsData: any, avatar: any) => {
  const { name, email, password } = paramsData;
  try {
    // adding New User info + company newly created
    const userRepository = getRepository(User);
    const user = new User();
    user.email = email;
    user.name = name;
    password && (user.password = password);
    await userRepository.save(user);
    return user;
  } catch (error) {
    // Handle the error
    console.error("Error Creating Employee:", error);
    return;
  }
};

// DONE
export const getByEmail = async (email: string) => {
  const userRepository = getRepository(User);
  const user = await userRepository
    .createQueryBuilder("user")
    .where("user.email = :email", { email: email })
    .select(["user.id", "user.password", "user.email", "user.name", "user.temp_password_code"])
    .getOne();
  return user;
};

// DONE
export const getById = async (id: string) => {
  const userRepository = getRepository(User);
  const user = await userRepository
    .createQueryBuilder("user")
    .where("user.id = :id", { id: id })
    .select(["user.id", "user.password", "user.email", "user.name"])
    .getOne();
  return user;
};

// DONE
export const getWithPasswordById = async (id: string) => {
  const userRepository = getRepository(User);
  const user = await userRepository
    .createQueryBuilder("user")
    .where("user.id = :id", { id: id })
    .select(["user.id", "user.password", "user.email", "user.name"])
    .getOne();
  return user;
};
