import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Team = () => {
   return (
      <>
         <section class="history" id="history" className=' bg-primary-content flex justify-center items-center min-h-screen flex-col gap-5 '>
            {/* <div class="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/shape.svg)] bg-cover bg-center bg-no-repeat"></div> */}

            <h1 className=' flex items-center md:text-4xl text-2xl text-white font-extrabold md:mt-0 mt-4 font-heading'>Meet Our Team Members</h1>
            <div id="mainnav" className=' relative w-full'>

               <img src="/shape.svg" alt="shape" className='absolute inset-0 w-screen h- object-cover ' />
                <div id="main-history" data-aos="fade-in" >
                   <div id="history-section1" class="history-section1">
                      <figure class="sub-history">
                         <div class="image" data-aos="zoom-in">
                            <div className='h-56 w-full bg-slate-800 flex items-center justify-center text-white text-4xl font-bold'>HK</div>
                         </div>
                         <figcaption className=' bg-slate-900 '>
                            <h3 className='text-2xl font-heading font-bold'>Harsh Kumar</h3>
                            <h4 className='text-lg font-sans'>Full Stack Developer</h4>
                            <div className=' w-full py-8 bg-transparent flex  gap-8 justify-center  items-center '>
                               <Link to='https://github.com/harsh-kr9' ><FontAwesomeIcon  icon={faGithub} className='text-white h-8 w-8 ' /></Link>
                               <Link to='https://www.linkedin.com/in/harsh-kumar-0368a5274?utm_source=share_via&utm_content=profile&utm_medium=member_android'><FontAwesomeIcon icon={faLinkedin} className='text-white h-8 w-8' /></Link>
                            </div>
                         </figcaption>
                      </figure>

                      <figure class="sub-history">
                         <div class="image" data-aos="zoom-in">
                            <div className='h-56 w-full bg-slate-700 flex items-center justify-center text-white text-4xl font-bold'>RC</div>
                         </div>
                         <figcaption className=' bg-slate-900 '>
                            <h3 className='text-2xl font-heading font-bold'>Rohit Chandra</h3>
                            <h4 className='text-lg font-sans'>Full Stack Developer</h4>
                            <div className=' w-full py-8 bg-transparent flex  gap-8 justify-center  items-center '>
                               <Link to='https://github.com/Rohit-hub2311/' ><FontAwesomeIcon  icon={faGithub} className='text-white h-8 w-8 ' /></Link>
                               <Link to='https://www.linkedin.com/in/rohit-chandra-8349822a3'><FontAwesomeIcon icon={faLinkedin} className='text-white h-8 w-8' /></Link>
                            </div>
                         </figcaption>
                      </figure>
                   </div>
                </div>
            </div>
         </section>
      </>
   );
}

export default Team;
