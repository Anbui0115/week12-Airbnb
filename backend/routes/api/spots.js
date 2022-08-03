const express = require('express')

const { setTokenCookie, restoreUser,requireAuth  } = require('../../utils/auth');
const { User,Spot,Image,Review } = require('../../db/models');
const { Op } = require("sequelize");
const router = express.Router();
const { Sequelize} = require('sequelize');
//start phase 5
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



const validateSpot =[
check('address')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
    check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
    check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
    check('lat')
    .isDecimal()
    // .custom((value)=>{
    //     if(value <0){
    //         throw new Error("Latitude is not valid")
    //     }
    // }
    // )
    .withMessage('Latitude is not valid'),
    check('lng')
    .isDecimal()
    // .custom((value)=>{
    //     if(value < -180 || value > 180 ){
    //         throw new Error("Longitude is not valid")
    //     }
    // })
    .withMessage('Longitude is not valid'),
    check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
    check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
    check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
  handleValidationErrors
]

router.get('/',async (req,res)=>{
//     const reviewCount = await Review.count();
// console.log(reviewCount,"this is review count")

const spots = await Spot.findAll({
attributes:{
    include:[
    [Sequelize.literal('url'),"previewImage"],
    // [Sequelize.fn('AVG', Sequelize.col('stars')), "avgRating"]
]},
    include:[
{
    model:Image ,
    where:{
        previewImage:true
    },
         attributes:[],
    },
    // {
    //  model:Review,
    //  attributes:[]
    // }
    ]
})
for(let i =0; i < spots.length;i++){
    let spot = spots[i];
let count = await Review.count({
    where:{
        spotId : spot.dataValues.id
    }
})
let total = await Review.sum('stars',{
    where:{spotId: spot.dataValues.id}
})
spot.dataValues.avgRating = (total/count)
}

// Spots.forEach(spot =>{
//     spot.avgRating= await Review.findAll({
//         attributes:{
//             include:[
//                 [Sequelize.fn('AVG', Sequelize.col('stars')), "avgRating"]
//             ]
//         }
//     })
//     console.log('--------',spot)
// })

res.status(200)
// Spots.previewImage= 'url example.com'
return res.json({spots})
})

router.post('/',requireAuth,validateSpot,async(req,res) =>{
let {address,city,state,country,lat,lng,name,description,price}=req.body;
const newSpot = await Spot.create({
    ownerId:req.user.id,
    address,city,state,country,lat,lng,name,description,price
})
res.status(201)
res.json({newSpot})
})
module.exports=router;
