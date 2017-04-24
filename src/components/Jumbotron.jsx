import React from 'react';
import { Link } from 'react-router';

const Jumbotron = () => (
  <div className="jumbotron">
    <div className="container text-center">
      <h1>Enhance Your Images</h1>
      <p>Take a look at Filestack’s new image transformations. Upscale and enhance beautiful landscapes or remove red eyes from your portraits.</p>
      <p>
        <Link
          className="btn btn-filestack btn-lg btn-filestack-start"
          to="/add"
          role="button"
        >
          Upload Picture
        </Link>
      </p>
    </div>
  </div>
);

export default Jumbotron;
