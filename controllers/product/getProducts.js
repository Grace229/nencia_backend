const { auth } = require("firebase-admin");
const { Product } = require("../../models/Product");
const { User } = require('../../models/User');
const axios = require("axios");
const API_KEY = "AIzaSyBVaUyM2tAM70e81HCecdQ8Zbn2fZQoSSY";
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({})
      .populate("author")
      .populate({
        path: "comments",
        options: { sort: { _id: -1 } },
        populate: {
          path: "user",
        },
      });
    if (!allProducts)
      return res.status(500).json({ success: false, msg: "No products found" });
     //here comes the algorithm to show the producs that specific signed in user would like to see
     //get the user id from the token
     const userId = req.user._id;
    //get the user from the database
      let user = await User.findOne({_id: userId}).populate("followers").populate("address")
      let allProductsForUser = await getProductsForUser(user, allProducts);
    return res.status(200).json({
      success: true,
      msg: "All products",
      allProductsForUser,
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

//MARK: - getProductsForUser
const getProductsForUser = async (user, allProducts) => {
  //scores a hashmap of products and their scores
  let scores = new Map();
  //print the user
  let allProductsForUser = [];
  //get the user followers
  //get the user address
  let address = user.address;
  //get the user role
  let role = user.role;
  //set the map
  //loop through all the products
  for (let i = 0; i < allProducts.length; i++) {
    //make a score for each product
    let reason = "";
    let score = 0;
    //get the product author
    if(allProducts[i].author != null){
      let author = allProducts[i].author;
      //author location
      let authorLocation = author.businessAddress;
      //user address
      let userAddress = address;
      let followers = author.followers
      let isFollowing = false; 
      //if the user is following the author of the product, add 10 to the score
     if(followers != null ){
      isFollowing = await userIsFollowingVendor(followers, user);
      if (isFollowing) {
        score += 10;
      }else{
        score += 2;
      }
     }
      // if(vendorIsClose(address, authorLocation)){
        
      //   score += 7;
      // }else{
      //   score += 2;
      // }
      if (allProducts[i].likes.length > 3) {
        score += 7;
      }else{
        score +=2;
      }
      //if product is from current user, add 10 to the score
      if (author.email == user.email) {
        score += 10;
      }else{
        score += 2;
      }
      //if products is new, add 10 to the score
      if (allProducts[i].createdAt > 7) {
        score += 10;
      }else{
        score += 2;
      }
      //what other
  
     //set the score for the product
      scores.set(allProducts[i], score);
    }

    }
   

  //sort the products by their scores
  let sortedProducts = new Map([...scores.entries()].sort((a, b) => b[1] - a[1]));
  //loop through the sorted products
  for (let [key, value] of sortedProducts) {
    //get bussinessName in key
    console.log(key.author.businessName, value);
    if (value >= 20) {
      allProductsForUser.push(key);
    }
  }
  return allProductsForUser; 
};

//MARK: - vendorIsClose
const vendorIsClose = async (userAddress, vendorAddress) => {
let userLatLong = await getLatLongFromPlaceName(userAddress[0].city);
let vendorLatLong = {lat: vendorAddress.lat, lng: vendorAddress.lng};
let distance = await getDistance(userLatLong, vendorLatLong);
let 
if(distance < 10){
  return true;
}else{
  return false;
}
}
//MARK: - userIsFollowingVendor, async 
const userIsFollowingVendor = async (followers, currentUser) => {
  if (followers == null) {
    return false;
  } else {
    let isFollowing = false;
    for (let i = 0; i < followers.length; i++) {
      let follower = await findFollowerById(followers[i]);
      
      if (follower != null) {
        console.log("follower is not null");
  

        if (follower.email == currentUser.email) {
          isFollowing = true;
        }
      }else{
        isFollowing = false;
        console.log("follower is null");
      }
    }
    return isFollowing;
  }
};

//MARK: - findFollowerById, async function that returns a follower
const findFollowerById = async (id) => {
  let follower = await User.findOne({_id: id}).populate("followers").populate("address").exec();
  return follower;
};
module.exports = getAllProducts;


//MARK: - getLatLongFromPlaceName
async function getLatLongFromPlaceName(placeName) {
  
  try {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${placeName}&key=${API_KEY}`;
  let response = await axios.get(url);
  if (response.data.status == "ZERO_RESULTS") {
    return "ZERO_RESULTS";
  }
  else if (response.data.status == "OVER_QUERY_LIMIT") {
    return "OVER_QUERY_LIMIT";
  }
  //log the url
  console.log("url: ", url);
  console.log("response data: ", response.data.results[0])
  let lat = response.data.results[0].geometry.location.lat;
  let lng = response.data.results[0].geometry.location.lng;
  let latLong = { lat: lat, lng: lng };
  return latLong;
  } catch (error) {
    console.log("error: ", error);
  }
}

//MARK: - getDistance
async function getDistance(userLatLong, vendorLatLong) {
  try{
    let url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userLatLong.lat},${userLatLong.lng}&destinations=${vendorLatLong.lat},${vendorLatLong.lng}&key=${API_KEY}`;
  let response = await axios.get(url);
  let distance = response.data.rows[0].elements[0].distance.text;
  let distanceInMiles = distance.split(" ")[0];
  return distanceInMiles;
  }
  catch(error){
    console.log("error: ", error);
  }
}
