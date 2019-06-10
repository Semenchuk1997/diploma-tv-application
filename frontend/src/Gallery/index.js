import React, { Component } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';

import './index.css';

const photos = [{
  photo: "https://source.unsplash.com/aZjw7xI3QAA/1144x763",
  caption: "Viñales, Pinar del Río, Cuba",
  subcaption: "Photo by Simon Matzinger on Unsplash",
  thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
}, {
  photo: "https://source.unsplash.com/c77MgFOt7e0/1144x763",
  caption: "La Habana, Cuba",
  subcaption: "Photo by Gerardo Sanchez on Unsplash",
  thumbnail: "https://source.unsplash.com/c77MgFOt7e0/100x67",
}, {
  photo: "https://source.unsplash.com/QdBHnkBdu4g/1144x763",
  caption: "Woman smoking a tobacco",
  subcaption: "Photo by Hannah Cauhepe on Unsplash",
  thumbnail: "https://source.unsplash.com/QdBHnkBdu4g/100x67",
}];

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.onThumbnailSelect = this.onThumbnailSelect.bind(this);
  }

  onThumbnailSelect() {
    const { history } = this.props;
    history.push('/player');
    console.log('fuck you');
  }


  render () {
    return (
        <div>
            <ReactBnbGallery
                show={true}
                photos={photos}
                activePhotoPressed={this.onThumbnailSelect}    
            />
        </div>
    )
  }
}

export default Gallery;