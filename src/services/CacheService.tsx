import { CacheDto } from '../models/dto/CacheDtos';

export default class CachService {
  static url = 'http://localhost:3000/';

  static addDataIntoCache(cacheName: string, cacheData: CacheDto) {
    const data = new Response(JSON.stringify(cacheData));
    // Checking if browser allows caches or not
    if ('caches' in window) {
      caches.open(cacheName).then((cache) => {
        cache.put(this.url, data);
      });
    }
  }

  static async isCacheExist(cacheName: string) {
    if ('caches' in window) {
      const res = await caches.has(cacheName);

      return res;
    }
    return false;
  }

  // returns true if success
  static async deleteCache(cacheName: string) {
    if ('caches' in window) {
      const res = await caches.delete(cacheName);
      return res;
    }
    return false;
  }

  static async getCacheData(cacheName: string) {
    // getting names of caches

    // getting cache
    if ('caches' in window) {
      const names = await caches.keys();

      const index = names.indexOf(cacheName);
      const cache = await caches.open(names[index]);
      console.log(cache);
      console.log('khatey dum');
      console.log({ cache });
      if (cache) {
        // opening response of cached url;
        const cachedResponse = await cache.match(this.url);

        // getting cached data
        const data = (await cachedResponse?.json()) as CacheDto | undefined;
        console.log({ 'cach data': data });
        return data;
        // cacheDataArray.push(data);
      }
    }
  }
}
