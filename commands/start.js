module.exports = {
  config: {
    name: "start",
    author: "@Illusionghost",
    version: "1.0",
    description: "Start command",
    authorizeOnly : false,
    category: "general",
    guide: "{pn}"
  },

  execute: async function(ctx, { args, event, botInfo }) {
    ctx.reply(`Hello, ${event.name}\nWelcome to @${botInfo.userName}\nType /help to see all commands.\n\nThanks ❤️`);
  }
};