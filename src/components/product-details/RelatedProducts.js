import React, {useEffect, useState} from 'react';
// 
import ProductsItem from '../products/ProductsItem'
import axios from 'axios';
import Spinner from '../layouts/Spinner'


const RelatedProducts = ({product_id}) => {

   const [relatedProducts, setRelatedProducts] = useState(null);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (product_id) {
         getRelatedProducts(product_id)
      }
   }, [product_id]);

   const getRelatedProducts = async (product_id) => {
      setLoading(true)
      try {
         const res = await axios.get(`/v1/products/related-products/${product_id}`);
         setRelatedProducts(res.data)
         setLoading(false)
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <section className="related-products">
         {
            loading ? <Spinner /> :
            <>
               {
                  relatedProducts && relatedProducts.length > 0 &&
                  <>
                     <h1>Menzes harytlar</h1>
                     <div className="product-list">
                        {
                           relatedProducts.map((product,index) => <ProductsItem key={index} product={product} />)
                        }
                     </div>
                  </>
               }
            </>
         }
      </section>
   )
}



export default RelatedProducts
