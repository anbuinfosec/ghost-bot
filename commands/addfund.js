
const { updateCoinAmount } = global.Ghost;

module.exports = {
  config: {
    name: "addfund",
    author: "Mohammad Alamin",
    version: "1.0",
    description: "Add funds to users account",
    category: "general",
    guide: "{pn} userId add_balance"
  },

  execute: async function (ctx, { args, event }) {
    ctx.deleteMessage();
      if (!args[0] ||!args[1]) return ctx.reply("❎ | Please enter /addfunds userId add_balance")
    try {
      const message = await ctx.reply("Please wait, processing...");


      
        const updatedBalance = await updateCoinAmount(args[0], args[1]);

        if (updatedBalance.status) {
          await ctx.telegram.editMessageText(
            message.chat.id,
            message.message_id,
            undefined,
            `✅ | ${updatedBalance.message}`
          );
        } else {
          await ctx.telegram.editMessageText(
            message.chat.id,
            message.message_id,
            undefined,
            `❌ | ${updatedBalance.message}`
          );
        }
    } catch (error) {
      console.error("Error:", error);
      await ctx.reply(`❌ | ${error.message}`);
    }
  }
};
