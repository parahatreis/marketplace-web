import React, {useEffect} from 'react';
// 


const About = () => {


   useEffect(() => {
      window.scrollTo(0, 0);
   }, [])

   return (
      <section className="about-section">
          {/* Page Title */}
         <div className="page-title">
            <h2>Biz Barada</h2>
         </div>
         <section className="content-section">
            <article>
            - Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pellentesque cras viverra est mauris et nibh. Posuere molestie mauris ut semper malesuada laoreet mauris. Nibh eget at dui augue convallis arcu nunc est, in. Amet, eleifend quisque viverra amet facilisis senectus nisi quis. Vitae consectetur sit vestibulum quam. Tincidunt vulputate lacinia ullamcorper ac, imperdiet facilisi proin.
            </article>
            <article>
            - Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pellentesque cras viverra est mauris et nibh. Posuere molestie mauris ut semper malesuada laoreet mauris. Nibh eget at dui augue convallis arcu nunc est, in. Amet, eleifend quisque viverra amet facilisis senectus nisi quis. Vitae consectetur sit vestibulum quam. Tincidunt vulputate lacinia ullamcorper ac, imperdiet facilisi proin.
            </article>
            <article>
            - Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pellentesque cras viverra est mauris et nibh. Posuere molestie mauris ut semper malesuada laoreet mauris. Nibh eget at dui augue convallis arcu nunc est, in. Amet, eleifend quisque viverra amet facilisis senectus nisi quis. Vitae consectetur sit vestibulum quam. Tincidunt vulputate lacinia ullamcorper ac, imperdiet facilisi proin.
            </article>
         </section>
      </section>
   )
}


export default About;
