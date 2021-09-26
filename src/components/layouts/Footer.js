import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// 
import Logo from '../../img/Logo isleg_Text.svg'
import Mail from '../../img/icons/ma.svg'
import Instagram from '../../img/icons/ins.svg'
import Phone from '../../img/icons/ph.svg'
import FooterCategorieItem from './FooterCategorieItem';


const Footer = () => {

    const [categories,  setCategories] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        try {
            const res = await axios.get('/v1/categories',{
                params : {
                    limit : 5
                }
            });
            setCategories(res.data)
   
         } catch (error) {
            console.error(error);
         }
    }

   return (
      <footer>
         <div  className="container">
            <div className="parts">
                <div className="p-1">
                    <div className="logo">
                        <a href="/">
                            <img src={Logo} alt="logo" />
                        </a>
                    </div>
                    <div className="contacts">
                        <div className="c-item">
                            <div>
                                <img src={Phone} alt="contacts" />
                            </div>
                            <a href="/">+993 65 578899</a>
                        </div>
                        <div className="c-item">
                            <div>
                                <img src={Mail} alt="contacts" />
                            </div>
                            <a href="/">info@isleg.com</a>
                        </div>
                        <div className="c-item">
                            <div>
                                <img src={Instagram} alt="contacts" />
                            </div>
                            <a href="/">@islegtm</a>
                        </div>
                    </div>
                </div>
                <div className="p-2">
                    <div className="title">
                        <Link to="/categories">{ t('categories') }</Link>
                    </div>
                    <ul className="links">
                        {
                            categories &&
                            categories.map((categorie,index) => <FooterCategorieItem key={index} categorie={categorie} /> )
                        }
                    </ul>
                </div>
                <div className="p-2">
                    <div className="title">
                        <span>{ t('links') }</span>
                    </div>
                    <ul className="links">
                        <li>
                            <Link to="/">{ t('about') }</Link>
                        </li>
                        <li>
                            <Link to="/">{ t('terms') }</Link>
                        </li>
                        <li>
                            <Link to="/">{ t('brands') }</Link>
                        </li>
                        <li>
                            <Link to="/">{ t('contacts') }</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="below">
                <Link to="/">islegtm.com </Link>  |  {t('all-rights')}
            </div>
         </div>
      </footer>
   )
}


export default Footer;
