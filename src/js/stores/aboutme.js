
import { observable, action } from 'mobx';

class AboutMe {
    @observable show = false;

    @action toggle(show = !self.show) {
        self.show = show;
    }
}

const self = new AboutMe();
export default self;
