const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const Recipe = require("./models/Recipe.model");
const data = require("./data");

const MONGODB_URI = "mongodb://0.0.0.0:27017/recipes";

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    let recipe = {
      title: "Lasagna",
      cuisine: "Italian",
    };
    return Recipe.create(recipe);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(() => {
    Recipe.find().then((recipesFromDB) => {
      recipesFromDB.forEach((recipe) => {
        console.log(recipe.title);
      });
    });
  })
  .then(() => {
    const query = { title: "Rigatoni alla Genovese" };
    return Recipe.findOneAndUpdate(query, { duration: 100 });
  })
  .then((updatedRecipe) => {
    console.log("successfully updated duration ", updatedRecipe);
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("sucessfully deleted Carrot Cake");
  })
  .finally(() =>{
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
