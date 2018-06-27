
import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import clazz from 'classname';

import classes from './classes';

/**
 * FROM NGA:
 * http://bbs.ngacn.cc/read.php?tid=7803294&forder_by=postdatedesc&_ff=7
 * */
const randomText = [
    '当你觉得孤独无助时，想一想还有十几亿的细胞只为了你一个人而活',
    '人要是矫情起来，听什么都像是听自己',
    '每个人的裂痕，最后都会变成故事的花纹 ',
    '你那么孤独，却说一个人真好',
    '我在最没有能力的年纪，碰见了最想照顾一生的人',
    '世界如此广阔，人类却走进了悲伤的墙角',
    '喜欢这种东西，捂住嘴巴，也会从眼睛里跑出来',
    '我听过一万首歌，看过一千部电影，读过一百本书，却从未俘获一个人的心',
    '最怕一生碌碌无为，还说平凡难能可贵 ',
    '年轻时我想变成任何人，除了我自己 ',
    '别人稍一注意你，你就敞开心扉，你觉得这是坦率，其实这是孤独……',
    '我已经过了餐桌上有只鸡就一定能吃到鸡腿的年纪了',
    '不在一起就不在一起吧，反正一辈子也没多长',
    '你别皱眉，我走就好',
    '那年上初中，夏天是好漫长的，西瓜是吃不完的，作业是最后两天才赶的',
    '小时候总是骗爸妈自己没钱了，现在骗他们自己还有钱',
    '你那么擅长安慰他人，一定度过了很多自己安慰自己的日子吧',
    '余生好长，你好难忘',
    '我从未拥有过你一秒钟，心里却失去过你千万次',
    '你是来和我告别的吗。那就隆重一点，等我眼里装满泪水',
    '机场比婚礼的殿堂见证了更多真诚的吻，医院的墙比教堂听到了更多的祈祷',
    '祝你们幸福是假的，祝你幸福是真的 ',
    '懒得重新认识一个人 再问名字 再问年龄 再聊天 再了解对方 再磨合 一想就烦',
    '不要太早为一个人倾尽全部，因为你太年轻了',
];

class Loader extends Component {
    static propTypes = {
        show: PropTypes.bool,
        text: PropTypes.string,
    };

    static defaultProps = {
        show: false,
    };

    shouldComponentUpdate(nextProps) {
        if (nextProps.show === this.props.show) {
            return false;
        }

        return true;
    }

    render() {
        var classes = this.props.classes;
        var text = this.props.text || randomText[Math.floor(Math.random() * randomText.length)];

        return (
            <div
                className={clazz(classes.container, {
                    [classes.show]: this.props.show,
                })}>
                <span>{text}</span>
            </div>
        );
    }
}

export default injectSheet(classes)(Loader);
