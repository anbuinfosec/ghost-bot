function logUserData(eventObj) {
    const formattedeventObj = {
        event: {
            userName: eventObj.userName,
            name: eventObj.name,
            senderId: eventObj.senderId,
            threadId: eventObj.threadId,
            message_id: eventObj.message_id,
            type: eventObj.type,
            args: eventObj.args
        }
    };
    console.log(formattedeventObj)
}

module.exports = {
    logUserData,
};
