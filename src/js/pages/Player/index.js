
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import injectSheet from 'react-jss';
import clazz from 'classname';

import classes from './classes';
import Search from './Search';
import helper from 'utils/helper';
import Loader from 'ui/Loader';
import FadeImage from 'ui/FadeImage';
import ProgressImage from 'ui/ProgressImage';
import Header from 'components/Header';
import Controller from 'components/Controller';
import LeftMenu from 'components/LeftMenu';

@inject(stores => ({
    loading: stores.player.loading,
    showLoading: () => stores.player.toggleLoading(true),
    hideLoading: () => setTimeout(() => stores.player.toggleLoading(false), 500),
    searching: stores.player.searching,
    keywords: stores.player.keywords,
    showSearch: () => stores.player.toggleSearch(true),
    hideSearch: () => stores.player.toggleSearch(false),
    meta: stores.player.meta,
    getList: async args => {
        var { id, type } = args;
        await stores.player.getDetail(type, id);
    },
    list: stores.player.songs,
    filter: stores.player.filter,
    filtered: stores.player.filtered,
    artists: stores.player.artists,
    users: stores.player.users,
    song: stores.controller.song,
    playing: stores.controller.playing,
    toggle: stores.controller.toggle,
    // 是否能播放暂停，toggle
    canitoggle: () => stores.controller.playlist.id === stores.player.meta.id,
    play: async(songid) => {
        var { controller, player } = stores;
        var meta = player.meta;
        var sameToPlaying = controller.playlist.id === player.meta.id;
        // 播放全部，没有传入歌曲id
        if (!songid) {
            // 已经加载歌单
            if (sameToPlaying) {
                controller.toggle();
            } else {
                // 加载歌单，并播放第一首
                controller.setup({
                    id: meta.id,
                    link: `/player/${meta.type}/${meta.id}`,
                    name: meta.name,
                    songs: player.songs,
                });
                await controller.play();
            }
            return;
        }
        // controller已经加载了歌单时，直接传入歌曲id
        if (sameToPlaying) {
            // Song is playing
            if (songid === controller.song.id) {
                controller.toggle();
                return;
            }
            await controller.play(songid);
            return;
        }
        // 第一次进入歌单页面，加载歌单，播放选中的歌曲
        controller.setup({
            id: meta.id,
            link: `/player/${meta.type}/${meta.id}`,
            name: meta.name,
            songs: player.songs,
        });
        await controller.play(songid);
    },

    hasLogin: stores.me.hasLogin,
    subscribed: stores.player.meta.subscribed,
    subscribe: stores.player.subscribe,
}))

@observer
class Player extends Component {
    static propTypes = {
        showFav: PropTypes.bool,
    };

    static defaultProps = {
        showFav: true,
    };
    async load(props) {
        var { showLoading, hideLoading, getList, params } = props;

        showLoading();
        await getList(params);
        hideLoading();
    }

    componentWillMount = () => this.load(this.props);

    componentWillReceiveProps(nextProps) {
        // 传入歌单信息
        if (nextProps.params.id !== this.props.params.id) {
            this.load(nextProps);
        }
    }

    // 列表滚动
    componentDidUpdate() {
        var { classes, searching } = this.props;
        var playing = (searching ? this.refs.searching : this.refs.list).querySelector(`.${classes.active}`);

        if (playing) {
            playing.scrollIntoViewIfNeeded();
        }
    }

    // 渲染“最近收听”和“相似歌手”，这里不需要
    renderPeople() {
        var { classes, hasLogin, users, artists } = this.props;
        // users有最近收听的时间么？
        var content = [];
        // 未登录
        if (!hasLogin()) {
            return (
                <div className={classes.nothing}>Nothing ...</div>
            );
        }

        if (users.length) {
            content.push(
                <div
                    className={classes.users}
                    key="users">
                    <h3>最近听过的用户</h3>
                    {
                        users.map((e, index) => {
                            return (
                                <Link
                                    className="clearfix tooltip"
                                    data-text={e.name}
                                    key={index}
                                    to={e.link}>
                                    <FadeImage
                                        src={e.avatar}
                                        title={e.name} />
                                </Link>
                            );
                        })
                    }
                </div>
            );
        }

        content.push(
            <div
                className={classes.artists}
                key="artists">
                <h3>相似的歌手</h3>
                {
                    artists.slice(0, content.length ? 5 : 10).map(
                        (e, index) => {
                            return (
                                <Link
                                    className="clearfix tooltip"
                                    data-text={e.name}
                                    key={index}
                                    to={e.link}>
                                    <FadeImage
                                        src={e.avatar}
                                        title={e.name} />
                                </Link>
                            );
                        }
                    )
                }
            </div>
        );

        return content;
    }

    // 点击收藏歌单
    renderFav() {
        var { hasLogin, showFav, subscribed } = this.props;
        if (!showFav
            || !hasLogin()) {
            return false;
        }

        if (subscribed) {
            return (
                <i className={clazz('ion-ios-star', this.props.classes.subscribed)} />
            );
        }

        return (
            <i className="ion-ios-star-outline" />
        );
    }

    renderList() {
        var { classes, playing, canitoggle, song, searching, keywords, list, filtered } = this.props;
        var sameToPlaylist = canitoggle();

        list = (searching && keywords) ? filtered : list;

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

        return list.map((e, index) => {
            // if (index !== 0) {
            //     return false;
            // }
            return (
                <li
                    key={index}
                    className={clazz({
                        [classes.active]: sameToPlaylist && e.id === song.id,
                    })} >

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

                    <span className={classes.time}>
                        <span>{helper.getTime(e.duration)}</span>
                    </span>
                </li>
            );
        });
    }

    render() {
        var { classes, loading, meta, playing, searching, showSearch, hideSearch, filter, subscribe, subscribed, hasLogin } = this.props;
        // console.log('meta', meta.author[0].avatarUrl);

        return (
            <div className={classes.container}>
                <Loader show={loading} />
                <Header
                    color={`#fff`} />

                <LeftMenu key={1 * subscribed} />

                <main>
                    <div
                        className={classes.topContent}
                        style={{
                            background: '#fff',
                        }}>
                        <ProgressImage {...{
                            height: 180,
                            width: 180,
                            src: meta.cover,
                        }} />

                        <aside className={classes.info}>
                            <div className={classes.text}>
                                <p className={classes.title}>
                                    <span className={classes.titletag}>
                                        歌单
                                    </span>
                                    <span className={classes.titleContent}>
                                        {meta.name}
                                    </span>
                                </p>

                                <p className={classes.author}>
                                    {/* <Link to={meta.author[0].link}>
                                        <FadeImage src={meta.author[0].avatarUrl} />
                                    </Link> */}
                                    <span >
                                        {
                                            meta.author.map((e, index) => {
                                                return (
                                                    <Link
                                                        key={index}
                                                        to={e.link}>
                                                        {e.name}
                                                    </Link>
                                                );
                                            })
                                        }
                                    </span>
                                    <span style={{fontSize: 12}}>&nbsp;&nbsp;创建</span>
                                </p>

                                <p
                                    className={classes.subtitle}>
                                    <span style={{marginRight: 16}}>
                                        歌曲数<span style={{fontWeight: 'bold'}}>{meta.size}</span>
                                    </span>
                                    <span className={classes.subtitlecut}>
                                        /
                                    </span>
                                    <span>
                                        收听数<span style={{fontWeight: 'bold'}}>{helper.humanNumber(meta.played)}</span>
                                    </span>
                                </p>
                                <div>
                                    <span className={classes.button} onClick={() => this.props.play()}>
                                        {
                                            (this.props.canitoggle() && playing)
                                                ? <i className="ion-ios-pause" />
                                                : <i className="ion-ios-play" />
                                        }
                                        <span>播放全部</span>
                                    </span>
                                    {
                                        (() => {
                                            if (!hasLogin()) {
                                                return false;
                                            } else {
                                                return (
                                                    <span className={classes.button} onClick={e => { subscribed ? subscribe(false) : subscribe(true); }}>
                                                        {
                                                            this.renderFav()
                                                        }
                                                        {
                                                            (meta.subscribed)
                                                                ? <span>已收藏</span>
                                                                : <span>收藏</span>
                                                        }
                                                    </span>
                                                );
                                            }
                                        })()
                                    }
                                    <span className={classes.button}><i className={'icon ion-share'} /><span>分享</span></span>
                                    <span className={classes.button}><i className={'icon ion-archive'} /><span>下载全部</span></span>
                                </div>

                            </div>
                        </aside>

                    </div>

                    <div className={classes.body}>

                        <div className={classes.list}>
                            <header>
                                <div className={classes.listTag0}>
                                    歌曲列表
                                </div>
                                <div className={classes.listTag1}>
                                    评论
                                </div>
                                <div className={classes.listTag2}>
                                    收藏着
                                </div>
                                <div onClick={showSearch} className={classes.listSearch}>
                                &nbsp;&nbsp;&nbsp;🔍 &nbsp;&nbsp;搜索歌单音乐
                                </div>
                            </header>
                            <div style={{borderBottom: '1px solid #ddd'}}>
                                <div className={classes.titleName}>
                                    音乐标题
                                </div>
                                <div className={classes.titleArtist}>
                                    歌手
                                </div>
                                <div className={classes.titleAlbum}>
                                    专辑
                                </div>
                                <div className={classes.titleTime}>
                                    时长
                                </div>
                            </div>
                            <ul ref="list">
                                {this.renderList()}
                            </ul>
                        </div>

                        <Search {...{
                            filter,
                            show: searching,
                            close: () => {
                                hideSearch();
                                filter();
                            },
                        }}>
                            <div className={classes.list}>
                                <ul ref="searching">
                                    {this.renderList()}
                                </ul>
                            </div>
                        </Search>
                    </div>

                </main>

                <Controller />
            </div>
        );
    }
}

export default injectSheet(classes)(Player);
