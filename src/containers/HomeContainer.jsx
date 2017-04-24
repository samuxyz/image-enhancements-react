import React, { Component } from 'react';
import { Image, Jumbotron } from 'components';

export default class HomeContainer extends Component {

  constructor (props) {
    super(props);
    this.state = { images: [] };
    this.deleteImage = this.deleteImage.bind(this);
  }

  async componentDidMount () {
    try {
      const response = await fetch('http://localhost:3000/images');
      const images = await response.json();
      this.setState({ images });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteImage (id) {
    const { images } = this.state;
    try {
      let response = await fetch(
        `http://localhost:3000/images/${id}`,
        { method: 'DELETE' },
      );
      response = await response.json();
      this.setState({ images: images.filter(image => image.id !== id) });
    } catch (e) {
      console.log(e);
    }
  }

  render () {
    const { images } = this.state;
    return (
      <div>
        <Jumbotron />
        <div className="container">
          {
            images.map((image, i) => (
              <Image
                key={i}
                {...image}
                deleteImage={this.deleteImage}
              />
            ))
          }
        </div>
      </div>
    );
  }
}
