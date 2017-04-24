import React from 'react';
import moment from 'moment';

const Image = (props) => {
  const { id, caption, author, createdAt, url, urlEnhanced, deleteImage } = props;
  return (
    <div className="row">
      <div>
        <div className="media">
          <div className="media-body">
            <h4 className="media-heading"><a href="#" target="_blank">{caption}</a></h4>
            <h5 className="media-heading"><i>Posted by</i> {author} on {moment(createdAt).format('YYYY/MM/DD')}</h5>
            <div className="row">
              <div className="col-sm-6 col-md-6 text-center">
                <div className="thumbnail">
                  <img src={url} alt="image-original" />
                  <div className="caption">
                    <h3>Original Picture</h3>
                    <p>
                      <a href={url} className="btn btn-fiestack-preview" target="_blank">
                        <i className="glyphicon glyphicon-search" /> Click for Full Size
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 text-center">
                <div className="thumbnail">
                  <img src={urlEnhanced} alt="image-enhanced" />
                  <div className="caption">
                    <h3>Enhanced Picture</h3>
                    <p>
                      <a href={urlEnhanced} className="btn btn-fiestack-preview" target="_blank">
                        <i className="glyphicon glyphicon-search" /> Click for Full Size
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-group btn-group-xs pull-right" role="group" aria-label="media-stats">
              <button className="btn btn-filestack" onClick={() => deleteImage(id)}><i className="glyphicon glyphicon-trash" /> Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image;
