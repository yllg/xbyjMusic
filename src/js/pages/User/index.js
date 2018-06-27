
import React, { Component } from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import injectSheet from 'react-jss';
import clazz from 'classname';

import classes from './classes';
import helper from 'utils/helper';
import ProgressImage from 'ui/ProgressImage';
import Loader from 'ui/Loader';
import Header from 'components/Header';
import LeftMenu from 'components/LeftMenu';
import Controller from 'components/Controller';

@inject(stores => ({
    loading: stores.user.loading,
    getUser: stores.user.getUser,
    profile: stores.user.profile,
    playlists: stores.user.playlists,
    follow: stores.user.follow,
    isme: () => stores.user.profile.id === stores.me.profile.userId.toString(),
    isPlaying: (id) => {
        var controller = stores.controller;

        return controller.playing
            && controller.playlist.id === id;
    },
    naturalScroll: stores.preferences.naturalScroll,
}))
@observer
class User extends Component {
    componentWillMount = () => this.props.getUser(this.props.params.id);

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.id !== this.props.params.id) {
            nextProps.getUser(nextProps.params.id);
        }
    }

    // 渲染“我创建的歌单”
    renderMyPlaylist() {
        var { classes, playlists, profile } = this.props;
        return (
            <div style={{paddingBottom: '40px'}}>
                <div className={classes.hotplaylistTitle}>
                    <span style={{marginRight: '10px', paddingBottom: '5px', borderBottom: '4px solid #ddd'}}>创建的歌单</span>
                </div>
                {
                    playlists.map((e, index) => {
                        // 只留下我创建的歌单,注意都转成数字型才能正确比较哦，eslint需要全等比较
                        if ((e.creator * 1) !== (profile.id * 1)) {
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
                    })
                }
            </div>
        );
    }

    // 渲染“我收藏的歌单”
    renderCollectPlaylist() {
        var { classes, playlists, profile } = this.props;
        return (
            <div style={{paddingBottom: '40px'}}>
                <div className={classes.hotplaylistTitle}>
                    <span style={{marginRight: '10px', paddingBottom: '5px', borderBottom: '4px solid #ddd'}}>收藏的歌单</span>
                </div>
                {
                    playlists.map((e, index) => {
                        // 只留下我创建的歌单,注意都转成数字型才能正确比较哦，eslint需要全等比较
                        if ((e.creator * 1) === (profile.id * 1)) {
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
                    })
                }
            </div>
        );
    }

    renderItem(item, index) {
        var { classes } = this.props;
        return (
            <Link
                to={item.link}
                className={clazz('clearfix', classes.itemWrap)}>
                <img src={item.cover} />

                <div className={classes.info}>
                    <span className={classes.hotsubtitle} >
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
                    <div className={classes.hottitle} >
                        {item.name}
                    </div>
                </div>
            </Link>
        );
    }

    render() {
        var { classes, loading, profile } = this.props;
        // console.log(profile);
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
                        <ProgressImage {...{
                            height: 180,
                            width: 180,
                            src: profile.avatar,
                        }} />

                        <div className={classes.personInfo}>
                            <p className={classes.username}>
                                <span>
                                    {profile.name} &nbsp;
                                    {
                                        (() => {
                                            if (profile.gender === 1) {
                                                return <i className="ion-male" style={{color: '#55b4e9', fontSize: 22}} />;
                                            } else if (profile.gender === 2) {
                                                return <i className="ion-female" style={{color: '#f4b4d1', fontSize: 25}} />;
                                            }
                                            return false;
                                        })()
                                    }
                                </span>
                            </p>
                            <div className={classes.infoItemWrap} >
                                <span className={classes.infoItem} style={{borderRight: '1px solid #eee'}}>
                                    <span className={classes.itemNumber}>{profile.eventCount}</span>
                                    动态
                                </span>
                                <span className={classes.infoItem} style={{borderRight: '1px solid #eee'}}>
                                    <span className={classes.itemNumber}>{profile.follows}</span>
                                    关注
                                </span>
                                <span className={classes.infoItem}>
                                    <span className={classes.itemNumber}>{helper.formatNumber(profile.followers)}</span>
                                    粉丝
                                </span>
                            </div>

                            {/* <p className={classes.followed}>是否关注{profile.followed}</p> */}
                            <p className={classes.introduce}>
                                个人介绍: &nbsp;<span style={{fontSize: 12, color: '#666'}}>{profile.signature || '该用户很高冷，暂无自我介绍~'}</span>
                            </p>
                            <p>所在地区: &nbsp;<span style={{fontSize: 12, color: '#666'}}>保密🤐</span></p>
                            <p>年龄：&nbsp;<span style={{fontSize: 12, color: '#666'}}>保密🤐</span></p>
                        </div>
                    </div>

                    <div className={classes.list}>
                        {
                            this.renderMyPlaylist()
                        }
                        {
                            this.renderCollectPlaylist()
                        }
                    </div>
                </main>
                <Controller />
            </div>
        );
    }
}

export default injectSheet(classes)(User);
