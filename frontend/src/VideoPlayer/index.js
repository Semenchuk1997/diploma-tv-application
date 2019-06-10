import React, { Component } from 'react';
import { Player, PosterImage } from 'video-react';

import 'video-react/dist/video-react.css';
import './index.css';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const videoReactElement = document.getElementsByClassName('video-react')[0];
        videoReactElement.removeAttribute('style');
    }

    render() {
        return (
            <div>
                <Player
                    autoPlay={true}
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                />
            </div >
        );
    }
};

export default VideoPlayer;