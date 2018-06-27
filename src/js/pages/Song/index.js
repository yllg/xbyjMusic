
import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import injectSheet from 'react-jss';

import classes from './classes';
import ProgressImage from 'ui/ProgressImage';
import Loader from 'ui/Loader';
import Header from 'components/Header';
import Controller from 'components/Controller';
import Lyrics from 'components/Lyrics';
import Comments from 'components/Comments';
import helper from 'utils/helper';

@inject(stores => ({
    // 是否登录
    hasLogin: stores.me.hasLogin,
    loading: stores.lyrics.loading,
    song: stores.controller.song,
    playing: stores.controller.playing,
    toggle: stores.controller.toggle,
    // 相似歌单，相似单曲，最近收听的用户
    getRelated: stores.player.getRelated,
    recomPlayList: stores.player.recommend,
    simiSong: stores.player.simiSong,
    users: stores.player.users,
    artists: stores.player.artists,
    getList: async args => {
        var { id, type } = args;
        await stores.player.getDetail(type, id);
    },
    updateController: async(songid) => {
        var { controller, player } = stores;
        var meta = player.meta;
        controller.setup({
            id: meta.id,
            link: `/player/${meta.type}/${meta.id}`,
            name: meta.name,
            songs: player.songs,
        });
        await controller.play(songid);
    },
}))
@observer
class Song extends Component {
    async load(props) {
        var { getRelated, song } = props;
        await getRelated(song);
    }

    componentWillMount() {
        // 异步加载 相关推荐
        this.load(this.props);
    }

    componentWillReceiveProps(nextProps) {
    }

    async playSimiSong(e) {
        // console.log('点击事件接收到参数', e);
        // 用正则的match把link的id和type拆出来
        var params = {id: 11560, type: 1};
        await this.props.getList(params);
        await this.props.updateController(e.id);
        // 跳转到song页面即可
        hashHistory.push({
            pathname: '/song'
        });
    }

    render() {
        var { classes, loading, recomPlayList, simiSong, users, song } = this.props;
        var logined = this.props.hasLogin();
        return (
            <div className={classes.container}>

                <Loader show={loading} />
                <Header color={`#fff`} />

                <main>
                    <Lyrics {...{
                        isFM: false,
                        controSong: song,
                    }} />

                    <div className={classes.comments}>

                        <Comments />
                        <div className={classes.recommend}>
                            <div className={classes.recomPlayList}>
                                <div className={classes.recommendTitleWrap}>
                                    <span className={classes.recommendTitle}>包含这首歌的歌单</span>
                                </div>
                                {
                                    recomPlayList.map((e, index) => {
                                        if (recomPlayList.length === 0) {
                                            return (
                                                <div className={classes.nothing}>暂无相似歌单 ...</div>
                                            );
                                        }
                                        if (index > 2) {
                                            return false;
                                        }
                                        return (
                                            <div key={index}>
                                                <Link
                                                    className="clearfix"
                                                    to={e.link}>
                                                    <ProgressImage {...{
                                                        height: 40,
                                                        width: 40,
                                                        src: e.cover,
                                                    }} />
                                                    <span className={classes.recomPlayListContent}>
                                                        <p style={{color: '#222'}}>{e.name}</p>
                                                        <p>
                                                            播放：&nbsp;
                                                            {helper.humanNumber(e.playCount)}
                                                        </p>
                                                    </span>
                                                </Link>
                                            </div>

                                        );
                                    })
                                }
                            </div>
                            <div className={classes.simiSong}>
                                <div className={classes.recommendTitleWrap}>
                                    <span className={classes.recommendTitle}>相似歌曲</span>
                                </div>
                                {
                                    simiSong.map((e, index) => {
                                        // console.log('相似歌曲信息', e);
                                        if (simiSong.length === 0) {
                                            return (
                                                <div className={classes.nothing}>暂无相似歌曲 ...</div>
                                            );
                                        }
                                        return (
                                            <div key={index}>
                                                <Link
                                                    className="clearfix" to={e.link}>
                                                    <ProgressImage {...{
                                                        height: 40,
                                                        width: 40,
                                                        src: e.cover,
                                                    }} />
                                                    <span className={classes.recomPlayListContent}>
                                                        <p style={{color: '#222'}}>{e.name}</p>
                                                        <p> {e.artists[0].name}</p>
                                                    </span>
                                                </Link>
                                            </div>

                                        );
                                    })
                                }
                            </div>
                            <div className={classes.users}>
                                {
                                    (logined) && (
                                        <div className={classes.recommendTitleWrap}>
                                            <span className={classes.recommendTitle}>喜欢这首歌的人</span>
                                        </div>
                                    )
                                }
                                {
                                    users.map((e, index) => {
                                        if (users.length === 0) {
                                            return (
                                                <div className={classes.nothing}>暂无数据 ...</div>
                                            );
                                        }
                                        return (
                                            <div key={index}>
                                                <Link
                                                    className="clearfix"
                                                    to={e.link}>
                                                    <ProgressImage {...{
                                                        height: 40,
                                                        width: 40,
                                                        src: e.avatar,
                                                    }} />
                                                    <span className={classes.recomUserContent}>
                                                        <span style={{marginRight: 5}}> {e.name}</span>
                                                        <span>
                                                            {
                                                                (() => {
                                                                    if (e.gender === 1) {
                                                                        return <i className="ion-male" style={{color: '#55b4e9', fontSize: 15}} />;
                                                                    } else if (e.gender === 2) {
                                                                        return <i className="ion-female" style={{color: '#f4b4d1', fontSize: 18}} />;
                                                                    }
                                                                    return false;
                                                                })()
                                                            }
                                                        </span>
                                                        <span style={{float: 'right'}}>{e.recommendReason}</span>
                                                    </span>
                                                </Link>
                                            </div>

                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </main>
                <Controller />
            </div>
        );
    }
}

export default injectSheet(classes)(Song);
