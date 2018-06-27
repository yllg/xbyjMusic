
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import clazz from 'classname';
import moment from 'moment';
import injectSheet from 'react-jss';

import classes from './classes';
import ProgressImage from 'ui/ProgressImage';

@inject(stores => ({
    close: () => stores.comments.toggle(false),
    loading: stores.comments.loading,
    hotList: stores.comments.hotList,
    newestList: stores.comments.newestList,
    thumbsup: stores.comments.like,
    getList: () => stores.comments.getList(Object.assign({}, stores.controller.song)),
    loadmore: stores.comments.loadmore,
    song: stores.comments.song,
    comments: stores.comments.total,
}))
@observer
class Comments extends Component {
    static propTypes = {
        isFM: PropTypes.bool,
    };

    static defaultProps = {
        isFM: false,
    };
    componentWillMount() {
        this.props.getList();
    }

    renderNestest(list) {
        var { classes } = this.props;

        if (!list.length) {
            return false;
        }

        return (
            <ul className={classes.nestest}>
                {
                    list.map((e, index) => {
                        return (
                            <li key={index}>
                                <Link
                                    to={`/user/${e.user.userId}`}>
                                    {e.user.nickname}
                                </Link>
                                ：

                                <span>
                                    {e.content}
                                </span>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }

    renderComment(key, item) {
        var { classes, thumbsup } = this.props;

        return (
            <div
                className={classes.comment}
                key={key}>
                <Link
                    to={`/user/${item.user.userId}`}>
                    <ProgressImage {...{
                        height: 35,
                        width: 35,
                        src: item.user.avatarUrl,
                    }} />
                </Link>

                <aside>
                    <Link to={`/user/${item.user.userId}`}>{item.user.nickname}</Link>
                     :
                    <span>{item.content}</span>

                    <div className={classes.meta}>
                        {/* {moment(item.time).endOf('day').fromNow()} */}
                        {moment(item.time).format('YYYY-MM-DD HH:mm:ss')}
                        <span
                            className={clazz(classes.thumbsup, {
                                [classes.liked]: item.liked,
                            })}
                            onClick={ev => thumbsup(item.commentId, !item.liked)}>
                            <i className="ion-thumbsup" />
                            ({item.likedCount})&nbsp;&nbsp;|&nbsp;&nbsp;回复
                        </span>
                    </div>
                    {
                        this.renderNestest(item.beReplied)
                    }
                </aside>
            </div>
        );
    }

    renderHotList() {
        return this.props.hotList.map((e, index) => {
            if (index > 9) {
                return false;
            }
            return this.renderComment(index, e);
        });
    }

    renderNewestList() {
        return this.props.newestList.map((e, index) => {
            return this.renderComment(index, e);
        });
    }

    async loadmore(e) {
        var container = this.refs.list;

        // Drop the duplicate invoke
        if (container.classList.contains(classes.loadmore)) {
            return;
        }

        if (container.scrollTop + container.offsetHeight + 100 > container.scrollHeight) {
            // Mark as loading
            container.classList.add(classes.loadmore);

            await this.props.loadmore();
            container.classList.remove(classes.loadmore);
        }
    }

    render() {
        var { classes, comments, isFM } = this.props;
        // console.log('评论isFM', isFM);
        return (
            <aside
                className={clazz({ [classes.listFM]: isFM }, { [classes.list]: !isFM })}
                onScroll={e => this.loadmore()}
                ref="list">
                <div className={classes.scroller}>
                    <div className={classes.hotList}>
                        <div className={classes.songTitleWrap}>
                            <span className={classes.songTitle}>听友评论</span>
                            <span>（已有 {comments} 条评论）</span>
                        </div>
                        <h3>精彩评论</h3>
                        {this.renderHotList()}
                    </div>

                    <div className={classes.newestList}>
                        <h3>最新评论({comments})</h3>
                        {this.renderNewestList()}
                    </div>
                </div>
            </aside>
        );
    }
}

export default injectSheet(classes)(Comments);
