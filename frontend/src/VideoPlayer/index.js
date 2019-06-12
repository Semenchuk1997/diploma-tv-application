import React, { Component } from 'react';
import { Player } from 'video-react';

import 'video-react/dist/video-react.css';
import './index.css';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);

        this.handleBackSpace = this.handleBackSpace.bind(this);
    }

    handleBackSpace(e) {
        const { onBackSpacePressed } = this.props;

        if (e.key === 'Backspace') {
            onBackSpacePressed();
        }
    }

    componentDidMount() {
        const videoReactElement = document.getElementsByClassName('video-react')[0];
        videoReactElement.removeAttribute('style');

        document.addEventListener('keydown', this.handleBackSpace, false);
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.handleBackSpace, false);
    }

    render() {
        const { videoSrc } = this.props;
        return (
            <Player
                autoPlay={true}
                src={videoSrc}
            />
        );
    }
};

export default VideoPlayer;