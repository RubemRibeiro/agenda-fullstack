exports.middleWareGlobal = (req, res, next) => {
    res.locals.umaVariavelLocal = 'Valor da variavel local';

    next();
}

exports.csrfError = (e, req, res, next) => {
    if(e) {
        return res.render('404')
    }

    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrf = req.csrfToken();
    next();
}