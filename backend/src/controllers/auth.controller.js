const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs');
const foodPartnerModel=require("../models/foodPartner.model")
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {

    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    console.log("JWT_SECRET:","273aaaf228c14ca34f64cf103f51e820");
    const token = jwt.sign({
        id: user._id,
    },"273aaaf228c14ca34f64cf103f51e820")
    

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

async function loginUser(req, res) {

    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, "273aaaf228c14ca34f64cf103f51e820")

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}
function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
}




async function registerFoodPartner(req, res) {

    const { name, email, password, phone, address, contactName } = req.body;

    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email
    })

    if (isAccountAlreadyExists) {
        return res.status(400).json({
            message: "Food partner account already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        contactName
    })

    const token = jwt.sign({
        id: foodPartner._id,
    }, "273aaaf228c14ca34f64cf103f51e820")

    res.cookie("token", token)

    res.status(201).json({
        message: "Food partner registered successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name,
            address: foodPartner.address,
            contactName: foodPartner.contactName,
            phone: foodPartner.phone
        }
    })

}
async function loginFoodPartner(req, res) {
    const { email, password } = req.body;

    try {
        // 1. Find the food partner by their email
        const foodPartner = await foodPartnerModel.findOne({ email });

        if (!foodPartner) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // 2. Compare the provided password with the stored password
        const isMatch = await bcrypt.compare(password, foodPartner.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // 3. Create the payload for the JWT
        const payload = {
            user: {
                id: foodPartner.id
            }
        };

        // 4. Sign the token and include it in the response
        jwt.sign(
            payload,"273aaaf228c14ca34f64cf103f51e820"
            , // Use a secret key from your environment variables
            { expiresIn: '6h' }, // Token expiration time
            (err, token) => {
                if (err) throw err;
                res.json({ 
                    message: "Food Partner logged in successfully",
                    foodPartner: {
                        _id: foodPartner._id,
                        email: foodPartner.email,
                        name: foodPartner.name
                    },
                    token // Add the generated token to the response
                });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}




module.exports = { registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner};