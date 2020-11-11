import express from 'express';
import * as bodyParser from 'body-parser';
import {hashtag, user, trend, getUserProfileInfo, getHashtagInfo, getVideoMeta, video} from 'tiktok-scraper';


const app = express();
app.use(bodyParser.json({
    limit: '200mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.get('/hashtag/:hashtag/:cursor/:water', async (req, res) => {
    const proxyList: string[] = ['EWKspn:mXKd86@194.242.124.40:8000', 'socks5://178.162.202.44:1667'];
    const tagValue = req.params.hashtag
    const cursor = req.params.cursor as unknown as number
    const water = req.params.water as unknown as boolean
    const posts = await hashtag(tagValue, { number: cursor, noWaterMark: water, proxy: proxyList });
    console.log(posts);
    res.send(posts);
});

app.get('/hashtag/:hashtag', async (req, res) => {
    const proxyList: string[] = ['EWKspn:mXKd86@194.242.124.40:8000', 'socks5://178.162.202.44:1667'];
    const tagValue = req.params.hashtag
    const tag = await getHashtagInfo(tagValue, {proxy: proxyList});
    console.log(tag);
    res.send(tag);
});

app.get('/user/:user/:count/:byUserId', async (req, res) => {
    const proxyList: string[] = ['EWKspn:mXKd86@194.242.124.40:8000', 'socks5://178.162.202.44:1667'];
    const username = req.params.username
    const count = req.params.count as unknown as number
    const byUserId = req.params.water as unknown as boolean
    const posts = await user(username, { number: count, by_user_id: byUserId, proxy: proxyList });
    console.log(posts);
    res.send(posts);
});

app.get('/trend/:count', async (req, res) => {
    const proxyList: string[] = ['EWKspn:mXKd86@194.242.124.40:8000', 'socks5://178.162.202.44:1667'];
    const count = req.params.count as unknown as number
    const posts = await trend('', { number: count, proxy: proxyList });
    console.log(posts);
    res.send(posts);
});

app.get('/profile/:username', async (req, res) => {
    const proxyList: string[] = ['EWKspn:mXKd86@194.242.124.40:8000', 'socks5://178.162.202.44:1667'];
    const username = req.params.username
    const userInfo = await getUserProfileInfo(username, {proxy: proxyList});
    console.log(userInfo);
    res.send(userInfo);
});

app.post('/video', async (req,res) => {
    const proxyList: string[] = ['EWKspn:mXKd86@194.242.124.40:8000', 'socks5://178.162.202.44:1667'];
    const videoUrl = req.body.videoUrl;
    console.log(videoUrl);
    try {
        const videoMeta = await getVideoMeta(videoUrl, {proxy: proxyList});
        console.log(videoMeta);
        res.send(videoMeta);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


export {app};
