import React from "react";

const MapView = () => (
  <section className="w-full flex flex-col justify-center items-center bg-white">
    <h2 className="text-2xl font-bold mb-2 pt-5">Find Us Here</h2>
    <div className="bg-red-500 h-[5px] w-[100px] mt-0 mb-4 pt-0"></div>
    <p className="text-gray-600 mb-6 text-center px-5">Located in the heart of Rohtak with easy access and ample parking facilities. We're conveniently situated for patients across Haryana.
    </p>
    <iframe
      title="Holy Heart Hospital Location"
      src="https://www.google.com/maps?q=Holy+Heart+Advanced+Cardiac+Care+%26+Research+Center+330,+Vinay+Nagar,+Delhi+Bypass+Chowk,+Rohtak+-+124001,+Haryana+(India)&output=embed"
      width="100%"
      height="100%"
      style={{ border: 0, borderRadius: '1rem', minHeight: '350px' }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </section>
);

export default MapView;
