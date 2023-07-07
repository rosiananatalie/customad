const log = (message) => {
    const currentTime = new Date().toLocaleString();
    console.log(`[${currentTime}] ${message}`);
};

module.exports = {
    log,
}
