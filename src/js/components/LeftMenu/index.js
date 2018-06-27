
import React, { Component } from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import injectSheet from 'react-jss';

import classes from './classes';

@inject(stores => ({
    // 是否登录
    hasLogin: stores.me.hasLogin,
    // 用户的歌单信息，创建的歌单和收藏的歌单
    playlists: stores.me.playlists,
    // 根据用户id拿到用户的歌单信息
    getUser: stores.me.getUser,
    // 用户个人信息，有用户id
    profile: stores.me.profile,
}))

@observer
class Home extends Component {
    // 拿用户id去取歌单信息
    componentWillMount = () => {
        var logined = this.props.hasLogin();
        // 登陆了才去请求用户信息
        if (logined) {
            this.props.getUser(this.props.profile.userId);
        }
    }

    // 左侧菜单 推荐~
    recommendMenu() {
        var { classes } = this.props;
        var logined = this.props.hasLogin();
        return (
            <div className={classes.leftMenu}>
                <span className={classes.leftMenuSpan}>推荐</span>
                <Link to="/">
                    <div className={classes.leftMenuItem}><i className={'ion-music-note'} /><p>发现音乐</p></div>
                </Link>
                {
                    (() => {
                        if (logined) {
                            return (
                                <Link to="/fm">
                                    <div className={classes.leftMenuItem}><i className={'ion-radio-waves'} /><p>私人FM</p></div>
                                </Link>
                            );
                        }
                        return (
                            <Link to="/login/0">
                                <div className={classes.leftMenuItem}><i className={'ion-radio-waves'} /><p>私人FM</p></div>
                            </Link>
                        );
                    })()
                }
                <div className={classes.leftMenuItem}><i className={'ion-social-youtube-outline'} /><p>MV</p></div>
                <div className={classes.leftMenuItem}><i className={'ion-person-stalker'} /><p>朋友</p></div>
            </div>
        );
    }

    // 左侧菜单 我的音乐~
    myMusicMenu() {
        var { classes } = this.props;
        return (
            <div className={classes.leftMenu}>
                <span className={classes.leftMenuSpan}>我的音乐</span>
                <div className={classes.leftMenuItem}><i className={'ion-music-note'} /><p>iTunes音乐</p></div>
                <div className={classes.leftMenuItem}><i className={'ion-archive'} /><p>下载的音乐</p></div>
                <div className={classes.leftMenuItem}><i className={'ion-person'} /><p>我的歌手</p></div>
                <div className={classes.leftMenuItem}><i className={'ion-social-youtube-outline'} /><p>我的MV</p></div>
            </div>
        );
    }

    // 左侧菜单 我创建的歌单~
    myCreatePlayListMenu() {
        var { classes, playlists, profile } = this.props;
        var logined = this.props.hasLogin();
        // 未登录，提示去登录
        if (!logined) {
            return (
                <div className={classes.leftMenu}>
                    <span className={classes.leftMenuSpan}>创建的歌单</span>
                    <Link to="/login/0">
                        <div className={classes.leftMenuItem}>
                            <i className={'ion-android-favorite-outline'} />
                            <p>登录即可看到歌单~</p>
                        </div>
                    </Link>
                </div>
            );
        }

        return (
            <div className={classes.leftMenu}>
                <span className={classes.leftMenuSpan}>创建的歌单</span>
                {
                    playlists.map((e, index) => {
                        // 只留下我创建的歌单
                        if (e.creator !== profile.userId) {
                            return false;
                        }
                        return (
                            <Link to={e.link} key={index}>
                                <div className={classes.leftMenuItem}>
                                    {
                                        (() => {
                                            if (index === 0) {
                                                return (
                                                    <i className={'ion-android-favorite-outline'} />
                                                );
                                            }
                                            return (
                                                <i className={'ion-mic-c'} />
                                            );
                                        })()
                                    }
                                    <p>{e.name}</p>
                                </div>
                            </Link>
                        );
                    })
                }
            </div>
        );
    }

    // 左侧菜单 我收藏的歌单~
    myFavPlayListMenu() {
        var { classes, playlists, profile } = this.props;
        var logined = this.props.hasLogin();
        // 未登录，提示去登录
        if (!logined) {
            return (
                <div className={classes.leftMenu}>
                    <span className={classes.leftMenuSpan}>收藏的歌单</span>
                    <Link to="/login/0">
                        <div className={classes.leftMenuItem}>
                            <i className={'ion-android-favorite-outline'} />
                            <p>登录即可看到歌单~</p>
                        </div>
                    </Link>
                </div>
            );
        }

        return (
            <div className={classes.leftMenu}>
                <span className={classes.leftMenuSpan}>收藏的歌单</span>
                {
                    playlists.map((e, index) => {
                        // 只留下不是我创建的
                        if (e.creator === profile.userId) {
                            return false;
                        }
                        return (
                            <Link to={e.link} key={index}>
                                <div className={classes.leftMenuItem}>
                                    {
                                        (() => {
                                            if (index === 0) {
                                                return (
                                                    <i className={'ion-android-favorite-outline'} />
                                                );
                                            }
                                            return (
                                                <i className={'ion-mic-c'} />
                                            );
                                        })()
                                    }
                                    <p>{e.name}</p>
                                </div>
                            </Link>
                        );
                    })
                }
            </div>
        );
    }

    render() {
        var { classes } = this.props;

        return (
            <aside className={classes.aside}>
                {
                    this.recommendMenu()
                }
                {
                    this.myMusicMenu()
                }
                {
                    this.myCreatePlayListMenu()
                }
                {
                    this.myFavPlayListMenu()
                }
            </aside>
        );
    }
}

export default injectSheet(classes)(Home);
