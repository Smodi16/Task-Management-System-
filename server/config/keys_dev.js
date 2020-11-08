module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb+srv://Smodi:Kevin123@cluster1-94nsb.mongodb.net/Test?retryWrites=true&w=majority',
   // secretOrKey: process.env.SECRET_OR_KEY,
    secretOrKey: 'secret',
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
  };
  