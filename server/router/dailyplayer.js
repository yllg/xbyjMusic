import express from 'express';
import axios from 'axios';
import uuid from 'uuid';
import _debug from 'debug';

const debug = _debug('dev:api');
const error = _debug('dev:error');
const router = express();

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

router.get('/:id?', async(req, res) => {
    debug('Handle request for /home');

    var list = [];
    var unique = [];
    var id = req.params.id;

    if (id) {
        // 如果有用户id即登陆了，只取日推歌曲
        list = [
            ...(await getDaily()),
        ];
    }

    // debug('拿到日推歌曲信息', list);

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
