import React, { Fragment, useState } from 'react'
import TkmFlag from '../../img/turkmenistan.svg';
import RuFlag from '../../img/russia.svg';

const ChangeLanguage = () => {

   const [flag, setFlag] = useState('tkm');

   const onChange = () => {
      if (flag === 'tkm') setFlag('ru');
      if (flag === 'ru') setFlag('tkm');
   }

   return (
      <Fragment>
         <div className="langs" onClick={(e) => onChange(e)}>
            {
               flag === 'tkm' ?
                  (<img src={TkmFlag} alt="tm" />) : 
                  (<img src={RuFlag} alt="ru" />)
            }
         </div>
      </Fragment>
   )
}

export default ChangeLanguage
