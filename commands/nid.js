const { checkBalance, updateCoinAmount, apiKey, price } = global.Ghost;
const axios = require("axios");

module.exports = {
  config: {
    name: "nid",
    author: "Mohammad Alamin",
    version: "1.0",
    description: "Find nid and dob to nid server information.",
    category: "general",
    guide: "{pn} nid_no dob"
  },

  execute: async function (ctx, { args, event }) {
    const userId = event.senderId;
    if (!args[0]) return ctx.reply("❎ | Please provide a nid number.");
    if (!args[1]) return ctx.reply("❎ | Please provide a valid dob.");
    try {
      const hasEnoughBalance = await checkBalance(userId, price.nid);
      if (hasEnoughBalance.status) {
        const response = await axios.post(
          'https://ghost.toxinum.xyz/api/v1/nid',
          {
            apiKey: apiKey,
            nid: args[0],
            dob: args[1]
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.status === true) {
          const updatedBalance = await updateCoinAmount(userId, -price.nid);
          if (updatedBalance.status) {
            const info = Object.entries(response.data)
              .filter(([key]) => key !== "status")
              .map(([key, value]) => `» ${key.toUpperCase()} : ${value}`)
              .join("\n");

            ctx.reply(`𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖\n» Nid information\n𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖\n${info}\n𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖`);
            ctx.reply(`ℹ️ | Coins deducted successfully.\n${updatedBalance.message}`);
          } else {
            ctx.reply("❎ | Failed to update coins.");
          }
        } else {
          ctx.reply(`❎ | ${response.data.message}`);
        }
      } else {
        ctx.reply("❎ | Not enough balance.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
};
