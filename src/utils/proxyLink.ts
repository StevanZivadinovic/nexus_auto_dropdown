export function getProxyLink(url:string){
    return `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
  }