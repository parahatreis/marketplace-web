export default function changeLangApi(lang, tm, ru, en) {
   let res = '';
   if(lang === 'tm') res = tm;
   if(lang === 'ru') res = ru;
   if (lang === 'en') res = en;
   return res;
}