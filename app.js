const Snoowrap = require("snoowrap");
const { CommentStream } = require("snoostorm");

console.log("Reddit bot is listening");

const client = new Snoowrap({
  userAgent: "my-node-js-bot",
  clientId: "16Y6HL4RCDLTxQ",
  clientSecret: "EEZw783bfjfvGFhOMAAhJhkZ9PA",
  username: "shonens",
  password: "78y-a8e-FdM-kGH",
});

// reddits api doesn't use millis
const BOT_START = Date.now() / 1000;

const comments = new CommentStream(client, {
  subreddit: "testingground4bots",
  limit: 10,
  pollTime: 10000,
});

const entailsMyUsername = (msg) => {
  return msg && msg.toLowerCase().includes("/u/myusernamebutactuallybot");
};

comments.on("item", (item) => {
  if (item.created_utc < BOT_START) return;
  //   if (item.author.name !== "shonens") return;
  if (!entailsMyUsername(item.body)) return;
  console.log("You sent a message that said: ", item.body);
  item.reply("Hey there from my local computer!");
});
