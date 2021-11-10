import { useState, useEffect } from 'react';
import './App.css';
import { apiService } from './services/ApiService';
import SearchForm from './components/Searchbar';
import ImageGalleryItem from './components/ImageGalleryItem';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import LoaderPreLoader from './components/Loader';
import Modal from './components/Modal';

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [largeImage, setlargeImage] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPictures = () => {
    const options = {
      page,
      query,
    };

    setIsLoading(true);

    apiService(options)
      .then(
        prevPictures => setPictures([...pictures, ...prevPictures]),
        setPage(page + 1),
      )
      .catch(error => setError(error))
      .finally(() => {
        smoothScroll();
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    fetchPictures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const handleImageClick = url => {
    setlargeImage(url);
    toggleModal();
  };
  const onChangeQuery = query => {
    setQuery(query);
    setPage(1);
    setPictures([]);
    setError(null);
  };

  const smoothScroll = () => {
    console.log(`page`, page);
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="App">
      <SearchForm onSubmit={onChangeQuery} />

      {error && <p>Sorry! Somethimg went wrong. Try again, please!</p>}

      <ImageGallery>
        {pictures.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            srcWebformat={webformatURL}
            onClick={() => handleImageClick(largeImageURL)}
          />
        ))}
      </ImageGallery>
      {isLoading && <LoaderPreLoader />}
      {pictures.length > 11 && !isLoading && <Button onClick={fetchPictures} />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt="" />
        </Modal>
      )}
    </div>
  );
};

export default App;
