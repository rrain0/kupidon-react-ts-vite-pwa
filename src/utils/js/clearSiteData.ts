
import { isstring } from 'src/utils/base/tsUtils.ts'

/*
  Use this article to determine what to clear
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Clear-Site-Data
*/

export async function clearSiteData(): Promise<void> {
  await unregisterServiceWorkers()
  clearLocalStorage()
  clearSessionStorage()
  await clearIndexedDB()
  clearCookies()
  await clearCache()
}


export async function unregisterServiceWorkers(): Promise<void> {
  const swRegistrations = await navigator.serviceWorker.getRegistrations()
  await Promise.allSettled(swRegistrations.map(it => it.unregister()))
}

export function clearLocalStorage() {
  localStorage.clear()
}

export function clearSessionStorage() {
  sessionStorage.clear()
}

export async function clearIndexedDB() {
  const dbs = await indexedDB.databases()
  const pendingTasks = dbs
    .map(db => db.name)
    .filter(name => isstring(name))
    .map(name => indexedDB.deleteDatabase(name))
    .map(request => new Promise<void>((resolve, reject) => {
      request.onsuccess = () => resolve()
      // todo - close connections and retry
      request.onerror = () => reject()
      // todo - close connections and retry
      request.onblocked = () => reject()
    }))
  return Promise.allSettled(pendingTasks)
}




/*
  1) Doesn't work for cookies with HttpOnly flag set, because they aren't accessible from js.
  2) Doesn't work for cookies with a path or domain.
     You need to set the same path & domain to delete such cookies.
     But you cannot get cookie's path & domain from js.
*/
export function clearCookies() {
  // Куки в строке могут быть разделены ';' или '; '
  const cookies = document.cookie.split(/(; ?)/)
  cookies.forEach(cookie => {
    // Также берёт имя безымянного куки, у которого перед первым равно пустая строка
    const name = cookie.split('=')[0]
    const c = {
      [name]: '',
      'max-age': '0', // seconds
      //path: '/',
    }
    document.cookie = Object.entries(c).map(keyValue => keyValue.join('=')).join(';')
  })
}



// Clear CacheStorage (used by Service Worker)
export async function clearCache(): Promise<void> {
  const entryKeys = await window.caches.keys()
  await Promise.allSettled(entryKeys.map(key => window.caches.delete(key)))
  
  // Another way to clear cache
  //await ServiceWorkerUtils.sendMsgAndWaitAnswer({ type: 'CLEAR_CACHE' }).catch(() => undefined)
}





/*
Cookies:
 
 ● Add one cookie (this adds, not replaces all cookies):
  document.cookie = "doSomethingOnlyOnce=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure"
  document.cookie = "doSomething=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure"
 
 ● Get all cookies (name=value pairs):
  document.cookie => 'doSomethingOnlyOnce=true; doSomething=true'
 
 ● Delete cookie:
  document.cookie = 'doSomething=; expires=Thu, 01-Jan-1970 00:00:01 GMT'
*/


/*
Cache:
 ● Clear:
   ● Get all names of cache entries and delete them
 
   ● Add query param 'v=1.0' to script url to force download it
   <script src="script.js?v=1.0"></script>
 
   ● Reload page while ignoring cached resources:
   window.location.reload(true)

 */




/*
Try to clear cookies for all paths and domains:

https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript

(function () {
  var cookies = document.cookie.split("; ");
  for (var c = 0; c < cookies.length; c++) {
    var d = window.location.hostname.split(".");
    while (d.length > 0) {
      var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0])
        + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
      var p = location.pathname.split('/');
      document.cookie = cookieBase + '/';
      while (p.length > 0) {
        document.cookie = cookieBase + p.join('/');
        p.pop();
      };
      d.shift();
    }
  }
})();


function eraseCookieFromAllPaths(name) {
  // This function will attempt to remove a cookie from all paths.
  var pathBits = location.pathname.split('/');
  var pathCurrent = ' path=';
  
  // do a simple pathless delete first.
  document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';
  
  for (var i = 0; i < pathBits.length; i++) {
    pathCurrent += ((pathCurrent.substr(-1) != '/') ? '/' : '') + pathBits[i];
    document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;' + pathCurrent + ';';
  }
}
*/
