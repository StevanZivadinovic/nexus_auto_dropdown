export function getProxyLink(url:string){
    return `https://corsproxy.io/?${encodeURIComponent(url)}`
  }