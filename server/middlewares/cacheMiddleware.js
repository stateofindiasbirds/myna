  const redis = require('redis');


  const redisClient = redis.createClient({
    url: 'redis://127.0.0.1:6379' 
  });

  redisClient.on('error', (err) => {
    console.error('Redis error:', err);
  });

  redisClient.connect().then(() => {
    console.log('Connected to Redis');
  }).catch(err => {
    console.error('Error connecting to Redis:', err);
  });

  const cacheMiddleware = (cacheKeyGenerator, ttl = 20000) => {
    return async (req, res, next) => {
      const cacheKey = cacheKeyGenerator(req);
      const redisClient = redis.createClient({
        url: 'redis://127.0.0.1:6379' 
      });
    
      redisClient.on('error', (err) => {
        console.error('Redis error:', err);
      });
    
      redisClient.connect().then(() => {
        console.log('Connected to Redis');
      }).catch(err => {
        console.error('Error connecting to Redis:', err);
      });

      try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
          const data = JSON.parse(cachedData);
          return res.send(data);
        }

        const originalSend = res.send.bind(res);  const redis = require('redis');
      
        const cacheMiddleware = (cacheKeyGenerator, ttl = 20000) => {
          return async (req, res, next) => {
            const cacheKey = cacheKeyGenerator(req);
      
            try {
              const cachedData = await redisClient.get(cacheKey);
              if (cachedData) {
                const data = JSON.parse(cachedData);
                return res.send(data);
              }
      
              const originalSend = res.send.bind(res);
              res.send = async (body) => {
                if (res.statusCode === 200) {
                  await redisClient.setEx(cacheKey, ttl, JSON.stringify(body));
                }
                return originalSend(body);
              };
      
              next();
            } catch (err) {
              console.error('Cache middleware error:', err);
              next();
            }
          };
        };
      
        module.exports = cacheMiddleware;
      
        res.send = async (body) => {
          if (res.statusCode === 200) {
            await redisClient.setEx(cacheKey, ttl, JSON.stringify(body));
          }
          return originalSend(body);
        };

        next();
      } catch (err) {
        console.error('Cache middleware error:', err);
        next();
      }
    };
  };

  module.exports = cacheMiddleware;
