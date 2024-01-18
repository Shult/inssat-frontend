import React from 'react';

const ImageList = ({ fileNames, currentIndex, setCurrentIndex, setSelectedImage }) => {
  return (
    <div className="scrblList">
      <div className="row">
        {fileNames.map((file, index) => (
          <div key={index} className="col-sm-6 col-md-3">
            <div className="file-man-box" onClick={() => setSelectedImage(file)}>
              <div className="file-img-box">
                <img src={file.imageBlob} alt="icon" />
              </div>
              <div className="file-man-title">
                <h5 className="mb-0 text-overflow">{file.imageName}</h5>
                <p className="mb-0"><small>{file.imageBlob ? 'Image' : 'Error'}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;
