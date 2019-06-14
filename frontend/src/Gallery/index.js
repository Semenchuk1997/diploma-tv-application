import React, { Component } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import S3FileUpload from 'react-s3';
import BounceLoader from 'react-spinners/BounceLoader';
import { css } from '@emotion/core';

import VideoPlayer from '../VideoPlayer';

import { URL } from '../global';
import './index.css';

const config = {
    bucketName: 'videoondemand-source-1kujxj8xrfj43',
    region: 'us-east-1',
    accessKeyId: 'AKIAIZTAUW7CLXVSZVBA',
    secretAccessKey: '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',
}

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
        this.showVideoPlayer = this.showVideoPlayer.bind(this);
        this.upload = this.upload.bind(this);
    }

    togglePlayerShow() {
        const { isShowPlayer } = this.state;

        this.setState({ isShowPlayer: !isShowPlayer });
    }

    onGetData(data) {
        setTimeout(() => {
            this.setState({ data, isLoading: false });
        }, 1000)
    };

    getItems(data) {
        return data.map(item => {
            const { thumbnail } = item;
            return {
                original: thumbnail,
                thumbnail: thumbnail
            }
        });
    };

    upload(e) {
        const file = e.target.files[0];

        this.setState({ isLoading: true });

        S3FileUpload.uploadFile(file, config)
            .then(data => { 
                this.setState({ isLoading: false });
                alert('File sent')
            })
            .catch(err => {
                alert('Something went wrong :(')
                this.setState({ isLoading: false })
            })
    } 

    showVideoPlayer(e) {
        const target = e.target;
        const thumbnail = target.getAttribute('src');
        const { original } = this.state.data.find(item => item.thumbnail === thumbnail);

        this.setState({ videoSrc: original, isShowPlayer: true });
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
        const items = this.getItems(data);
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
            <div>
                <ImageGallery
                    items={items}
                    onClick={this.showVideoPlayer}
                />
                <input
                    type="file"
                    className="file-input"
                    onChange={this.upload}
                />
            </div>

        return (
            <div>
                <BounceLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={isLoading}
                />
                
                {!isLoading && content}
            </div>
        )
    }
}

export default Gallery;