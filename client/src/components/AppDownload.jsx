import React from 'react';
import { assets } from '../assets/assets';

const AppDownload = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto my-20'>
      <div className='relative bg-gradient-to-r from-violet-50 to-purple-50 p-12 sm:p-24 lg:p-32 rounded-lg flex items-center justify-between'>
        <div>
          <h1 className='text-2xl sm:text-4xl font-bold mb-8 max-w-md'>
            Download Mobile App For Better Experience
          </h1>
          <div className='flex gap-4'>
            <a href="#" className='inline-block'>
              <img className='h-12' src={assets.play_store} alt="Play Store" />
            </a>
            <a href="#" className='inline-block'>
              <img className='h-12' src={assets.app_store} alt="App Store" />
            </a>
          </div>
        </div>
        <img
          className='hidden lg:block lg:w-80 absolute right-0 lg:mr-0 mr-2 bottom-0'
          src={assets.app_main_img}
          alt="App Main"
        />
      </div>
    </div>
  );
};

export default AppDownload;
