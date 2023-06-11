import React from 'react'
import Announcements from '../components/Announcements'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Footer from '../components/Footer';

const Home = () => {

  return (
    <div>
        <Navbar/>
        <Announcements/>
        <Slider/>
        <Categories/>
        <Products/>
        <Footer/>
    </div>
  )
}

export default Home