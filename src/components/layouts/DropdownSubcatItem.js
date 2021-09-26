import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
// 
import changeLangApi from '../../utils/changeLangApi';


const DropdownSubcatItem = ({
    lang,
    sub: {
        subcategorie_id,
        subcategorie_name_tm,
        subcategorie_name_ru,
        subcategorie_name_en
    }
}) => {
    const [name, setName] = useState(null);

    // Change api lang
    useEffect(() => {
        const data = changeLangApi(lang,subcategorie_name_tm,subcategorie_name_ru,subcategorie_name_en);
        setName(data)
    }, [lang,subcategorie_name_tm,subcategorie_name_ru,subcategorie_name_en])

    return (
        <li key={subcategorie_id} >
            <Link to={`/subcategories/products/${subcategorie_id}`}>{ name }</Link>
        </li>
    )
}

export default DropdownSubcatItem
