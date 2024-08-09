const mongoose = require('mongoose')
const mongoURL = 'mongodb+srv://krushal_lamba:Krushal5096@cluster0.sdrwc3l.mongodb.net/gofoodMern?retryWrites=true&w=majority&appName=Cluster0'
// const mongoDB = async ()=>{
//         // await mongoose.connect(mongoURL)
//         // console.log('connected to database')
//         await mongoose.connect(mongoURL)
//         .then(() => {
//             console.log("Connected to MongoDB");
//             const fetched_data = mongoose.connection.db.collection("food_items")
//             fetched_data.find({}).toArray(function(err,data){
//                 if(err)
//                         console.log(err)
//                 else
//                         console.log(data)

//                 })
//         })
//         .catch((err) => {
//             console.log(err);
//         })
        
// }
const mongoDB = async () => {
        try {
          await mongoose.connect(mongoURL);
          console.log('Connected!');
          let fetched_data = mongoose.connection.db.collection("food_items");
          let data=await fetched_data.find({}).toArray() 
        //   console.log(data);
        global.food_items = data
          let foodCategory = mongoose.connection.db.collection("foodCategory");
          let catData=await foodCategory.find({}).toArray() 
        //   console.log(data);
        global.foodCategory = catData
        } catch (error) {
          console.log('err: ', error);
        }
      };

module.exports = mongoDB;