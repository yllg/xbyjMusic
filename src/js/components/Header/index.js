
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import { ipcRenderer, remote } from 'electron';
import injectSheet from 'react-jss';

import classes from './classes';
import FadeImage from 'ui/FadeImage';

@inject(stores => ({
    subscribed: stores.player.meta.subscribed,
    hasLogin: stores.me.hasLogin,
    profile: stores.me.profile,
    subscribe: stores.player.subscribe,
    showMenu: () => stores.aboutme.toggle(true),
    showPlaying: () => stores.playing.toggle(true),
    close: () => stores.aboutme.toggle(false),
    showSearch: () => stores.search.toggle(true),
}))
@observer
class Header extends Component {
    static propTypes = {
        showBack: PropTypes.bool,
        color: PropTypes.string,
    };

    static defaultProps = {
        showBack: true,
        showFav: false,
        showFollow: false,
        color: '#fff',
    };

    goBack = () => this._reactInternalInstance._context.router.goBack();

    // 回退按钮
    renderBack() {
        var { showBack } = this.props;

        if (!showBack) {
            return (
                <i
                    className="ion-chevron-left"
                    style={{
                        color: '#666'
                    }} />
            );
        }

        return (
            <i
                className="ion-chevron-left"
                onClick={e => this.goBack()}
                style={{
                    color: '#fff'
                }} />
        );
    }

    // 右上角 “登录”
    renderMe() {
        var { classes, close, hasLogin, profile } = this.props;
        var link = `/user/${profile.userId}`;
        // 没登录，提示去登录
        if (!hasLogin()) {
            return (
                <p className={classes.signin}>
                    <Link
                        onClick={close}
                        to="/login/0">
                        登录/Sign in
                    </Link>
                </p>
            );
        }
        // 已登录，显示头像
        return (
            <artist className={classes.profile}>
                <Link
                    className="clearfix"
                    onClick={close}
                    to={link}>
                    <FadeImage src={profile.avatarUrl} />
                </Link>

                <div className={classes.info}>
                    <p
                        className={classes.username}
                        onClick={close}
                        title={profile.nickname}>
                        <Link to={link}>{profile.nickname}</Link>
                    </p>
                    <a
                        className={classes.logout}
                        href=""
                        onClick={e => this.doLogout()}>
                        Logout
                    </a>
                </div>
            </artist>
        );
    }
    // 退出登录
    doLogout() {
        // Clear cookies
        remote.getCurrentWindow().webContents.session.clearStorageData();
        this.props.logout();
    }

    render() {
        var { classes, showSearch } = this.props;

        return (
            <header className={classes.container}>
                <Link to={'/'}>
                    <i
                        className="ion-home"
                        style={{
                            color: '#fff',
                            position: 'absolute',
                            top: 14,
                            left: 20,
                            fontSize: 24,
                        }} />
                </Link>
                <span className={classes.logo} onClick={() => this.props.showMenu()}> 悬笔e绝 </span>

                <div className={classes.goBack}>
                    {
                        this.renderBack()
                    }
                </div>
                <div className={classes.goForward}>
                    <i
                        className="ion-chevron-right"
                        style={{
                            color: '#666'
                        }} />
                </div>

                <input className={classes.search}
                    autoFocus={false}
                    onFocus={() => {
                        showSearch();
                    }}
                    placeholder=" 🔍 &nbsp;搜索音乐,&nbsp;歌手,&nbsp;歌词,&nbsp;用户"
                    type="text" />

                <i
                    className="ion-ios-arrow-down"
                    onClick={e => ipcRenderer.send('minimize')}
                    style={{
                        color: this.props.color,
                        position: 'absolute',
                        top: 14,
                        right: 170,
                    }} />

                <Link to={'/preferences'}>
                    <i
                        className="ion-android-settings"
                        style={{
                            color: '#fff',
                            position: 'absolute',
                            top: 14,
                            right: 140,
                            fontSize: 18,
                        }} />
                </Link>

                <i
                    className="ion-android-more-vertical"
                    style={{
                        color: '#fff',
                        position: 'absolute',
                        right: 100,
                        fontSize: 25,
                    }} />

                {
                    this.renderMe()
                }
            </header>
        );
    }
}

export default injectSheet(classes)(Header);
