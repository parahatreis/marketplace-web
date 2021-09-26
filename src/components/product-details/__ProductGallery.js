import React, {useState, useCallback, useEffect} from 'react';
import ImageViewer from 'react-simple-image-viewer';
import { SplideSlide,Splide } from '@splidejs/react-splide';
// 
import apiPath from '../../utils/apiPath';

var thumbnailsSplide = {
   rewind: true,
   fixedWidth: 100,
   fixedHeight: 100,
   isNavigation: true,
   gap: 10,
   focus: 'left',
   pagination: false,
   cover: true,
   breakpoints: {
      '950': {
         fixedWidth: 80,
         fixedHeight: 80,
      },
      '680': {
         fixedWidth: 60,
         fixedHeight: 60,
         // focus: 'center',
      },
      '425': {
         fixedWidth: 50,
         fixedHeight: 50,
         // focus: 'center',
      }
   }
};

var primarySplide = {
   type: 'fade',
   heightRatio: 1,
   pagination: false,
   arrows: false,
   cover: true
};

const ProductGallery = ({product_images}) => {

   const [currentImage, setCurrentImage] = useState(0);
   const [isViewerOpen, setIsViewerOpen] = useState(false);
   const [images, setImages] = useState([]);
   const primaryRef = React.useRef();
   const secondaryRef = React.useRef();

   useEffect(() => {
      primaryRef.current.sync(secondaryRef.current.splide);
   }, [])

   useEffect(() => {
      if (product_images) {
         const imagesArr = product_images.map((img) => `${apiPath()}/${img}`)
         setImages(imagesArr)
      }
   }, [product_images])

   const openImageViewer = useCallback((index) => {
      setCurrentImage(index);
      setIsViewerOpen(true);
      document.querySelector('body').style.overflow = 'hidden';
   }, []);

   const closeImageViewer = () => {
      setCurrentImage(0);
      setIsViewerOpen(false);
      document.querySelector('body').style.overflow = 'unset';
   };

   return (
      <section className="gallery-wrapper">
         <div className="carousel-wrapper">
            <Splide options={primarySplide} ref={primaryRef}>
                {images.map((src, index) => (
                   <SplideSlide key={index}>
                      <div className="gallery-block" key={index}
                           onClick={ () => openImageViewer(index) }
                     >
                        <img src={ src } alt="sowdamerkezi" />
                     </div>
                  </SplideSlide>
                  ))}
            </Splide>
            <div className="thumbnail-block">
               <Splide options={thumbnailsSplide} ref={secondaryRef}>
                {images.map((src, index) => (
                   <SplideSlide key={index}>
                      <div className="gallery-block" key={index}
                           // onClick={ () => openImageViewer(index) }
                     >
                        <img src={ src } alt="sowdamerkezi" />
                     </div>
                  </SplideSlide>
                  ))}
            </Splide>
            </div>
         </div>
         <div>

            {isViewerOpen && (
            <ImageViewer
               src={ images }
               currentIndex={ currentImage }
               onClose={closeImageViewer}
            />
            )}
         </div>
      </section>
   )
}

export default ProductGallery
