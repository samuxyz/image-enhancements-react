import React, { Component } from 'react';
import filestack from 'filestack-js';
import { FILESTACK_API } from '../config';

const client = filestack.init(FILESTACK_API);
const filestackCDN = 'https://cdn.filestackcontent.com';

export default class AddContainer extends Component {

  constructor (props) {
    super(props);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { handle: '', transformation: '' };
  }

  filestack = () => {
    return client.pick(
      {
        accept: 'image/*',
        maxSize: 1024 * 1024 * 10,
      }
    );
  };

  async uploadImage () {
    try {
      const { filesUploaded } = await this.filestack();
      const handle = filesUploaded[0].handle;
      this.setState({ handle, transformation: this.setTransformation() });
    } catch (e) {
      console.log(e);
    }
  }

  handleChange = () => {
    this.setState({ transformation: this.setTransformation() });
  }

  setTransformation = () => {
    const { getUpscale, getEnhance, getRedEyes } = this;
    return filestackCDN + getUpscale() + getEnhance() + getRedEyes();
  }

  getUpscale = () => {
    const { upscale, noise } = this;
    return upscale.checked ? `/upscale=noise:${noise.value}` : '';
  }

  getEnhance = () => {
    const { enhance } = this;
    return enhance.checked ? '/enhance' : '';
  }

  getRedEyes = () => {
    const { redEyes } = this;
    return redEyes.checked ? '/redeye' : '';
  }

  async handleSubmit (e) {
    e.preventDefault();
    const {
      state: { handle, transformation },
      caption,
      author,
    } = this;
    const payload = {
      author: author.value,
      caption: caption.value,
      url: `${filestackCDN}/${handle}`,
      urlEnhanced: `${transformation}/${handle}`,
      createdAt: Date.now(),
    };
    
    try {
      let response = await fetch(
        'http://localhost:3000/images',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );
      response = await response.json();
    } catch (e) {
      console.log(e);
    }
  }

  render () {
    const { transformation, handle } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className=".col-md-offset-4 media-list">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h2 className="panel-title text-center">
                  <span className="glyphicon glyphicon-upload" /> Upload Image
      					</h2>
              </div>
              <div className="panel-body">
                <form
                  name="imageForm"
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  noValidate
                >
                  <div className="form-group">
                    <label htmlFor="caption">Caption</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter the caption..."
                      ref={(input) => this.caption = input}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter the author..."
                      ref={(input) => this.author = input}
                    />
                  </div>
                  <div className="form-group">
                    <label>Enhancements</label>
                    <div>
                      <input
                        type="checkbox"
                        ref={(input) => this.upscale = input}
                      /> Upscale
      							</div>
                    <div className="form-group">
                      <select
                        className="form-control"
                        ref={(input) => this.noise = input}
                      >
                        <option value="none">Noise Reduction</option>
                        <option value="low">low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        ref={(input) => this.enhance = input}
                      /> Enhance
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        ref={(input) => this.redEyes = input}
                      /> Red eyes removal
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="picture">File</label>
                    <div className={`thumbnail ${handle ? '' : 'off'}`}>
                      <img
                        id="img-preview"
                        src={handle ? `${transformation}/${handle}` : ''}
                        alt="picture-thumbnail"
                        className="img-rounded"
                      />
                    </div>
                    <div className="text-center dropup">
                      <button
                        type="button"
                        className="btn btn-default filepicker"
                        onClick={this.uploadImage}
                      >
      								  Upload <span className="caret" />
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-filestack btn-block submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
