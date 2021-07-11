const fs = require("fs");
const Msvjoiner = require("msvjoiner.js");
const Logger = new Msvjoiner.Logger();
const request = require("request");

fs.readFile(
  "tokens.txt",
  { encoding: "utf8", flag: "r" },
  async function (err, data) {
    if (err) {
      Logger.error("FILE", err + "!", true);
    } else if (data == "") {
      Logger.error("FILE", "tokens.txt file is empty!", true);
    } else {
      let joined = 0;
      let total = 0;
      let tokens = data.split("\n");
      tokens.forEach(async (token) => {
        await request.post({
          url: "Link OF the Server",
          headers: { authorization: token },
        }, async function (error, response, body) {
            if(error) {
                Logger.error("REQUEST", error, true)
            } else {
                Logger.info("STATUS", body, true)
                joined +=1;
            }

        })
        total += 1;
        if (total == tokens.length) {
          Logger.success(
            "LOGIN",
            joined + " out of " + total + " tokens work.",
            true
          );
        }
      });
    }
  }
);
