
import React, { Component } from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import clazz from 'classname';
import delegate from 'delegate';
import injectSheet from 'react-jss';

import classes from './classes';
import helper from 'utils/helper';
import sine from 'utils/sine';
import ProgressImage from 'ui/ProgressImage';
import FadeImage from 'ui/FadeImage';
import Loader from 'ui/Loader';
import Header from 'components/Header';
import LeftMenu from 'components/LeftMenu';
import Controller from 'components/Controller';

@inject(stores => ({
    loading: stores.artist.loading,
    profile: stores.artist.profile,
    follow: stores.artist.follow,
    playlist: stores.artist.playlist,
    albums: stores.artist.albums,
    similar: stores.artist.similar,
    getArtist: stores.artist.getArtist,
    playing: stores.controller.playing,
    song: stores.controller.song,
    isPlaying(id) {
        var { controller, artist } = stores;
        var res = controller.playing
            && controller.playlist.id === artist.playlist.id;

        if (res && id) {
            res = res && controller.song.id === id;
        }

        return res;
    },
    async play(songid) {
        var { controller, artist } = stores;
        var sameToPlaying = this.sameToPlaying();

        if (sameToPlaying) {
            if (songid === void 0
                || (controller.song.id === songid)) {
                controller.toggle();
            } else {
                await controller.play(songid);
            }
        } else {
            // Play a new playlist
            controller.setup({
                id: artist.playlist.id,
                link: `/artist/${artist.profile.id}`,
                name: artist.playlist.name,
                songs: artist.playlist.songs,
            });
            await controller.play(songid);
        }
    },
    sameToPlaying() {
        var { controller, artist } = stores;

        return controller.playlist.id === artist.playlist.id;
    },

    highlightAlbum(id) {
        return stores.controller.playlist.id === id;
    },

    hasLogin: stores.me.hasLogin,
}))
@observer
class Artist extends Component {
    componentWillMount = () => this.props.getArtist(this.props.params.id);

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.id !== this.props.params.id) {
            nextProps.getArtist(nextProps.params.id);
        }
    }

    componentDidMount() {
        var classes = this.props.classes;
        var navs = Array.from(this.refs.header.querySelectorAll('nav'));

        delegate(this.refs.header, 'nav', 'click', e => {
            navs.map(e => e.classList.remove(classes.selected));
            e.target.classList.add(classes.selected);
        });

        sine.show(this.refs.canvas);
    }

    componentWillUnmount = () => sine.hide();

    componentDidUpdate() {
        var list = this.refs.list;

        if (list) {
            let playing = list.querySelector(`.${this.props.classes.playing}`);

            if (playing) {
                playing.scrollIntoViewIfNeeded();
            }
        }
    }

    state = {
        renderTabContent: this.renderSongs.bind(this),
    };

    renderSongs() {
        var { classes, playlist, sameToPlaying, song, isPlaying } = this.props;

        /* eslint-disable react/jsx-boolean-value */
        return (
            <div>
                <div style={{padding: '10px 0'}}>
                    <div className={classes.titleName}>
                        音乐标题
                    </div>
                    <div className={classes.titleAlbum}>
                        专辑
                    </div>
                    <div className={classes.titleTime}>
                        时长
                    </div>
                </div>
                <ul
                    className={classes.songs}
                    ref="list">
                    {
                        playlist.songs.map((e, index) => {
                            return (
                                <li
                                    className={clazz({
                                        [classes.playing]: sameToPlaying() && song.id === e.id,
                                    })}
                                    key={index}>
                                    <span onClick={async ev => {
                                        await this.props.play(e.id);
                                    }} >
                                        {
                                            isPlaying(e.id)
                                                ? <i className="ion-ios-pause" />
                                                : <i className="ion-ios-play" />
                                        }
                                    </span>

                                    <span data-index>
                                        {index + 1}
                                    </span>

                                    <span className={classes.songName}
                                        data-name
                                        title={e.name}>
                                        <span style={{display: 'inline-block'}} onClick={async ev => {
                                            await this.props.play(e.id);
                                        }}>
                                            {e.name}
                                        </span>
                                    </span>

                                    <span className={classes.albumName}
                                        data-album
                                        title={e.album.name}>
                                        <Link to={`/player/1/${e.album.id}`}>
                                            {e.album.name}
                                        </Link>
                                    </span>

                                    <span data-time>
                                        {helper.getTime(e.duration)}
                                    </span>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
        /* eslint-enable */
    }

    renderAlbums() {
        var { classes, albums } = this.props;
        // console.log(albums);
        /* eslint-disable react/jsx-boolean-value */
        return (
            <section className={classes.albums}>
                {
                    albums.map((e, index) => {
                        return (
                            <div
                                className={clazz(classes.album, {
                                    [classes.playing]: this.props.highlightAlbum(e.id),
                                })}
                                key={index}>
                                <Link to={e.link}>
                                    <ProgressImage {...{
                                        height: 48,
                                        width: 48,
                                        src: e.cover,
                                    }} />
                                </Link>
                                <div className={classes.info}>
                                    <p
                                        data-name
                                        title={e.name}>
                                        {e.name}
                                    </p>

                                    <p data-time>
                                        {moment(e.publishTime).format('YYYY-MM-DD')}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                }
            </section>
        );
        /* eslint-enable */
    }

    renderArtists() {
        var { classes, hasLogin, similar } = this.props;

        if (!hasLogin()) {
            return <section className={classes.nothing}>
                <Link to="/login/0">
                    该接口信息需要登陆才能获取哦~
                </Link>
            </section>;
        }

        return (
            <section className={classes.artists}>
                {
                    similar.map((e, index) => {
                        return (
                            <div
                                className={classes.artist}
                                key={index}>
                                <Link
                                    to={e.link}>
                                    <ProgressImage {...{
                                        height: 110,
                                        width: 110,
                                        src: e.avatar,
                                    }} />
                                    <span className={classes.artistName}>{e.name}</span>
                                </Link>
                            </div>
                        );
                    })
                }
            </section>
        );
    }

    render() {
        var { classes, loading, profile, isPlaying, follow } = this.props;
        var size = profile.size || {};
        var followed = profile.followed;

        return (
            <div className={classes.container}>
                <Loader show={loading} />

                <Header {...{
                    showBack: true,
                    showPlaylist: true,
                }} />

                <LeftMenu />

                <main>
                    <div className={classes.hero}>

                        <FadeImage
                            className={classes.background}
                            src={profile.background} />

                        <div className={classes.inner}>
                            <div
                                className={classes.play}
                                onClick={async e => {
                                    await this.props.play();
                                }}>
                                {
                                    isPlaying()
                                        ? <i className="ion-ios-pause" />
                                        : <i className="ion-ios-play" />
                                }
                            </div>

                            <canvas ref="canvas" />

                            <p className={classes.name}>
                                {
                                    profile.uid
                                        ? (
                                            <Link to={`/user/${profile.uid}`}>
                                                {profile.name}
                                            </Link>
                                        )
                                        : (
                                            <span>
                                                {profile.name}
                                            </span>
                                        )
                                }
                            </p>
                            <button
                                className={clazz(classes.follow, {
                                    [classes.followed]: followed,
                                })}
                                onClick={e => follow(followed)}>
                                { followed ? '已收藏' : '收藏' }
                            </button>
                        </div>
                    </div>

                    <div className={classes.body}>
                        <header ref="header">
                            <nav
                                onClick={e => this.setState({ renderTabContent: () => this.renderSongs() })}
                                className={classes.selected}>
                                热门50单曲/{size.song}首
                            </nav>

                            <nav onClick={e => this.setState({ renderTabContent: () => this.renderAlbums() })}>
                                专辑/{size.album}张
                            </nav>

                            <nav onClick={e => this.setState({ renderTabContent: () => this.renderArtists() })}>
                                相似歌手
                            </nav>
                            <nav >
                                MV/{size.mv}支
                            </nav>
                        </header>

                        <div className={classes.content}>
                            {this.state.renderTabContent()}
                        </div>
                    </div>
                </main>
                <Controller />
            </div>
        );
    }
}

export default injectSheet(classes)(Artist);
