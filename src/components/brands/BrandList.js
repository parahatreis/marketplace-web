import React, {Fragment} from 'react'
import PropTypes from 'prop-types';
// 
import BrandItem from './BrandItem'


const BrandList = ({brands}) => {
   return (
      <Fragment>
         <section className="brands-wrapper">
            <div className="page-title">
               <h2>Brands</h2>
            </div>
            <div className="brand-list">
               <div className="brand-list-wrapper">
                  
                  {brands.map((brand, index) => (
                     <BrandItem key={index} brand={brand} />
                  ))}
                  
               </div>
            </div>
         </section>
      </Fragment>
   )
}

BrandList.propTypes = {
   brands : PropTypes.array.isRequired,
}

export default BrandList
