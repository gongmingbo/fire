// 请求工具类

const BASE_URL = 'http://localhost:8080'; // 设置基础URL，根据实际环境配置
const TIMEOUT = 10000; // 请求超时时间
const MAX_RETRIES = 3; // 最大重试次数
const RETRY_DELAY = 1000; // 重试延迟时间（毫秒）

// 请求队列管理
class RequestQueue {
  constructor() {
    this.queue = new Map();
    this.maxConcurrent = 5; // 最大并发请求数
    this.running = 0;
  }

  // 添加请求到队列
  add(key, request) {
    this.queue.set(key, request);
    this.processQueue();
  }

  // 从队列中移除请求
  remove(key) {
    this.queue.delete(key);
    this.running--;
    this.processQueue();
  }

  // 处理队列
  async processQueue() {
    if (this.running >= this.maxConcurrent || this.queue.size === 0) return;

    for (const [key, request] of this.queue) {
      if (this.running >= this.maxConcurrent) break;
      
      this.running++;
      this.queue.delete(key);
      
      try {
        await request();
      } finally {
        this.running--;
        this.processQueue();
      }
    }
  }
}

// 请求缓存管理
class CacheManager {
  constructor() {
    this.cache = new Map();
    this.maxAge = 5 * 60 * 1000; // 默认缓存时间5分钟
  }

  // 设置缓存
  set(key, value, maxAge = this.maxAge) {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      maxAge
    });
  }

  // 获取缓存
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > item.maxAge;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  // 清除缓存
  clear() {
    this.cache.clear();
  }
}

const requestQueue = new RequestQueue();
const cacheManager = new CacheManager();

// 请求拦截器
const requestInterceptor = (config) => {
  // 获取token
  const token = uni.getStorageSync('token');
  if (token) {
    config.header = {
      ...config.header,
      'Authorization': `Bearer ${token}`
    };
  }
  return config;
};

// 响应拦截器
const responseInterceptor = (response) => {
  const { statusCode, data } = response;
  
  // 请求成功
  if (statusCode === 200) {
    return data;
  }
  
  // 处理错误响应
  handleError(response);
  return Promise.reject(response);
};

// 错误处理函数
const handleError = (error) => {
  const { statusCode, data } = error;
  
  // 根据状态码处理不同错误情况
  switch (statusCode) {
    case 401:
      // 未授权，跳转登录
      uni.navigateTo({
        url: '/pages/login/login'
      });
      break;
    case 403:
      uni.showToast({
        title: '没有权限访问',
        icon: 'none'
      });
      break;
    case 404:
      uni.showToast({
        title: '请求的资源不存在',
        icon: 'none'
      });
      break;
    case 500:
      uni.showToast({
        title: '服务器错误',
        icon: 'none'
      });
      break;
    default:
      uni.showToast({
        title: data?.message || '请求失败',
        icon: 'none'
      });
  }
};

// 重试函数
const retryRequest = async (fn, retries = MAX_RETRIES) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    return retryRequest(fn, retries - 1);
  }
};

// 生成缓存键
const generateCacheKey = (options) => {
  const { url, method, data } = options;
  return `${method}:${url}:${JSON.stringify(data)}`;
};

// 封装请求方法
const request = (options) => {
  const { url, method = 'GET', data, header = {}, useCache = false, cacheTime } = options;
  
  // 检查缓存
  if (useCache && method === 'GET') {
    const cacheKey = generateCacheKey(options);
    const cachedData = cacheManager.get(cacheKey);
    if (cachedData) return Promise.resolve(cachedData);
  }

  // 合并请求配置
  const config = {
    url: `${BASE_URL}${url}`,
    method,
    data,
    header,
    timeout: TIMEOUT
  };
  
  // 应用请求拦截器
  const interceptedConfig = requestInterceptor(config);
  
  // 创建请求Promise
  const requestPromise = () => {
    return new Promise((resolve, reject) => {
      uni.request({
        ...interceptedConfig,
        success: (response) => {
          try {
            const result = responseInterceptor(response);
            // 设置缓存
            if (useCache && method === 'GET') {
              const cacheKey = generateCacheKey(options);
              cacheManager.set(cacheKey, result, cacheTime);
            }
            resolve(result);
          } catch (error) {
            reject(error);
          }
        },
        fail: (error) => {
          handleError(error);
          reject(error);
        }
      });
    });
  };

  // 将请求添加到队列
  const queueKey = generateCacheKey(options);
  const queuedRequest = () => retryRequest(requestPromise);
  requestQueue.add(queueKey, queuedRequest);

  return queuedRequest();
};

// 导出请求方法
export const http = {
  get: (url, data = {}, options = {}) => request({ url, method: 'GET', data, ...options }),
  post: (url, data = {}, options = {}) => request({ url, method: 'POST', data, ...options }),
  put: (url, data = {}, options = {}) => request({ url, method: 'PUT', data, ...options }),
  delete: (url, data = {}, options = {}) => request({ url, method: 'DELETE', data, ...options })
};

// 导出缓存管理器
export const cache = cacheManager;