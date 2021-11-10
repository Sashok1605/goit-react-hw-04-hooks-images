const ImageGalleryItem = ({ picturesId, srcWebformat, onClick }) => {
  return (
    <li className="ImageGalleryItem" onClick={onClick}>
      <img src={srcWebformat} alt="" className="ImageGalleryItem-image" />
    </li>
  );
};

export default ImageGalleryItem;
