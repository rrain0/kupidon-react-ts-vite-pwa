import { ServiceWorkerUtils } from 'src/utils/app/ServiceWorkerUtils'




/*
  Use this article to determine what to clear
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Clear-Site-Data
*/
export async function clearSiteData(): Promise<void> {
  clearCookies()
  localStorage.clear()
  sessionStorage.clear()
  await clearCache()
  
  const swRegistrations = await navigator.serviceWorker.getRegistrations()
  await Promise.allSettled(swRegistrations.map(it=>it.unregister()))
  
  //await ServiceWorkerUtils.sendMsgAndWaitAnswer({ type: 'clear-cache' }).catch(()=>undefined)
}



// Beware! If your cookies are configured to use a path or domain component,
// this handy snippet won't work.
// Also, httpOnly cookies are not available from javascript at all.
const expires = 'Thu, 01 Jan 1970 00:00:00 UTC'
export function clearCookies(){
  const cookies = document.cookie.split(/(; ?)/)
  const cookieNames = cookies.map(cookie=>cookie.split('=')[0])
  cookieNames.forEach(name=>{
    let c = name+'='
    c += '; ' + `expires=${expires}`
    document.cookie = c
  })
}



export async function clearCache(): Promise<void> {
  const entryKeys = await window.caches.keys()
  await Promise.allSettled(entryKeys.map(key=>window.caches.delete(key)))
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
      var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
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