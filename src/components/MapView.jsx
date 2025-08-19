import React from "react";

const MapView = () => (
  <section className="w-full h-96 flex justify-center items-center bg-gray-100">
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
