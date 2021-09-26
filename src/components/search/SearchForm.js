import React, {useState} from 'react'
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// 
// import { searchProducts } from '../../actions/productsAction'
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Search from '../../img/icons/search.svg'



const SearchForm = () => {

   const { t } = useTranslation();


   const [searchQuery, setQuery] = useState('');

   let history = useHistory();
   

   const onChange = (e) => setQuery(e.target.value)

   const onSubmit = (e) => {
      e.preventDefault();
      if (searchQuery !== '') {
         const data = searchQuery.trim();
         history.push(`/search/${data}`)
      }
   }

   return (
      <>
         <form
            onSubmit={(e) => onSubmit(e)}
         >
            <input
               placeholder={t('search')}
               type="text"
               name="search"
               value={searchQuery}
               onChange={(e) => onChange(e)}
            />
            <button type="submit" className="search-icon">
               <img src={Search} alt="search" />
            </button>
         </form>
      </>
   )
}

export default SearchForm;
