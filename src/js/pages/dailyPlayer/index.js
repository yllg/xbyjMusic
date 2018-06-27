
import React, { Component } from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import injectSheet from 'react-jss';
import clazz from 'classname';
import moment from 'moment';

import classes from './classes';
import Loader from 'ui/Loader';
import Header from 'components/Header';
import Controller from 'components/Controller';
import FadeImage from 'ui/FadeImage';

@inject(stores => ({
    loading: stores.dailyplayer.loading,
    list: stores.dailyplayer.list,
    // 获取日推歌曲数据
    getPlaylist: stores.dailyplayer.getList,
    song: stores.controller.song,
    playing: stores.controller.playing,
    toggle: stores.controller.toggle,
    // 是否能播放暂停，toggle
    canitoggle: () => stores.controller.playlist.id === stores.dailyplayer.list.id,
    play: async(songid) => {
        var { controller } = stores;
        var sameToPlaying = controller.playlist.id === stores.dailyplayer.list.id;
        // 播放全部，没有传入歌曲id
        if (!songid) {
            // 已加载日推
            if (sameToPlaying) {
                controller.toggle();
            } else {
                // 加载日推，并播放第一首
                controller.setup(stores.dailyplayer.list);
                await controller.play();
            }
            return;
        }
        // controller已经加载了日推歌单时，直接传入歌曲id
        if (sameToPlaying) {
            // Song is playing
            if (songid === controller.song.id) {
                controller.toggle();
                return;
            }
            await controller.play(songid);
            return;
        }
        // 第一次进入日推页面，加载日推歌单，播放选中的歌曲
        controller.setup(stores.dailyplayer.list);
        await controller.play(songid);
    },
    hasLogin: stores.me.hasLogin,
}))

@observer
class dailyPlayer extends Component {
    componentDidMount() {
        this.props.getPlaylist();
    }

    renderList() {
        var { classes, playing, canitoggle, song, list } = this.props;
        var sameToPlaylist = canitoggle();
        // console.log('list', list);

        if (list.length === 0) {
            return (
                <div
                    className={classes.nothing}
                    style={{
                        height: '100%',
                    }}>
                    Nothing ...
                </div>
            );
        }

        return list.songs.map((e, index) => {
            return (
                <li
                    key={index}
                    className={clazz({[classes.odd]: index % 2 === 0}, {[classes.active]: sameToPlaylist && e.id === song.id})} >

                    <span onClick={async ev => {
                        await this.props.play(e.id);
                    }} >
                        {
                            (sameToPlaylist && e.id === song.id)
                                ? <i className={playing ? 'ion-ios-pause' : 'ion-ios-play'} />
                                : <i className="ion-ios-play" />
                        }
                    </span>

                    <span className={classes.index}>
                        <span>{index + 1}</span>
                    </span>

                    <span
                        className={classes.name}
                        title={e.name}>
                        <span onClick={async ev => {
                            await this.props.play(e.id);
                        }}>
                            {e.name}
                        </span>
                    </span>

                    <span
                        className={classes.artist}
                        title={e.artists[0].name}>
                        {
                            (() => {
                                return e.artists.map((item, index) => {
                                    if (e.artists.length === 1) {
                                        return (
                                            <span key={index}>
                                                &nbsp;&nbsp;
                                                <Link
                                                    to={item.link}>
                                                    {item.name}
                                                </Link>
                                            </span>
                                        );
                                    }
                                    return (
                                        <span key={index}>
                                            &nbsp;&nbsp;
                                            <Link
                                                to={item.link}>
                                                {item.name}
                                            </Link>
                                            &nbsp;&nbsp;,
                                        </span>

                                    );
                                });
                            })()
                        }

                    </span>

                    <span
                        className={classes.album}
                        title={e.album.name}>
                        <Link
                            key={index}
                            to={e.album.link}>
                            {e.album.name}
                        </Link>
                    </span>
                </li>
            );
        });
    }

    render() {
        var { classes, loading, playing } = this.props;

        return (
            <div className={classes.container}>
                <Loader show={loading} />
                <Header
                    color={`#fff`} />

                <main>
                    <FadeImage
                        className={classes.background}
                        src="https://source.unsplash.com/random?music" />
                    <div
                        className={classes.topContent}>

                        <div className={classes.mask}>
                            {
                                <span className={classes.personDate}>{moment().date()}</span>
                            }
                        </div>

                        <div className={classes.titleWrap}>
                            <div className={classes.title}>
                                每日歌曲推荐
                            </div>
                            <div className={classes.description}>
                                根据你的口味生成，每天6:00更新！
                            </div>
                        </div>
                    </div>

                    <div className={classes.body}>
                        <span className={clazz(classes.button, classes.playButton)} onClick={() => this.props.play()}>
                            {
                                (this.props.canitoggle() && playing)
                                    ? <i className="ion-ios-pause" />
                                    : <i className="ion-android-arrow-dropright-circle" />
                            }
                            <span>播放全部</span>
                        </span>

                        <span className={clazz(classes.button, classes.collectButton)}><i className={'ion-medkit'} /><span>收藏全部</span></span>

                        <div className={classes.list}>
                            <ul ref="list">
                                {this.renderList()}
                            </ul>
                        </div>
                    </div>

                </main>

                <Controller />
            </div>
        );
    }
}

export default injectSheet(classes)(dailyPlayer);
