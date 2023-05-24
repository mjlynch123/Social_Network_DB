const router = require("express").router();
const apiRoutes = require("./api");

router.use('/api', apiRoutes);

router.user((req, res) => {
    return res.send('Wrong Route!');
});

module.exports = router;
