import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RegisterUserInfo } from "../types/CreateUserInfo";
import { getByEmail, registerUser } from "../repositories/UserRepository";

require('dotenv').config();

const router = Router();
const secretHash = process.env.SECRET_HASH;

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		// Check if the owner exists
		const user = await getByEmail(email)
		if (!user) return res.status(401).json({ msg: "Invalid email or password" });

		// Check if the password is correct
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) return res.status(401).json({ msg: "Invalid email or password" });

		// Generate an access token with user data
		const accessToken = jwt.sign(
			{
				id: user.id,
				name: user.name,
				email: user.email
			},
			secretHash as string,
			{ expiresIn: "30d" }
		);


		const refreshToken = jwt.sign(
			{
				id: user.id,
				name: user.name,
				email: user.email
			},
			secretHash as string,
			{ expiresIn: "60d" }
		);
		// Return the access token and user data in the response
		// return res.status(404).json({ accessToken, userInfo: user });
		return res.status(200).json({
			access: accessToken,
			refresh: refreshToken,
			userInfo: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Server error" });
	}
};

export const register = async (req: Request, res: Response) => {
	try {
		const {
			email,
			password,
			name,
		} = req.body;


		if (!email || !password || !name) return res.status(400).json({ msg: "Required Data Missing" });
		// Check if the user already exists
		const existingUser = await getByEmail(email);
		if (existingUser) return res.status(400).json({ msg: "User already exists" });

		// Input Data
		const hashedPassword = await bcrypt.hash(password, 10);
		const paramsData: RegisterUserInfo = {
			email,
			password: hashedPassword,
			name
		};

		const user = await registerUser(paramsData);
		if (!user) return res
			.status(400)
			.json({ msg: 'Error occurred during Creating New User' })

		// Generate an access token with user data
		const accessToken = jwt.sign(
			{
				id: user.id,
				email: user.email,
				name: user.name,
			},
			secretHash as string,
			{ expiresIn: "30d" }
		);

		const refreshToken = jwt.sign(
			{
				id: user.id,
				email: user.email,
				name: user.name,
			},
			secretHash as string,
			{ expiresIn: "60d" }
		);

		return res.status(200).json({
			access: accessToken,
			refresh: refreshToken,
			userInfo: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Server error" });
	}
};

router.route("/login").post(login);
router.route("/register").post(register);


export { router as AuthRouter };
