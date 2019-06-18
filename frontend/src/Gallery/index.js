import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import S3FileUpload from 'react-s3';
import BounceLoader from 'react-spinners/BounceLoader';
import { css } from '@emotion/core';

import VideoPlayer from '../VideoPlayer';

// import { URL } from '../global';
import './index.css';

const config = {
    bucketName: 'videoondemand-source-1kujxj8xrfj43',
    region: 'us-east-1',
    accessKeyId: 'AKIAIZTAUW7CLXVSZVBA',
    secretAccessKey: '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',
}

const mockItems = [
    {
        original: 'https://d2j2q9sapwwtui.cloudfront.net/f14c296a-42dd-4fe6-9c3d-851bb43fa216/mp4/Waterfall - 6998_Mp4_Avc_Aac_16x9_1280x720p_24Hz_4.5Mbps_qvbr.mp4',
        thumbnail: 'https://d2j2q9sapwwtui.cloudfront.net/f14c296a-42dd-4fe6-9c3d-851bb43fa216/thumbnails/Waterfall - 6998_tumb.0000001.jpg'
    },
    {
        original: 'https://d2j2q9sapwwtui.cloudfront.net/f34c2bb9-9258-4dc9-aa1c-9354933687df/mp4/CNC - Le lien - TV Commercial_Mp4_Avc_Aac_16x9_1280x720p_24Hz_4.5Mbps_qvbr.mp4',
        thumbnail: 'https://d2j2q9sapwwtui.cloudfront.net/f34c2bb9-9258-4dc9-aa1c-9354933687df/thumbnails/CNC - Le lien - TV Commercial_tumb.0000002.jpg'
    },
    {
        original: 'https://d2j2q9sapwwtui.cloudfront.net/2aa8b548-eb73-443d-9719-702ac7301ae0/mp4/13176 13th Avenue, South Surrey - Offered at $5,380,000_Mp4_Avc_Aac_16x9_1280x720p_24Hz_4.5Mbps_qvbr.mp4',
        thumbnail: 'https://d2j2q9sapwwtui.cloudfront.net/2aa8b548-eb73-443d-9719-702ac7301ae0/thumbnails/13176 13th Avenue, South Surrey - Offered at $5,380,000_tumb.0000029.jpg'
    }
];

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

        this.onGetData(mockItems);

        setTimeout(() => {
            this.workSimulation();
        }, 7000);
    }

    workSimulation(){
        const { original } = this.state.data[0];

        this.setState({ videoSrc: original, isShowPlayer: true });
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
                {/* <input
                    type="file"
                    className="file-input"
                    onChange={this.upload}
                /> */}
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