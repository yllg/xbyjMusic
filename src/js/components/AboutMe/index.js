
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import injectSheet from 'react-jss';

import classes from './classes';
import SyncCarousel from 'components/SyncCarousel';

@inject(stores => ({
    show: stores.aboutme.show,
    close: () => stores.aboutme.toggle(false),
}))
@observer
class AboutMe extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.show === true) {
            setTimeout(() => {
                this.refs.container.focus();
            });
        }
    }

    // 渲染同步轮播图SyncCarousel~
    renderBannerlist() {
        var bannerList = [{pic: 'assets/github.png'}, {pic: 'assets/WeChat.jpg'}, {pic: 'assets/WeChatGroup.png'}];
        return (
            <SyncCarousel bannerList={bannerList} />
        );
    }

    render() {
        var { classes, show, close } = this.props;

        if (!show) {
            return false;
        }

        return (
            <div
                className={classes.container}
                // Press ESC close menu
                onKeyUp={e => e.keyCode === 27 && this.props.close()}
                ref="container"
                tabIndex="-1">
                <div
                    className={classes.overlay}
                    onClick={close} />
                <section className={classes.body}>
                    <div className={classes.carousel} >
                        {
                            this.renderBannerlist()
                        }
                    </div>
                </section>
            </div>
        );
    }
}

export default injectSheet(classes)(AboutMe);
