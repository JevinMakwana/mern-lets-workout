import express from "express";
import mongoose from "mongoose";
import { verifyToken } from "./users.js";
import { UserModel } from '../models/Users.js';

const router = express.Router();


const exerciseOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '294a8024a3msh7377691810840f7p1d5c68jsna99b30d3df8e',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
};


router.put("/", async (req, res)=> {
    try{
        const user = await UserModel.findById(req.body.userId);
        user.savedExercises.push(req.body.exID);
        await user.save();
        res.json({savedExercises: user.savedExercises});
    }catch(err){
        res.json(err);
    }
});



router.get("/savedExercises/:userId", async (req,res) => {
    try{
        const user = await UserModel.findById(req.params.userId);
        const savedEx = user.savedExercises;
        res.json(savedEx);
    }catch(err){
        res.json("error fromm: /savedRecipes/:userId is:",err);
    }
})

export{ router as savedExerciseRouter}