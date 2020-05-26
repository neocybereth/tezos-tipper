import { Tezos } from "@taquito/taquito";
import Snoowrap from "snoowrap";
import { CommentStream } from "snoostorm";
import mongoose from "mongoose";
import User from "./models/user";
import Comments from "./models/comment";
require("dotenv").config();

mongoose.set("debug", true);
mongoose.set("useFindAndModify", false);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err: any) => console.error(err));

const client = new Snoowrap({
  userAgent: "my-node-js-bot",
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
});

const comments = new CommentStream(client, {
  subreddit: "testingground4bots",
  limit: 10,
  pollTime: 10000,
});

const includesMyUsername = (msg: string): boolean => {
  return msg && msg.toLowerCase().includes("/u/tezostipper");
};

let lastChecked;

comments.on("item", async (comment: any) => {
  console.log(comment.created_utc);

  Comments.findOne({}, (err: any, foundComment: any) => {
    if (err) {
      console.log(err);
    }
    console.log(foundComment);
    return foundComment.lastChecked;
  });
});
//   // Compare last checked and comment epoch times
//   if (comment.created_utc < lastChecked) return;
//   if (!includesMyUsername(comment.body)) return;
//   if (comment.body.includes("/register")) {
//     // check if user already exists in DB
//     // -- if so, tell them their address and 1) how to tip 2) how to donate
//     // -- if so, check if they have a balance and send it to their address
//     // -- if not, 1) generate them an address 2) add user to DB 3) hold keys to that address hashed
//     // -- 4) send them instructions 1) how to tip/deposit 2) how to donate
//   } else if (comment.body.includes("/tip")) {
//     // const message = item.body.split('/tip')
//     // const user = message[1]
//     // check if user is registered and address is valid
//     // -- if so, 1) send the tezzies to address 2) send receipt to user
//     // Tezos.importKey(privateKey);
//     // Tezos.contract.transfer({ to: address, amount: amount}).then(
//     // op => return op.confirmation(2).then(() => op.hash)
//     //).then(hash => `https://tzstats.com/${hash}`).catch(e => console.log(e))
//     // -- if not, then add to their address (subtract from registered user's) and send when they register
//   } else if (comment.body.includes("/withdrawal")) {
//     // const message = item.body.split('/tip')
//     // const user = message[1]
//     // check if: 1) user already exists in DB by username 2) if user has money
//     // -- if so 1) send $ to specified address 2) send receipt to user (block explorer)
//     // Tezos.importKey(privateKey);
//     // Tezos.contract.transfer({ to: address, amount: amount}).then(
//     // op => return op.confirmation(2).then(() => op.hash)
//     //).then(hash => `https://tzstats.com/${hash}`).catch(e => console.log(e))
//     // -- if not, 1) send instructions on how to register/deposit
//   } else if (comment.body.includes("/help")) {
//     // send message with instructions on how to use:
//     // 1) register
//     // 2) tip
//     // 3) withdrawal
//     // 4) deposit
//   } else if (comment.body.includes("/donate")) {
//     // send tezzies to my address
//     // send receipt and a thank you
//   } else {
//     // send message saying "Sorry I didn't recognize that"
//   }
//   await (Comments as any).findOneAndUpdate(
//     {},
//     { lastChecked: Math.round(new Date().getTime() / 1000) },
//     (err: any, newLastCheckedTime: any) => {
//       if (err) console.log(err);
//       console.log(newLastCheckedTime);
//     }
//   );
//   console.log("You sent a message that said: ", comment.body);
//   comment.reply("Hey there from my local computer!");
// });

// const createNewUser = (user: {
//   username: string;
//   address: string;
//   balance: number;
//   withdrawalAddress: string | null;
// }) => {
//   //{ username: String; address: String; balance: Number; withdrawalAddress: string }
//   const newUser = new User({
//     // username: username logic,
//     // address: generated address,
//     balance: 0,
//     withdrawalAddress: null,
//   });
//   User.register(
//     newUser,
//     (
//       err: any,
//       user: {
//         username: string;
//         address: string;
//         balance: number;
//         withdrawalAddress: string | null;
//       }
//     ) => {
//       if (err) console.log(err);
//       console.log(user);
//     }
//   );
// };
