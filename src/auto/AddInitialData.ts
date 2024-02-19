import { get_Lavista } from "../repositories/LavistaRepository";
import { Lavista } from "../entities/Lavista";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { getByEmail } from "../repositories/UserRepository";

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const addInitialData = async () => {
  await sleep(10000);
  try {
    let existingLavista = await get_Lavista();
    if (!existingLavista) {
      const lavistaRepository = getRepository(Lavista);
      const lavista = new Lavista();
      lavista.name = "Lavista";
      await lavistaRepository.save(lavista);
      existingLavista = lavista;
    }

    let existingAdmin = await getByEmail("mohamed.salah@lavista.com");
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("mohamed.salah", 10);
      const userRepository = getRepository(User);
      const user = new User();
      user.name = "Mohamed Salah";
      user.email = "mohamed.salah@lavista.com";
      user.password = hashedPassword;
      user.lavista = existingLavista;
      await userRepository.save(user);
      existingAdmin = user;
    }
    return existingAdmin;
  } catch (error) {
    console.log("error", error);
    return;
  }
};
