
import { observable, action } from 'mobx';
import axios from 'axios';

import me from './me';
import preferences from './preferences';
import controller from './controller';

class Home {
    @observable loading = true;
    @observable list = [];
    @observable bannerList = [];

    @action async load() {
        var res;

        if (me.hasLogin()) {
            // 登陆时，获取到首页所有的歌曲数据
            res = await axios.get(`/api/home/${me.profile.userId}`);
            // 结果数组的第一个元素是“我喜欢的音乐”数组，第二个是“日推歌单”
            let favorite = res.data.list[0];
            let recommend = res.data.list[1];

            // Save the songs of red heart
            me.rocking(favorite);

            if (recommend.length) {
                // Play the recommend songs
                controller.setup(recommend);
            } else {
                controller.setup(favorite);
            }
        } else {
            // 未登陆时拿热门歌单
            res = await axios.get(`/api/home`);
            controller.setup(res.data.list[0]);
        }

        if (preferences.autoPlay) {
            controller.play();
        } else {
            controller.song = controller.playlist.songs[0];
        }

        self.list = res.data.list;

        return self.list;
    }

    @action async loadBanner() {
        var res;

        // 获取到首页banner轮播图信息，官方api参数不明，所以数据比较旧
        res = await axios.get(`/banner`);

        self.bannerList = res.data.banners;

        return self.bannerList;
    }

    @action async getList() {
        self.loading = true;

        await self.load();
        await self.loadBanner();

        // Just call once for init player
        self.getList = Function;
        self.loading = false;
    }
}

const self = new Home();
export default self;
