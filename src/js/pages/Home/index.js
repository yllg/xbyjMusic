
import React, { Component } from 'react';
// import Scroller from 'react-scroll-horizontal';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import injectSheet from 'react-jss';
import moment from 'moment';
import clazz from 'classname';

import classes from './classes';
import helper from 'utils/helper';
import Loader from 'ui/Loader';
import Header from 'components/Header';
import Controller from 'components/Controller';
import Carousel from 'components/Carousel';
import LeftMenu from 'components/LeftMenu';

@inject(stores => ({
    // 是否登录
    hasLogin: stores.me.hasLogin,
    // 从stores的home中拿到首页的播放列表数据
    playlist: stores.home.list,
    // 从stores的home中拿到首页的轮播图数据
    bannerList: stores.home.bannerList,
    // 获取首页数据的方法
    getPlaylist: stores.home.getList,
    // 是否正在加载
    loading: stores.home.loading,
    play: (playlist) => {
        var controller = stores.controller;

        controller.setup(playlist);
        controller.play();
    },
    toggle: stores.controller.toggle,
    // 判断某首歌是否正在播放，用来判断是否添加类名（样式）
    isPlaying: (id) => {
        var controller = stores.controller;
        // 控制器正在播放且歌曲id相同
        return controller.playing && controller.playlist.id === id;
    },
    // 能否开关（暂停和继续播放），否则只能重新播放哦
    canitoggle: (id) => {
        // Should has same id
        return stores.controller.playlist.id === id;
    },
    // 滚动方向
    naturalScroll: stores.preferences.naturalScroll,
    // 用户的歌单信息，创建的歌单和收藏的歌单
    playlists: stores.user.playlists,
    // 根据用户id拿到用户的歌单信息
    getUser: stores.user.getUser,
    // 用户个人信息，有用户id
    profile: stores.me.profile,
}))

@observer
class Home extends Component {
    // 拿用户id去取歌单信息
    componentWillMount = () => this.props.getUser(this.props.profile.userId);

    componentDidMount() {
        this.props.getPlaylist();
    }

    // "每日推荐歌曲"
    renderDaily(item) {
        var { classes, isPlaying } = this.props;
        var playing = isPlaying(item.id);
        // console.log(item);
        return (
            <Link
                to="/dailyPlayer">
                <div
                    className={clazz('clearfix', classes.personItemWrap, {
                        [classes.playing]: playing,
                    })}
                    // onClick={e => canitoggle(item.id) ? toggle() : play(item)}
                >
                    <div className={classes.mask}>
                        {
                            <span className={classes.personDate}>{moment().date()}</span>
                        }
                    </div>

                    <div className={clazz(classes.personInfo, classes.personInfoDaily)}>
                        <div className={classes.title}>
                            {item.name}
                        </div>
                        <div className={classes.description}>
                            根据你的口味生成，每天更新！
                        </div>
                    </div>
                    <div className={classes.rowLineLeft}>.</div>
                    <div className={classes.rowLineRight}>.</div>
                    <div className={classes.columnLineTop}>.</div>
                    <div className={classes.columnLineBottom}>.</div>
                </div>
            </Link>
        );
    }

    // 日推歌单和热门歌单
    renderItem(item, index) {
        var { classes, isPlaying, hasLogin } = this.props;
        var logined = hasLogin();
        // console.log(logined);
        // 登陆的情况，需要分两类，个人推荐和热门歌单
        if (logined) {
            return (
                <Link
                    to={item.link}
                    className={clazz('clearfix', {
                        [classes.playing]: isPlaying(item.id),
                        [classes.personItemWrap]: index < 5,
                        [classes.itemWrap]: index > 5,
                    })}>
                    <img src={item.cover} />
                    <div className={clazz({
                        [classes.personInfo]: index < 5,
                        [classes.info]: index > 5,
                    })}>
                        <span className={clazz({
                            [classes.subtitle]: index < 5,
                            [classes.hotsubtitle]: index > 5,
                        })}>
                            <i
                                className={clazz('ion-headphone')}
                            />
                            &nbsp;
                            {
                                item.type === 0
                                    ? `${helper.humanNumber(item.played)}`
                                    : `${item.size} 首`
                            }
                        </span>
                        <div className={clazz({
                            [classes.title]: index < 5,
                            [classes.hottitle]: index > 5,
                        })}>
                            {item.name}
                        </div>
                        {
                            (() => {
                                if (index > 5) {
                                    return false;
                                }
                                return (
                                    <div className={classes.description}>{item.reason}</div>
                                );
                            })()
                        }
                    </div>
                </Link>
            );
        } else { // 未登录的情况，全都是热门歌单
            return (
                <Link
                    to={item.link}
                    className={clazz('clearfix', {
                        [classes.playing]: isPlaying(item.id),
                        [classes.itemWrap]: true,
                    })}>
                    <img src={item.cover} />
                    <div className={clazz({
                        [classes.info]: true,
                    })}>
                        <span className={clazz({
                            [classes.hotsubtitle]: true,
                        })}>
                            <i
                                className={clazz('ion-headphone')}
                            />
                            &nbsp;
                            {
                                item.type === 0
                                    ? `${helper.humanNumber(item.played)}`
                                    : `${item.size} 首`
                            }
                        </span>
                        <div className={clazz({
                            [classes.hottitle]: true,
                        })}>
                            {item.name}
                        </div>
                    </div>
                </Link>
            );
        }
    }

    // 渲染“个性化推荐”列表
    renderPersonPlaylist() {
        var { classes, playlist } = this.props;
        var logined = this.props.hasLogin();
        // 如果没有登录，或者个性化歌单长度为0，返回false
        if (!logined
            || playlist.length === 0) {
            return false;
        }
        return (
            <div style={{paddingLeft: '8px'}}>
                <div className={classes.playlistTitle}>
                    <span style={{marginRight: '10px', paddingBottom: '5px', borderBottom: '4px solid #ddd'}}>个性化推荐</span>
                    <span style={{fontSize: '12px', color: '#555'}}>根据你的口味生成，播放和收藏越多，推荐越准</span>
                </div>
                {
                    // 0我喜欢的，1日推，2345是推荐歌单，6之后是热门歌单
                    playlist.map((e, index) => {
                        var isDaily = logined && index === 1;
                        // 日推歌单的长度为0就跳过
                        if (isDaily && e.songs.length === 0) {
                            return false;
                        }
                        // 0我喜欢的，1日推，2345是推荐歌单，6之后是热门歌单
                        // 只留下1和234三个推荐歌单
                        if (index === 0 || index >= 5) {
                            return false;
                        }

                        return (
                            <div
                                className={clazz('clearfix', classes.personItem)}
                                key={index}>
                                {

                                    isDaily ? this.renderDaily(e) : this.renderItem(e, index)
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    // 渲染“热门精选”列表
    renderPlaylist() {
        var { classes, playlist, hasLogin } = this.props;
        var logined = hasLogin();
        // console.log(playlist);
        return (
            <div style={{paddingBottom: '20px'}}>
                <div className={classes.hotplaylistTitle}>
                    <span style={{marginRight: '10px', paddingBottom: '5px', borderBottom: '4px solid #ddd'}}>热门精选</span>
                </div>
                {
                    playlist.map((e, index) => {
                        if (logined) {
                            // 登陆的情况，0我喜欢的，1日推，2345是推荐歌单，6之后是热门歌单
                            // 只留下前8个热门歌单
                            if (index < 6 || index > 13) {
                                return false;
                            }

                            return (
                                <div
                                    className={clazz('clearfix', classes.item)}
                                    key={index}>
                                    {
                                        this.renderItem(e, index)
                                    }
                                </div>
                            );
                        } else {
                            // 未登陆的情况，0到5是热门歌单，后面是最新专辑
                            // 取前8个
                            if (index > 7) {
                                return false;
                            }

                            return (
                                <div
                                    className={clazz('clearfix', classes.item)}
                                    key={index}>
                                    {
                                        this.renderItem(e, index)
                                    }
                                </div>
                            );
                        }
                    })
                }
            </div>
        );
    }

    // 渲染3D轮播图~
    renderBannerlist() {
        var { bannerList } = this.props;
        // console.log(bannerList);
        return (
            <Carousel bannerList={bannerList} picWidth="500px" />
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

    // 左侧菜单 我的歌单，创建的和收藏的放一起~
    myPlayListMenu() {
        var { classes, playlists } = this.props;
        var logined = this.props.hasLogin();
        // 未登录，提示去登录
        if (!logined) {
            return (
                <div className={classes.leftMenu}>
                    <span className={classes.leftMenuSpan}>我的歌单</span>
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
                <span className={classes.leftMenuSpan}>我的歌单</span>
                {
                    playlists.map((e, index) => {
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
        var { classes, loading } = this.props;

        return (
            <div
                className={classes.container}
                ref="container">
                <Loader
                    show={loading}
                    text="Please Wait ..." />
                <Header {...{
                    showBack: false,
                }} />

                <LeftMenu />

                <main >
                    <div className={classes.mainbody}>
                        <div className={classes.maintop}>
                            <div className={classes.type} >
                                <div style={{color: '#B92A25'}}>推荐</div>
                                <Link
                                    to="/top">
                                    <div>排行榜</div>
                                </Link>
                                <Link
                                    to="/playlist/全部">
                                    <div>歌单</div>
                                </Link>
                                <div>主播电台</div>
                                <div>最新音乐</div>
                            </div>
                            <div className={classes.carousel} >
                                {
                                    this.renderBannerlist()
                                }
                            </div>
                        </div>
                        {
                            this.renderPersonPlaylist()
                        }
                        {
                            this.renderPlaylist()
                        }
                    </div>
                </main>

                <Controller />
            </div>
        );
    }
}

export default injectSheet(classes)(Home);
