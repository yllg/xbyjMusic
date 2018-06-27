
import { observable, action } from 'mobx';
import axios from 'axios';

import player from './player';
import home from './home';
import storage from 'utils/storage';
import helper from 'utils/helper';
import lastfm from 'utils/lastfm';

class Me {
    @observable initialized = false;
    @observable logining = false;
    @observable profile = {};
    @observable playlists = [];

    // 拿到登陆用户“我的歌单”，跟用户页user的歌单互不相关
    @action async getUser(userid) {
        var response = await axios.get(`/api/user/${userid}`);
        self.playlists = response.data.playlists;
    }

    // 存储我喜欢的歌曲
    @observable likes = new Map();

    // layout.js的init方法中调用该方法
    @action async init() {
        // 读取应用程序的一些基本配置
        var profile = await storage.get('profile');

        if (!profile) {
            profile = {};
        } else {
            // Cookie expired过期，调用接口--刷新用户登陆
            let response = await axios.get('/login/refresh?' + +Date.now());
            // 登陆失败的话，清空用户的基本配置，并从storage删除profile
            if (response.data.code === 301) {
                profile = {};
                await storage.remove('profile');
            }
        }

        // App has been initialized
        self.profile = profile;
        // 故意延迟1.5秒，可以看清过度的乐评
        setTimeout(() => {
            self.initialized = true;
        }, 3000);
    }

    @action async login(phone, password) {
        self.logining = true;
        // helper工具方法，处理登陆传入的电话号码
        var formatter = helper.formatPhone(phone);
        var response = await axios.get('/login/cellphone', {
            params: {
                countrycode: formatter.code,
                phone: formatter.phone,
                password,
            }
        });
        // 不等于200登陆失败
        if (response.data.code !== 200) {
            console.error(`Failed to login: ${response.data.msg}`);
            self.logining = false;
            return false;
        }
        // 登陆成功的话，把返回的profile存起来（包括用户的id，昵称，生日，城市，头像等信息）
        self.profile = response.data.profile;
        // 调用这个方法，拿到登陆或未登录两种状态下的歌曲信息，并判断是否自动播放
        await home.load();
        // 个人信息存起来
        await storage.set('profile', self.profile);
        self.logining = false;

        return self.profile;
    }

    @action async logout() {
        await storage.remove('profile');
    }

    // 保存“我喜欢的音乐”歌单
    @action rocking(likes) {
        var mapping = new Map();

        // Keep the liked playlist id，保存“我喜欢的音乐”列表的id
        mapping.set('id', likes.id.toString());
        // 再遍历保存每一首
        likes.songs.map(e => {
            mapping.set(e.id, true);
        });

        self.likes.replace(mapping);
    }

    // Check is a red heart song
    isLiked(id) {
        return self.hasLogin() && self.likes.get(id);
    }

    // Like a song
    @action async like(song) {
        await lastfm.love(song);

        if (await self.exeLike(song, true)) {
            self.likes.set(song.id, true);
        }
    }

    // Unlike a song
    @action async unlike(song) {
        await lastfm.unlove(song);
        self.likes.set(song.id, !(await self.exeLike(song, false)));
    }

    async exeLike(song, truefalse) {
        var response = await axios.get('/like', {
            params: {
                id: song.id,
                like: truefalse
            }
        });

        // Update the playlist of player screen
        if (self.likes.get('id') === player.meta.id) {
            let songs = player.songs;
            let index = songs.findIndex(e => e.id === song.id);

            if (index === -1) {
                // You like this song
                songs = [
                    song,
                    ...songs,
                ];
            } else {
                // Remove song from playlist
                songs = [
                    ...songs.slice(0, index),
                    ...songs.slice(index + 1, songs.length),
                ];
            }

            player.songs = songs;
        }

        return response.data.code === 200;
    }

    hasLogin() {
        return !!self.profile.userId;
    }
}

const self = new Me();
export default self;
