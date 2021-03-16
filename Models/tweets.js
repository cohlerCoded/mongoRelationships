const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://localhost:27017/mongoRelationships", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO MOGO CONNECTION ERROR");
    console.log(err);
  });

const userSchema = new Schema({
  username: String,
  age: Number,
});
const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const makeTweets = async () => {
  const user = await User.findOne({ username: "chickenfan99" });
  const tweet3 = new Tweet({
    text: "eggsactly!",
    likes: 101,
  });
  tweet3.user = user;
  tweet3.save();
};
const findTweet = async () => {
  const tweet = await Tweet.find({}).populate("user");
  console.log(tweet);
};
findTweet();
