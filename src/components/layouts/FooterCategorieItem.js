import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// 
import changeLangApi from '../../utils/changeLangApi';

const FooterCategorieItem = ({
    lang,
    categorie : {
        categorie_id,
        categorie_name_tm,
        categorie_name_ru,
        categorie_name_en,
    }
}) => {
    const [name, setName] = useState(null);

    useEffect(() => {
        const data = changeLangApi(lang,categorie_name_tm,categorie_name_ru,categorie_name_en);
        setName(data)
     }, [lang,categorie_name_tm,categorie_name_ru,categorie_name_en])

    return (
        <li>
            <Link to={`/subcategories/${categorie_id}`}>{name}</Link>
        </li>
    )
}

FooterCategorieItem.propTypes = {
    lang: PropTypes.string,
 }
 
 const mapStateToProps = state => ({
    lang: state.lang.lang
 })
 
 export default connect(mapStateToProps)(FooterCategorieItem);
 