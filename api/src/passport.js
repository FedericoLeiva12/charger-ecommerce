function isAuthenticated(req, res, next) {
  if(req.isAuthenticated())
    return next();
  else
    return res.status(401).send();
}
  
function isNotAuthenticated(req, res, next) {
  if(!req.isAuthenticated())
    return next();
  else
    return res.status(401).send();
}

module.exports = {
    isAuthenticated,
    isNotAuthenticated
}