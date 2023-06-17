const { checkBalance, updateCoinAmount, apiKey, price } = global.Ghost;
const axios = require("axios");

module.exports = {
  config: {
    name: "balance",
    author: "Mohammad Alamin",
    version: "1.0",
    description: "Find number to sim balance information (Robi, Airtel)",
    category: "general",
    guide: "{pn} 018XXXXXXXX"
  },

  execute: async function (ctx, { args, event }) {
    const userId = event.senderId;
    if (!args[0]) return ctx.reply("❎ | Please provide a number.");

    try {
      const hasEnoughBalance = await checkBalance(userId, price.location);
      if (hasEnoughBalance.message) {
        const response = await axios.post(
          'https://ghost.toxinum.xyz/api/v1/balance',
          {
            'apiKey': apiKey,
            'number': args[0]
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.status === true) {
          const updatedBalance = await updateCoinAmount(userId, -price.balance);
          if (updatedBalance.status) {
            const info = Object.entries(response.data)
              .filter(([key]) => key !== "status")
              .map(([key, value]) => `» ${key.toUpperCase()} : ${value}`)
              .join("\n");

            ctx.reply(`𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖\n» Balance information\n𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖\n${info}\n𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖`);
            ctx.reply(`ℹ️ | Coins deducted successfully.\n${updatedBalance.message}`);
          } else {
            ctx.reply("❎ | Failed to update coins.");
          }
        } else {
          ctx.reply(`❎| ${response.data.message}`);
        }
      } else {
        ctx.reply("❎ | Not enough balance.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
};
