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
    const tagValue = req.params.hashtag
    const cursor = req.params.cursor as unknown as number
    const water = req.params.water as unknown as boolean
    const posts = await hashtag(tagValue, { number: cursor, noWaterMark: water });
    console.log(posts);
    res.send(posts);
});

app.get('/hashtag/:hashtag', async (req, res) => {
    const tagValue = req.params.hashtag
    const tag = await getHashtagInfo(tagValue, {});
    console.log(tag);
    res.send(tag);
});

app.get('/user/:user/:count/:byUserId', async (req, res) => {
    const username = req.params.username
    const count = req.params.count as unknown as number
    const byUserId = req.params.water as unknown as boolean
    const posts = await user(username, { number: count, by_user_id: byUserId });
    console.log(posts);
    res.send(posts);
});

app.get('/trend/:count', async (req, res) => {
    const count = req.params.count as unknown as number
    const posts = await trend('', { number: count });
    console.log(posts);
    res.send(posts);
});

app.get('/profile/:username', async (req, res) => {
    const username = req.params.username
    const userInfo = await getUserProfileInfo(username, {});
    console.log(userInfo);
    res.send(userInfo);
});

app.post('/video', async (req,res) => {
    const videoUrl = req.body.videoUrl;
    console.log(videoUrl);
    try {
        const videoMeta = await getVideoMeta(videoUrl, null);
        console.log(videoMeta);
        res.send(videoMeta);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


export {app};
