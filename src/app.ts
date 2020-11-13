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
    const proxyList: string[] = ['C6sSbU:zWeGcu@45.132.20.183:8000', 'C6sSbU:zWeGcu@45.132.22.155:8000', 'EWKspn:mXKd86@194.242.124.40:8000', 'q29LDc:vwmFqk@194.242.125.1:8000', 'q29LDc:vwmFqk@194.242.125.105:8000'];
    const tagValue = req.params.hashtag
    const cursor = req.params.cursor as unknown as number
    const water = req.params.water as unknown as boolean
    try {
        const posts = await hashtag(tagValue, { number: cursor, noWaterMark: true, proxy: proxyList });
        console.log(posts);
        res.send(posts);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.get('/hashtag/:hashtag', async (req, res) => {
    const proxyList: string[] = ['C6sSbU:zWeGcu@45.132.20.183:8000', 'C6sSbU:zWeGcu@45.132.22.155:8000', 'EWKspn:mXKd86@194.242.124.40:8000', 'q29LDc:vwmFqk@194.242.125.1:8000', 'q29LDc:vwmFqk@194.242.125.105:8000'];
    const tagValue = req.params.hashtag
    try {
        const tag = await getHashtagInfo(tagValue, {proxy: proxyList});
        console.log(tag);
        res.send(tag);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.get('/user/:user/:count/:byUserId', async (req, res) => {
    const proxyList: string[] = ['C6sSbU:zWeGcu@45.132.20.183:8000', 'C6sSbU:zWeGcu@45.132.22.155:8000', 'EWKspn:mXKd86@194.242.124.40:8000', 'q29LDc:vwmFqk@194.242.125.1:8000', 'q29LDc:vwmFqk@194.242.125.105:8000'];
    const username = req.params.username
    const count = req.params.count as unknown as number
    const byUserId = req.params.water as unknown as boolean
    try {
        const posts = await user(username, {number: count, by_user_id: byUserId, proxy: proxyList});
        console.log(posts);
        res.send(posts);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.get('/trend/:count', async (req, res) => {
    const proxyList: string[] = ['C6sSbU:zWeGcu@45.132.20.183:8000', 'C6sSbU:zWeGcu@45.132.22.155:8000', 'EWKspn:mXKd86@194.242.124.40:8000', 'q29LDc:vwmFqk@194.242.125.1:8000', 'q29LDc:vwmFqk@194.242.125.105:8000'];
    const count = req.params.count as unknown as number
    try {
        const posts = await trend('', {number: count, proxy: proxyList});
        console.log(posts);
        res.send(posts);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.get('/profile/:username', async (req, res) => {
    const proxyList: string[] = ['C6sSbU:zWeGcu@45.132.20.183:8000', 'C6sSbU:zWeGcu@45.132.22.155:8000', 'EWKspn:mXKd86@194.242.124.40:8000', 'q29LDc:vwmFqk@194.242.125.1:8000', 'q29LDc:vwmFqk@194.242.125.105:8000'];
    const username = req.params.username
    try {
        const userInfo = await getUserProfileInfo(username, {proxy: proxyList});
        console.log(userInfo);
        res.send(userInfo);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.post('/video', async (req, res) => {
    const proxyList: string[] = ['C6sSbU:zWeGcu@45.132.20.183:8000', 'C6sSbU:zWeGcu@45.132.22.155:8000', 'EWKspn:mXKd86@194.242.124.40:8000', 'q29LDc:vwmFqk@194.242.125.1:8000', 'q29LDc:vwmFqk@194.242.125.105:8000'];
    const videoUrl = req.body.videoUrl;
    try {
        const videoMeta = await getVideoMeta(videoUrl, {proxy: proxyList, noWaterMark: true});
        console.log(videoMeta);
        res.send(videoMeta);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.get('/video/:videoId', async (req, res) => {
    const proxyList: string[] = ['C6sSbU:zWeGcu@45.132.20.183:8000', 'C6sSbU:zWeGcu@45.132.22.155:8000', 'EWKspn:mXKd86@194.242.124.40:8000', 'q29LDc:vwmFqk@194.242.125.1:8000', 'q29LDc:vwmFqk@194.242.125.105:8000'];
    const videoId = req.params.videoId
    try {
        const videoPost = await video(videoId, {proxy: proxyList, noWaterMark: true});
        console.log(videoPost);
        res.send(videoPost);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

export {app};
