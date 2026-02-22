 import React from 'react'
 import HomeAbout from '../../features/home/components/HomeInfo'
 import Hero from '../../features/home/components/Hero'
 import MenuSection from '../../features/home/components/Menu-secation'
   function Home() {
   return (
     <div>
      <Hero/>
      <MenuSection/>
      <HomeAbout/>

      </div>
   )
 }
 
 export default Home