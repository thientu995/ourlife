module.exports = function (req, res) {
    res.sendFile(path.join(pathHome, './index.html'));
}