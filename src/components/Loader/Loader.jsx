import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const LoaderPreLoader = () => {
  return (
    <Loader
      className="Loader"
      type="ThreeDots"
      color="#00BFFF"
      height={80}
      width={80}
      timeout={4000}
    />
  );
};

export default LoaderPreLoader;
