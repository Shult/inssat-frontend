import './FileInputWithPreview.css';

function FileInputWithPreview({ onClick, imageName,imageInvalid, src, id, title, name, cadreStyle }) { 
  return (
    <div onClick={onClick} className="FileInputWithPreview position-relative mb-3">
      <label
        htmlFor={id}
        className="file-input-wrapper d-inline-block position-relative"
        style={{
          backgroundImage:  (src ? `url(${src})`:'none'),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderColor: (imageInvalid ? 'red' : ''),
          ...cadreStyle
        } } 
      >
        <input
          id={id}
          type="text"
          value={imageName}
          className="position-absolute overflow-hidden d-none"
          name={name}
        />
        <div className="image-container">
         <span>{title}</span>
          
        </div>
      </label>
    </div>
  );
}

export default FileInputWithPreview;
