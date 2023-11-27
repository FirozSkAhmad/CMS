import "./Upload.css";

const Upload = () => {
  return (
    <div className="upload_con">
      <div className="content">
        <div className="heading_container">
          <p className="heading">In The News - Upload</p>
        </div>
        <div className="main_con">
          <div className="left_con">
            <div className="input_field">
              <label htmlFor="username">Name*</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Title Name"
                autoComplete="off"
              />
            </div>
            <div className="input_field">
              <label htmlFor="bodyText">Body Text</label>
              <textarea
                id="bodyText"
                name="bodyText"
                placeholder="Body Text"
                autoComplete="off"
                style={{ height: "300px" }}
              ></textarea>
            </div>
            <div className="input_field">
              <label htmlFor="buttonTitle">Button Title/name*</label>
              <input
                type="text"
                id="buttonTitle"
                name="buttonTitle"
                autoComplete="off"
                placeholder="Button text"
              />
            </div>
          </div>
          <div className="right_con">
            <div className="imgUpload_field">
              <p>Image Upload*</p>
              <div className="buttons_con">
                <button className="uploadBtn">Upload</button>
                <button className="changeBtn">Change Image</button>
              </div>
            </div>
            <div className="imgPreview_field">
              <p>Image Preview</p>
            </div>
            <div className="uploadBtn_con">
              <button className="uploadBtn">Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
