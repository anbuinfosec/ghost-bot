const firebase = require('../firebase');
const crypto = require('crypto');

module.exports = {
  config: {
    name: "register",
    author: "Mohammad Alamin",
    version: "1.0",
    description: "Register your account.",
    category: "general",
    guide: "{pn}"
  },

  execute: async function(ctx, { args, event }) {
    function generateApiKey() {
      const apiKeyLength = 32;
      const randomBytes = crypto.randomBytes(apiKeyLength);
      const apiKey = randomBytes.toString('hex');
      return apiKey;
    }

    const apiKey = generateApiKey();
    const userId = event.senderId;
    const user = event.userName;

    try {
      const register = await firebase.createUser("00", userId, user, apiKey, "true");

      if (!register.status) {
        return ctx.reply(`❎ |  "${userId}" already exist in my database.`);
      }
        
      return ctx.reply(`✅ | Registration successful!\n𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖\n» ID : ${userId}\n» USER : ${user}\n» BALANCE : 00\n» STATUS : true\n𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖`);
      
    } catch (e) {
      console.log(e);
      return ctx.reply(`❎ | Registration failed. Error: ${e.message}`);
    }
  }
};
