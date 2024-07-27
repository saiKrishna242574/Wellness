import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FlipWords } from './ui/Flip-words';
import Filterdata from './Filterdata';

const Home = () => {
  const [imageUrl, setImageUrl] = useState('');
  const words = ["Discover Your Inner Peace"];


  useEffect(() => {
    const fetchRetreatData = async () => {
      try {
        const response = await axios.get('https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats/18');
        const apiData = response.data;
        setImageUrl(apiData.image);
        setLocation(apiData.location);
      } catch (error) {
        console.error('Error fetching the retreat data:', error);
      }
    };

    fetchRetreatData();
  }, []);

  return (
    <div className="min-h-auto bg-white ">
      <div className='grid bg-blue-950 w-full h-auto py-4 px-4 sm:px-6 text-lg sm:text-xl text-white font-bold text-center md:text-left'>
        Wellness Retreats
      </div>
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10 ">
        <div className="bg-gray-200 rounded-xl shadow-lg overflow-hidden hidden md:block">

          {imageUrl ? (
            <img src={imageUrl} alt="Retreat" className="w-full  py-4 px-6 h-64 rounded-xl object-cover" />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
              Loading...
            </div>
          )}
          <div className="p-4 sm:p-6 md:p-8 lg:p-10">
            <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-semibold font-serif text-gray-900 mb-2">
              <FlipWords words={words} className="flex mt-[-2vw]"/>
            </h1>
            <h6 className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 ml-[0.5vw]">
              Join us for a series of wellness retreats designed to help you find tranquility and rejuvenation.
            </h6>
          </div>
        </div>
        <Filterdata />
      </div>

    </div>
  );
}

export default Home;
