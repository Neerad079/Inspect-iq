package com.smartinspect.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.cache.RedisCache;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheWriter;

public class LoggingRedisCache extends RedisCache {

    private static final Logger log = LoggerFactory.getLogger(LoggingRedisCache.class);

    public LoggingRedisCache(String name, RedisCacheWriter cacheWriter, RedisCacheConfiguration cacheConfig) {
        super(name, cacheWriter, cacheConfig);
    }

    @Override
    protected Object lookup(Object key) {
        Object value = super.lookup(key);
        if (value != null) {
            log.info("[REDIS CACHE HIT] Cache: '{}' | Key: '{}' -> Returning cached data from Redis.", getName(), key);
        } else {
            log.info("[REDIS CACHE MISS] Cache: '{}' | Key: '{}' -> Data not found in Redis. Fetching from database...", getName(), key);
        }
        return value;
    }

    @Override
    public void put(Object key, Object value) {
        super.put(key, value);
        log.info("[REDIS CACHE PUT] Cache: '{}' | Key: '{}' -> Stored database result into Redis.", getName(), key);
    }

    @Override
    public void evict(Object key) {
        super.evict(key);
        log.info(" [REDIS CACHE EVICT] Cache: '{}' | Key: '{}' -> Evicted entry from Redis cache.", getName(), key);
    }

    @Override
    public void clear() {
        super.clear();
        log.info(" [REDIS CACHE CLEAR] Cache: '{}' -> Cleared all entries from Redis cache.", getName());
    }
}
