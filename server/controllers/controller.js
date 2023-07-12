import { userModel } from "../models/userModel.js";


export async function registerUser(req, res) {
    try {

        const { username, password, panDetails, aadhar } = req.body;
        const existingUser = await userModel.findOne({ username: username })
        if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken' })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new userModel({
                username: username,
                password: hashedPassword,
                panDetails: panDetails,
                aadhar: aadhar
            })
            await newUser.save()
            return res.status(200).json({ message: 'User has succesfully registered' })
        }
    } catch (error) {
        console.log(error);
    }
}

export async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username: username })
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({ message: 'Password mismatch' })
        }
        const token = generateToken(user._id);
        res.status(200).json({ token, message: 'Login Successfull' })

    } catch (error) {
        console.log(error);
    }
}