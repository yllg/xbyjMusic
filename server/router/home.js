import express from 'express';
import axios from 'axios';
import uuid from 'uuid';
import _debug from 'debug';

const debug = _debug('dev:api');
const error = _debug('dev:error');
const router = express();

// 获得最新专辑，好像这个api改了哦
async function getNewest() {
    var list = [];

    try {
        let response = await axios.get('/hot/album');

        if (response.data.code !== 200) {
            throw response.data;
        } else {
            response.data.albums.map(e => {
                list.push({
                    id: e.id.toString(),
                    type: 1,
                    name: e.name,
                    size: e.size,
                    cover: `${e.picUrl}?param=130y130`,
                    link: `/player/1/${e.id}`,
                });
            });
        }
    } catch (ex) {
        error('Failed to get hot album: %O', ex);
    }

    return list;
}

// 推荐歌单--热门精选的歌单吧
async function getPersonalized() {
    var list = [];

    try {
        let response = await axios.get('/personalized');

        if (response.data.code !== 200) {
            throw response.data;
        } else {
            response.data.result.map(e => {
                list.push({
                    id: e.id.toString(),
                    type: 0,
                    name: e.name,
                    played: e.playCount,
                    cover: `${e.picUrl}?param=130y130`,
                    link: `/player/0/${e.id}`
                });
            });
        }
    } catch (ex) {
        error('Failed to get personalized: %O', ex);
    }

    return list;
}

// 获取歌单内的全部音乐的详情；歌单只有歌单名称，看不到具体歌单内容哦
async function getSongs(id) {
    var songs = [];

    try {
        let response = await axios.get(`/playlist/detail?id=${id}`);

        if (response.data.code === 200) {
            songs = response.data.playlist.tracks.map(e => {
                // eslint-disable-next-line
                var {al /* Album */, ar /* Artist */} = e;

                return {
                    id: e.id.toString(),
                    name: e.name,
                    duration: e.dt,
                    album: {
                        id: al.id.toString(),
                        name: al.name,
                        cover: `${al.picUrl}?param=y100y100`,
                        link: `/player/1/${al.id}`
                    },
                    artists: ar.map(e => ({
                        id: e.id.toString(),
                        name: e.name,
                        // Broken link
                        link: e.id ? `/artist/${e.id}` : '',
                    }))
                };
            });
        } else {
            throw response.data;
        }
    } catch (ex) {
        error('Failed to get songs %O', ex);
    }

    return songs;
}

// 获取用户歌单信息
async function getLiked(id) {
    var list = [];

    try {
        let response = await axios.get(`/user/playlist?uid=${id}`);

        if (response.data.code !== 200) {
            error('Failed to get liked: %O', response.data);
        } else {
            let liked = response.data.playlist[0];
            let songs = await getSongs(liked.id);

            list = [{
                id: liked.id.toString(),
                name: liked.name,
                size: liked.trackCount,
                updateTime: liked.updateTime,
                publishTime: liked.publishTime,
                link: `/player/0/${liked.id}`,
                songs,
            }];
        }
    } catch (ex) {
        error('Failed to get liked: %O', ex);
    }
    return list;
}

// 获取用户的每日推荐歌曲
async function getDaily() {
    var list = [];

    try {
        let response = await axios.get('/recommend/songs');

        if (response.data.code !== 200) {
            throw response.data;
        } else {
            list = [{
                id: uuid.v4(),
                name: '每日推荐歌曲',
                size: response.data.recommend.length,
                songs: response.data.recommend.map(e => {
                    var { album, artists } = e;

                    return {
                        id: e.id.toString(),
                        name: e.name,
                        duration: e.duration,
                        album: {
                            id: album.id.toString(),
                            name: album.name,
                            cover: `${album.picUrl}?param=100y100`,
                            link: `/player/1/${album.id}`,
                        },
                        artists: artists.map(e => ({
                            id: e.id.toString(),
                            name: e.name,
                            // Broken link
                            link: e.id ? `/artist/${e.id}` : '',
                        }))
                    };
                }),
            }];
        }
    } catch (ex) {
        error('Failed to get daily songs: %O', ex);
    }
    return list;
}

// 每日推荐歌单--个性化栏目，日推歌曲后面的歌单
async function getRecommend() {
    var list = [];

    try {
        let response = await axios.get('/recommend/resource');

        if (response.data.code !== 200) {
            throw response.data;
        } else {
            response.data.recommend.map(e => {
                list.push({
                    id: e.id.toString(),
                    type: 0,
                    name: e.name,
                    played: e.playcount,
                    cover: `${e.picUrl}?param=130y130`,
                    link: `/player/0/${e.id}`,
                    reason: e.copywriter
                });
            });
        }
    } catch (ex) {
        error('Failed to get recommend: %O', ex);
    }

    return list;
}

router.get('/:id?', async(req, res) => {
    debug('Handle request for /home');

    var list = [];
    var unique = [];
    var id = req.params.id;

    debug('Params \'id\': %s', id);

    if (id) {
        // 如果有用户id即登陆了，取5组信息，喜欢的歌单，日推歌曲，日推歌单，热门歌单，最新专辑
        list = [
            ...(await getLiked(id)),
            ...(await getDaily()),
            ...(await getRecommend()),
            ...(await getPersonalized()),
            ...(await getNewest()),
        ];
    } else {
        // 没有登录，取热门歌单
        let personalized = await getPersonalized();
        // 根据歌单的id，拿到歌单内部的所有歌曲信息
        personalized[0].songs = await getSongs(personalized[0].id);
        // debug('%O', personalized[0].songs);
        list = [
            ...personalized,
            ...(await getNewest()),
        ];
    }

    // Remove the duplicate items，去掉重复的歌曲
    list.map(e => {
        var index = unique.findIndex(item => item.id === e.id);
        // 没有相同的歌曲id才push
        if (index === -1) {
            unique.push(e);
        }
    });

    res.send({
        list: unique,
    });
});

module.exports = router;
