
import { observable, action } from 'mobx';
import axios from 'axios';

import me from './me';

class dailyPlayer {
    @observable loading = true;
    @observable list = [];

    @action async load() {
        var res;

        try {
            res = await axios.get(`api/dailyplayer/${me.profile.userId}`);
        } catch (e) {
            console.log('请求日推歌曲数据出错', e);
        };
        self.list = res.data.list[0];
        return self.list;
    }

    @action async getList() {
        self.loading = true;
        await self.load();

        // Just call once for init player
        self.getList = Function;
        self.loading = false;
    }
}

const self = new dailyPlayer();
export default self;
