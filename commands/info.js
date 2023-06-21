const { getMe, apiKey, admin0 } = global.Ghost;
const axios = require("axios");

module.exports = {
    config: {
        name: "info",
        author: "Mohammad Alamin",
        version: "1.0",
        description: "Check you account info.",
        category: "general",
        guide: "{pn}"
    },

    execute: async function(ctx, { args, event }) {
        const userId = event.senderId;

        try {
            const me = await getMe(event.senderId);

            const response = await axios.post(
                'https://ghost.toxinum.xyz/api/v1/getUser',
                {
                    'apiKey': apiKey,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.status === true) {

                const info = Object.entries(response.data)
                    .filter(([key]) => key !== "status" && key !== "apiKey" && key !== "email")
                    .map(([key, value]) => `» ${key.toUpperCase()} : ${value}`)
                    .join("\n");
                const info2 = Object.entries(me.message)
                    .filter(([key]) => key !== "apiKey")
                    .map(([key, value]) => `» ${key.toUpperCase()} : ${value}`)
                    .join("\n");

                ctx.reply(`𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖\n» Api Account information\n𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖\n${info}\n𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖\n𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖\n» User Account information\n${info2}`);

            } else {
                ctx.reply(`❎| ${response.data.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};
