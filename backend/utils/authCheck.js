export function checkToken(req, res, next) {
  const token = req.cookies;
  console.log(token);
  next();
}
