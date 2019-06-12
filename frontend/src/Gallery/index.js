import React, { Component } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';
import axios from 'axios';
import BounceLoader from 'react-spinners/BounceLoader';
import { css } from '@emotion/core';

import VideoPlayer from '../VideoPlayer';

import { URL } from '../global';
import './index.css';
import 'video-react/dist/video-react.css';

class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isShowPlayer: false,
            isLoading: true,
            videoSrc: ''
        }

        this.togglePlayerShow = this.togglePlayerShow.bind(this);
        this.onGetData = this.onGetData.bind(this);
        this.openVideoPlayer = this.openVideoPlayer.bind(this);
    }

    togglePlayerShow() {
        const { isShowPlayer } = this.state;

        this.setState({ isShowPlayer: !isShowPlayer });
    }

    openVideoPlayer() {
        const { data } = this.state;
        const activeThumbnail = document.querySelector('.photo.media-image').getAttribute('src');
        const videoData = data.find(item => item.thumbnailUrl === activeThumbnail);
        const videoSrc = videoData.mp4Url;

        this.setState({ videoSrc, isShowPlayer: true });
    }

    onGetData(data) {
        setTimeout(() => {
            this.setState({ data, isLoading: false });
        }, 1000)
    };

    getPhotos(data) {
        return data.map(item => {
            const { thumbnailUrl } = item;
            return {
                photo: thumbnailUrl,
                thumbnail: thumbnailUrl
            }
        });
    }

    componentDidMount() {
        const { data, isShowPlayer } = this.state;

        if (isShowPlayer) {
            const videoReactElement = document.querySelector('.video-react');
            videoReactElement.removeAttribute('style');

            document.addEventListener('keyDown', this.handleBackSpace, false);
        }

        if (!data.length) {
            axios.get(URL)
            .then(response => {
                this.onGetData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    render() {
        const { data, isShowPlayer, isLoading, videoSrc } = this.state;
        const photos = this.getPhotos(data);
        const override = css`
            display: block;
            margin: 20% auto;
            border-color: red;
        `;

        const content = isShowPlayer ? 
            <VideoPlayer
                videoSrc={videoSrc}
                onBackSpacePressed={this.togglePlayerShow}
            /> :
            <ReactBnbGallery
                show={true}
                photos={photos}
                activePhotoPressed={this.openVideoPlayer}
            />

        return (
            <div>
                <BounceLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={this.state.isLoading}
                />
                
                {!isLoading && content}
            </div>
        )
    }
}

export default Gallery;