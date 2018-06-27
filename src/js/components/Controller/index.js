
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import injectSheet from 'react-jss';
import clazz from 'classname';

import classes from './classes';
import ProgressImage from 'ui/ProgressImage';
import { PLAYER_LOOP, PLAYER_SHUFFLE, PLAYER_REPEAT } from 'stores/controller';

@inject(stores => ({
    song: stores.controller.song,
    mode: stores.controller.mode,
    next: stores.controller.next,
    prev: stores.controller.prev,
    toggle: stores.controller.toggle,
    playing: stores.controller.playing,
    changeMode: stores.controller.changeMode,
    isLiked: stores.me.isLiked,
    like: stores.me.like,
    unlike: stores.me.unlike,
    playlist: stores.controller.playlist,
    getPlayerLink: () => {
        return stores.controller.playlist.link;
    },
    getPlaylistName: () => {
        return ` ${stores.controller.playlist.name}`;
    },
    hasLogin: stores.me.hasLogin,
    showPlaying: () => stores.playing.toggle(true),
}))
@observer
class Controller extends Component {
    static propTypes = {
        showPlaylist: PropTypes.bool,
        color: PropTypes.string,
    };

    static defaultProps = {
        showPlaylist: true,
        color: '#000',
    };

    seek(e) {
        var percent = e.clientX / window.innerWidth;
        var time = this.props.song.duration * percent;

        document.querySelector('audio').currentTime = time / 1000;
    }

    // 点击图标 显示当前播放列表
    renderPlaylist() {
        var { showPlaylist, showPlaying, color, playlist, classes } = this.props;
        // console.log(playlist.songs.length);
        if (showPlaylist) {
            return (
                <span style={{position: 'relative', cursor: 'pointer'}} title="播放列表" onClick={() => showPlaying()}>
                    <i className="ion-stats-bars"
                        style={{color, marginRight: 35}} />
                    <span className={classes.currentSongsNum}>{playlist.songs.length}</span>
                </span>
            );
        }

        return false;
    }

    render() {
        var {classes, song, mode, prev, next, toggle, hasLogin, isLiked, like, unlike, playing, getPlaylistName,
        } = this.props;
        var liked = isLiked(song.id);

        if (!song.id) {
            return false;
        }

        return (
            <div className={classes.container}>
                <div
                    className={classes.bar}
                    id="progress"
                    onClick={e => this.seek(e)}>
                    <div className={clazz('playingtip', { [classes.playing]: true })}>
                        <span className={classes.pig}>🐷</span>
                    </div>
                    <div className={classes.buffering} />
                </div>

                <section>
                    {/* Click the cover show the player screen */}
                    <Link
                        className="tooltip"
                        data-text={getPlaylistName()}
                        to="/song">
                        <ProgressImage {...{
                            height: 64,
                            width: 64,
                            src: song.album.cover,
                        }} />
                    </Link>

                    <aside>
                        <div className={classes.info}>
                            <p
                                className={classes.title}
                                title={song.name}>
                                {/* Click the song name show the album screen */}
                                <Link to="/song">
                                    {song.name}
                                </Link>
                            </p>

                            <p className={classes.author}>
                                {
                                    song.artists.map((e, index) => {
                                        // Show the artist
                                        return (
                                            <Link
                                                key={index}
                                                title={e.name}
                                                to={e.link}>
                                                {e.name}
                                            </Link>
                                        );
                                    })
                                }
                            </p>
                        </div>

                        <div className={classes.action}>
                            {
                                (song.data && song.data.isFlac) && (
                                    <span
                                        className={classes.highquality}
                                        title="High Quality Music">
                                        SQ
                                    </span>
                                )
                            }

                            {
                                hasLogin() && (
                                    <i
                                        className={clazz('ion-ios-heart', {
                                            [classes.liked]: liked,
                                        })}
                                        title="喜欢"
                                        onClick={e => liked ? unlike(song) : like(song)} />
                                )
                            }

                            <i
                                className={clazz({
                                    'ion-ios-shuffle-strong': mode === PLAYER_SHUFFLE,
                                    'ion-loop': mode === PLAYER_REPEAT,
                                    'ion-refresh': mode === PLAYER_LOOP,
                                })}
                                title="播放模式"
                                onClick={this.props.changeMode} />

                            <div className={classes.controls}>
                                <i
                                    className="ion-ios-rewind"
                                    title="上一首"
                                    onClick={prev} />

                                <span
                                    className={classes.toggle}
                                    onClick={toggle}>
                                    {
                                        playing
                                            ? <i className="ion-ios-pause" />
                                            : <i
                                                className="ion-ios-play"
                                                title="播放/暂停"
                                                style={{
                                                    color: 'inherit'
                                                }} />
                                    }
                                </span>

                                <i
                                    className="ion-ios-fastforward"
                                    onClick={next}
                                    title="下一首"
                                    style={{
                                        marginRight: 0,
                                    }} />
                            </div>

                            {
                                this.renderPlaylist()
                            }
                        </div>
                    </aside>
                </section>
            </div>
        );
    }
}

export default injectSheet(classes)(Controller);
