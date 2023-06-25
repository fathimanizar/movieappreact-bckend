 const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Fathimanizar:fathima@testcluster.cv1hp4e.mongodb.net/movieappDB?retryWrites=true&w=majority")
 .then(()=>{
console.log("DB connected");
 })
 .catch(err=>console.log(err));

 let mongoSchema= mongoose.Schema;

 const MovieSchema = new mongoSchema({
    movie_name:String,
    actor:String,
    actress:String,
    director:String,
    released_year:Number,
    camera:String,
    producer:String,
    language:String

 })

 var movieModel= mongoose.model("movie",MovieSchema);

 module.exports = movieModel;