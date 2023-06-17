const { countRegisteredUsers } = global.Ghost;

module.exports = {
    config: {
        name: "count",
        author: "Illusion Ghost",
        version: "1.0",
        description: "Count total bot users",
        category: "general",
        guide: "{pn}"
    },

    execute: function(ctx, { args }) {
        ctx.deleteMessage();

        ctx.reply("Please wait, processing...")
            .then(message => {
                countRegisteredUsers()
                    .then(result => {
                        ctx.telegram.editMessageText(
                            message.chat.id,
                            message.message_id,
                            undefined,
                            `✅ | ${result.message}`
                        );
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            });
    }
};
