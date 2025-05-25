import { getShortUrl } from "../dao/shortUrl.js";
import { createShortUrlService } from "../services/shortUrl.service.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    const shortUrl = await createShortUrlService(url);
    res.status(201).json({shortUrl :process.env.APP_URL + shortUrl});
  } catch (err) {
    next(err);
  }
};

export const redirectFromShortUrl = async (req, res) => {
  const shorturl = req.params.shorturl;
  const url = await getShortUrl(shorturl);
  if (!url) throw new NotFoundError("Url not found");
  url.clicks += 1;
  await url.save();
  res.redirect(url.fullUrl);
};
