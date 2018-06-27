
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import injectSheet from 'react-jss';
import clazz from 'classname';

import classes from './classes';
import ProgressImage from 'ui/ProgressImage';

@inject(stores => ({
    hasLogin: stores.me.hasLogin,
    loading: stores.lyrics.loading,
    getLyrics: () => stores.lyrics.getLyrics(),
    lyrics: stores.lyrics.list,
    toggle: stores.controller.toggle,
    playing: stores.controller.playing,
    isLiked: stores.me.isLiked,
    like: stores.me.like,
    unlike: stores.me.unlike,
    getPlayerLink: () => {
        return stores.controller.playlist.link;
    },
    getPlaylistName: () => {
        return stores.controller.playlist.name;
    },
    // 使用FM的播放方法，更新controller的歌单
    play: stores.fm.play,
    isFMPlaying: () => {
        var { controller, fm } = stores;
        return controller.playlist.id === fm.playlist.id;
    },
    // 把FM当前歌曲移入垃圾桶
    ban: stores.fm.ban,
    // FM下一首
    next: stores.fm.next,
}))

@observer
class Lyrics extends Component {
    static propTypes = {
        isFM: PropTypes.bool,
        isScroll: PropTypes.bool,
    };

    static defaultProps = {
        isFM: false,
        isScroll: false,
    };

    componentWillMount() {
        var {isFM, isFMPlaying} = this.props;
        // 是FM页面且FM没有在播放 ，就触发播放，并更新controller的歌单，并加载歌词
        if (isFM && !isFMPlaying()) {
            this.props.play();
            this.props.getLyrics();
        } else {
            // 非FM页面提前获取歌词
            this.props.getLyrics();
        }
    }

    componentDidMount() {
        this.props.getLyrics();
    }

    componentWillReceiveProps(nextProps) {
        var {isFM} = this.props;
        if (isFM) {
            if (this.props.fmSong.id !== nextProps.fmSong.id) {
                this.props.getLyrics();
            }
        } else {
            if (this.props.controSong.id !== nextProps.controSong.id) {
                this.props.getLyrics();
            }
        };
    }

    scrollSection(e) {
        // console.log('歌词Section元素滚动了', e);
        // 阻止事件冒泡，第一种适用react自己的click事件，其他的事件比如这里的scroll用第二种react特有的
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    renderLyrics() {
        var { lyrics, classes } = this.props;
        // 取对象的键名
        var times = Object.keys(lyrics);

        if (times.length === 0) {
            return (
                <div className={classes.placeholder}>
                    <span>纯音乐/暂无歌词 ...</span>
                </div>
            );
        }

        return times.map((e, index) => {
            return (
                <p
                    data-times={e}
                    key={index}>
                    <span>
                        {lyrics[e]}
                    </span>
                </p>
            );
        });
    }

    render() {
        var { isFM, isScroll, classes, controSong, fmSong, toggle, playing, isLiked, like, unlike, hasLogin, getPlayerLink, getPlaylistName, ban, next } = this.props;
        var song, ProImgSize;
        // console.log('isScroll传入的值', isScroll);
        if (isFM) {
            song = fmSong;
            ProImgSize = 210;
        } else {
            song = controSong;
            ProImgSize = 220;
        }
        // console.log('歌词的isFM', isFM);
        var srcStr = song.album.cover.replace(/\?.*$/, '');
        var liked = isLiked(song.id);

        return (
            <div className={classes.topContent}>

                <img src={srcStr} width="100%" height="100%" className={classes.background} />

                <div className={classes.cover}>
                    <div className={clazz({ [classes.coverBorderFM]: isFM }, { [classes.coverBorder]: !isFM }, { [classes.animated]: playing })}>
                        <ProgressImage {...{
                            height: ProImgSize,
                            width: ProImgSize,
                            src: song.album.cover.replace(/100y100$/, '500y500'),
                        }} />
                    </div>
                    <div className={clazz({ [classes.buttonWrapFM]: isFM }, { [classes.buttonWrap]: !isFM })}>
                        <span >
                            {
                                isFM
                                    ? <span title={'播放/暂停'} className={classes.buttonFM} onClick={e => this.props.play()}>
                                        {
                                            playing
                                                ? <i className="ion-ios-pause" />
                                                : <i className="ion-ios-play" />
                                        }
                                    </span>
                                    : <span title={'播放/暂停'} className={classes.button} onClick={toggle}>
                                        {
                                            playing
                                                ? <i className="ion-ios-pause" />
                                                : <i className="ion-ios-play" />
                                        }
                                        <span>播放</span>
                                    </span>
                            }
                        </span>
                        {
                            hasLogin() && (
                                <span title={'喜欢'} className={clazz({ [classes.buttonFM]: isFM }, { [classes.button]: !isFM })}
                                    onClick={e => liked ? unlike(song) : like(song)}>
                                    {
                                        hasLogin() && (
                                            <i
                                                className={clazz('ion-ios-heart', {
                                                    [classes.liked]: liked,
                                                })}
                                            />
                                        )
                                    }
                                    {
                                        isFM
                                            ? ''
                                            : <span>喜欢</span>
                                    }
                                </span>
                            )
                        }
                        <span>
                            {
                                isFM
                                    ? <span title={'不喜欢'} className={classes.buttonFM} onClick={e => ban(song.id)}><i className="ion-trash-a" /></span>
                                    : <span title={'下载'} className={classes.button} ><i className="ion-archive" /><span>下载</span></span>
                            }
                        </span>
                        <span>
                            {
                                isFM
                                    ? <span title={'下一首'} className={classes.buttonFM} onClick={next}><i className="ion-chevron-right" /></span>
                                    : <span title={'分享'} className={classes.button} ><i className="icon ion-share" /><span>分享</span></span>
                            }
                        </span>
                    </div>
                </div>

                <aside
                    className={classes.lyrics}
                    id="lyrics">
                    <h3>{song.name}</h3>
                    <h5>
                        <spna className={classes.subtitle}>
                            专辑:&nbsp;&nbsp;
                            <Link
                                to={song.album.link}>
                                {song.album.name}
                            </Link>
                        </spna>
                        <span className={classes.subtitle}>
                            歌手:
                            {
                                song.artists.map((e, index) => {
                                    if (song.artists.length === 1) {
                                        return (
                                            <span key={index}>
                                                &nbsp;&nbsp;
                                                <Link
                                                    to={e.link}>
                                                    {e.name}
                                                </Link>
                                            </span>
                                        );
                                    }
                                    return (
                                        <span key={index}>
                                            &nbsp;&nbsp;
                                            <Link
                                                to={e.link}>
                                                {e.name}
                                            </Link>
                                            ,
                                        </span>

                                    );
                                })
                            }
                        </span>
                        <spna className={classes.subtitle}>
                            来源:&nbsp;&nbsp;
                            {
                                (() => {
                                    if (isFM) {
                                        return (
                                            <a>私人FM</a>
                                        );
                                    }
                                    return (
                                        <Link
                                            to={getPlayerLink()}>
                                            {getPlaylistName()}
                                        </Link>
                                    );
                                })()
                            }
                        </spna>
                    </h5>

                    <section
                        onScroll={e => {
                            this.scrollSection(e);
                        }}
                        className={clazz({ [classes.noScrollSection]: !isScroll, [classes.isScrollSection]: isScroll })}
                    >
                        <div
                            style={{
                                position: 'relative',
                                height: '100%',
                            }}
                        >
                            {
                                this.renderLyrics()
                            }
                        </div>
                    </section>
                </aside>
            </div>
        );
    }
}

export default injectSheet(classes)(Lyrics);
