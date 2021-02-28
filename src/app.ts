import express from 'express';
import * as bodyParser from 'body-parser';
import {
    hashtag,
    user,
    trend,
    getHashtagInfo,
    getVideoMeta,
    getMusicInfo,
    trendEvent
} from 'tiktok-scraper';


const app = express();
app.use(bodyParser.json({
    limit: '200mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.get('/trend', async (req, res) => {
    // const proxyList: string[] = ['05JAsv:dLW40U@194.62.30.31:8000', 'C6sSbU:zWeGcu@45.132.20.183:8000', 'C6sSbU:zWeGcu@45.132.22.155:8000', 'EWKspn:mXKd86@194.242.124.40:8000', 'q29LDc:vwmFqk@194.242.125.1:8000', 'q29LDc:vwmFqk@194.242.125.105:8000'];
    const proxyList: string[] = ['hZ126F:6UqVBU@45.10.248.38:8000'];
    try {
        const posts = await trend('', {hdVideo: true, number: 25, noWaterMark: true, verifyFp: '' });
        console.log(posts);
        res.send(posts);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.get('/trendEvent', async (req, res) => {
    const proxyList: string[] = ['hZ126F:6UqVBU@45.10.248.38:8000'];
    try {
        const posts = await trendEvent('', {number: 25, noWaterMark: true, verifyFp: '', hdVideo: true});
        console.log(posts);
        res.send(posts);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.get('/trend/:count', async (req, res) => {
    const proxyList: string[] = ['05JAsv:dLW40U@194.62.30.31:8000', 'C6sSbU:zWeGcu@45.132.20.183:8000', 'C6sSbU:zWeGcu@45.132.22.155:8000', 'EWKspn:mXKd86@194.242.124.40:8000', 'q29LDc:vwmFqk@194.242.125.1:8000', 'q29LDc:vwmFqk@194.242.125.105:8000'];
    const count = req.params.count as unknown as number
    try {
        const posts = await trend('', {hdVideo: true, number: count, noWaterMark: false, verifyFp: '', proxy: proxyList});
        console.log(posts);
        res.send(posts);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


app.get('/hashtag/:hashtag/:cursor/:water', async (req, res) => {
    // const proxyList: string[] = ['05JAsv:dLW40U@194.62.30.31:8000', 'C6sSbU:zWeGcu@45.132.20.183:8000', 'C6sSbU:zWeGcu@45.132.22.155:8000', 'EWKspn:mXKd86@194.242.124.40:8000', 'q29LDc:vwmFqk@194.242.125.1:8000', 'q29LDc:vwmFqk@194.242.125.105:8000'];
    const proxyList: string[] = ['hZ126F:6UqVBU@45.10.248.38:8000'];
    const tagValue = req.params.hashtag
    const cursor = req.params.cursor as unknown as number
    const water = req.params.water as unknown as boolean
    try {
        const posts = await hashtag(tagValue, { hdVideo: true, number: cursor, noWaterMark: true, verifyFp: ''});
        console.log(posts);
        res.send(posts);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.get('/hashtag/:hashtag', async (req, res) => {
    const proxyList: string[] = ['hZ126F:6UqVBU@45.10.248.38:8000'];
    const tagValue = req.params.hashtag
    try {
        const tag = await getHashtagInfo(tagValue, {hdVideo: true, noWaterMark: true, verifyFp: ''});
        console.log(tag);
        res.send(tag);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.get('/user/:user/:count/:byUserId', async (req, res) => {
    const proxyList: string[] = ['05JAsv:dLW40U@194.62.30.31:8000', 'C6sSbU:zWeGcu@45.132.20.183:8000', 'C6sSbU:zWeGcu@45.132.22.155:8000', 'EWKspn:mXKd86@194.242.124.40:8000', 'q29LDc:vwmFqk@194.242.125.1:8000', 'q29LDc:vwmFqk@194.242.125.105:8000'];
    const username = req.params.username
    const count = req.params.count as unknown as number
    const byUserId = req.params.water as unknown as boolean
    try {
        const posts = await user(username, {number: count, noWaterMark: false, verifyFp: '', by_user_id: byUserId});
        console.log(posts);
        res.send(posts);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.get('/profile/:username', async (req, res) => {
    const proxyList: string[] = ['05JAsv:dLW40U@194.62.30.31:8000', 'C6sSbU:zWeGcu@45.132.20.183:8000', 'C6sSbU:zWeGcu@45.132.22.155:8000', 'EWKspn:mXKd86@194.242.124.40:8000', 'q29LDc:vwmFqk@194.242.125.1:8000', 'q29LDc:vwmFqk@194.242.125.105:8000'];
    const username = req.params.username
    try {
        // const userInfo = await getUserProfileInfo(username);
        const userInfo = await user(username);
        console.log(userInfo);
        res.send(userInfo);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.post('/video', async (req, res) => {
    // const proxyList: string[] = ['hZ126F:6UqVBU@45.10.248.38:8000'];
    const videoUrl = req.body.videoUrl;
    try {
        const videoMeta = await getVideoMeta(videoUrl, {noWaterMark: true, verifyFp: ''});
        console.log(videoMeta);
        res.send(videoMeta);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.get('/video/:videoId', async (req, res) => {
    // const proxyList: string[] = ['hZ126F:6UqVBU@45.10.248.38:8000'];
    const videoUrl = 'https://www.tiktok.com/@tiktok/video/' + req.params.videoId
    try {
        const videoPost = await getVideoMeta(videoUrl, {hdVideo: true, noWaterMark: true, verifyFp: ''});
        console.log(videoPost);
        res.send(videoPost);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.get('/music/:musicId', async (req, res) => {
    const proxyList: string[] = ['hZ126F:6UqVBU@45.10.248.38:8000'];
    const musicUrl = 'https://www.tiktok.com/music/original-sound-' + req.params.musicId
    // const musicUrl = 'https://www.tiktok.com/music/Say-So-' + req.params.musicId + '?lang=en'
    try {
        //  const posts = await music('6548327243720952577', { number: 1, sessionList: ['sid_tt=asdasd13123123123adasda;'] });
        //      const musicMeta = await getMusicInfo('https://www.tiktok.com/music/Say-So-6763054442704145158?lang=en', {});
        const musicPost = await getMusicInfo(musicUrl, {});
        console.log(musicPost);
        res.send(musicPost);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.post('/music/:musicId', async (req, res) => {
    const proxyList: string[] = ['hZ126F:6UqVBU@45.10.248.38:8000'];
    const musicUrl = 'https://www.tiktok.com/music/original-sound-' + req.params.musicId
    const head =  {
        'user-agent': req.body.agent,
        referer: 'https://www.tiktok.com/',
        cookie: req.body.cookie,
    };
    // const musicUrl = 'https://www.tiktok.com/music/Say-So-' + req.params.musicId + '?lang=en'
    try {
        //  const posts = await music('6548327243720952577', { number: 1, sessionList: ['sid_tt=asdasd13123123123adasda;'] });
        //      const musicMeta = await getMusicInfo('https://www.tiktok.com/music/Say-So-6763054442704145158?lang=en', {});
        const musicPost = await getMusicInfo(musicUrl, {headers: head});
        console.log(musicPost);
        res.send(musicPost);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.post('/sound', async (req, res) => {
    // const proxyList: string[] = ['05JAsv:dLW40U@194.62.30.31:8000', 'C6sSbU:zWeGcu@45.132.20.183:8000', 'C6sSbU:zWeGcu@45.132.22.155:8000', 'EWKspn:mXKd86@194.242.124.40:8000', 'q29LDc:vwmFqk@194.242.125.1:8000', 'q29LDc:vwmFqk@194.242.125.105:8000'];
    const musicUrl = req.body.musicUrl;
    const SoundCloud = require("soundcloud-scraper");
    const client = new SoundCloud.Client("NpVHurnc1OKS80l6zlXrEVN4VEXrbZG4");

    try {
        const musicMeta = await client.getSongInfo(musicUrl);
        console.log(musicMeta);
        res.send(musicMeta);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.post('/sound/download', async (req, res) => {
    // const proxyList: string[] = ['05JAsv:dLW40U@194.62.30.31:8000', 'C6sSbU:zWeGcu@45.132.20.183:8000', 'C6sSbU:zWeGcu@45.132.22.155:8000', 'EWKspn:mXKd86@194.242.124.40:8000', 'q29LDc:vwmFqk@194.242.125.1:8000', 'q29LDc:vwmFqk@194.242.125.105:8000'];
    const musicSavePath = '/home/repository/sound';
    // const musicSavePath = '/Users/azatakhunov/temp/repository/sound';
    const musicUrl = req.body.musicUrl;
    const SoundCloud = require("soundcloud-scraper");
    const client = new SoundCloud.Client("NpVHurnc1OKS80l6zlXrEVN4VEXrbZG4");
    const fs = require("fs");
    try {
        const musicMeta = await client.getSongInfo(musicUrl);
        const stream = await musicMeta.downloadProgressive();

        try {
            if (!fs.existsSync(`${musicSavePath}/${musicMeta.id}.mp3`)) {
                const writer = await stream.pipe(fs.createWriteStream(`${musicSavePath}/${musicMeta.id}.mp3`));
                writer.on("finish", () => {
                    console.log("Finished writing song!")
                });
            }
        } catch(err) {
            console.error(err)
        }
        console.log(musicMeta);
        res.send(musicMeta);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
export {app};
