const HomeModel = require('../models/HomeModel');

HomeModel.find({
   
});

exports.index = (req, res) => {
    req.session.usu
    res.render(`index`);
    return;
}

// exports.trataPost = (req, res) => {
//     res.send(req.body);
//     return;
// }