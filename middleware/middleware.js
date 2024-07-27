const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).send({ error: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, 'dunglv'); 
      const user = await User.findOne({ _id: decoded._id});
  
      if (!user) {
        throw new Error();
      }
  
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Please authenticate' });
    }
};