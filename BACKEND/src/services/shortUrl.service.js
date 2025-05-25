import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl } from "../dao/shortUrl.js";

export const createShortUrlService = async(url)=>{
  const shorturl = generateNanoId(7);
  if(!shorturl) throw new Error("Url not generated");
  await saveShortUrl(shorturl,url)
  return shorturl
}