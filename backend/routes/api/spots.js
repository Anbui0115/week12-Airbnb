const express = require('express')

const { setTokenCookie, restoreUser,requireAuth  } = require('../../utils/auth');
const { User,Spot } = require('../../db/models');

const router = express.Router();

//start phase 5
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/',async (req,res)=>{
const allSpots = await Spot.findAll()
res.status(200)
res.json(allSpots)
})

module.exports=router;
