const foodModel = require('../models/food.model');
const storqgeService = require("../services/storage.service")
const likeModel = require("../models/likes.model")
const Food = require("../models/food");

const {v4:uuid} = require("uuid")
async function createFood(req, res) {

    console.log(req.foodPartner)
    console.log(req.body)
    console.log(req.file)

const fileUploadResult = await storqgeService.uploadFile(req.file.buffer,uuid())
console.log(fileUploadResult)

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    res.send("Food item created")
}

async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    })
}


async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "Food unliked successfully"
        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message: "Food liked successfully",
        like
    })

}

async function saveFood(req, res) {

    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })

}

async function getSaveFood(req, res) {

    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });

}
exports.getFeed = async (req, res) => {
  try {
    const feed = await Food.find().populate("likes saves comments.user", "fullName email");
    res.json(feed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like/unlike
exports.toggleLike = async (req, res) => {
  try {
    const { foodId } = req.body;
    const userId = req.user.id;

    const food = await Food.findById(foodId);
    if (!food) return res.status(404).json({ error: "Food not found" });

    if (food.likes.includes(userId)) {
      food.likes.pull(userId); // unlike
    } else {
      food.likes.push(userId);
    }

    await food.save();
    res.json({ likes: food.likes.length, likedBy: food.likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Save/unsave
exports.toggleSave = async (req, res) => {
  try {
    const { foodId } = req.body;
    const userId = req.user.id;

    const food = await Food.findById(foodId);
    if (!food) return res.status(404).json({ error: "Food not found" });

    if (food.saves.includes(userId)) {
      food.saves.pull(userId); // unsave
    } else {
      food.saves.push(userId);
    }

    await food.save();
    res.json({ saves: food.saves.length, savedBy: food.saves });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Comment
exports.addComment = async (req, res) => {
  try {
    const { foodId, text } = req.body;
    const userId = req.user.id;

    const food = await Food.findById(foodId);
    if (!food) return res.status(404).json({ error: "Food not found" });

    food.comments.push({ user: userId, text });
    await food.save();

    res.json(food.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood
}