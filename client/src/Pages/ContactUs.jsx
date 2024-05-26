import React from "react";

export default function ContactUs() {
  return (
    <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg">
      <h1 className="text-3xl lg:text-4xl mt-5 font-semibold font-serif text-center pb-4">
        Contact Us
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 text-center lg:text-left">
        <div className="flex-1">
          <h2 className="text-2xl font-medium  mb-3 font-serif">
            Our Office
          </h2>
          <p className="">1234 Main Street</p>
          <p className="">Suite 567</p>
          <p className="">Anytown, ST 12345</p>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-medium  mb-3 font-serif">Phone</h2>
          <p className="">(123) 456-7890</p>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-medium  mb-3 font-serif">Email</h2>
          <p className="">info@example.com</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-medium  mb-3 font-serif text-center lg:text-left">
          Business Hours
        </h2>
        <div className="flex flex-col lg:flex-row justify-between text-center lg:text-left">
          <div>
            <p className="">Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p className="">Saturday: 10:00 AM - 2:00 PM</p>
            <p className="">Sunday: Closed</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-medium  mb-3 font-serif text-center lg:text-left">
          Connect with Us
        </h2>
        <div className="flex justify-center lg:justify-start gap-4">
          <a
            href="https://www.facebook.com"
            className="text-blue-600 hover:underline"
          >
            Facebook
          </a>
          <a
            href="https://www.linkedin.com"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://www.twitter.com"
            className="text-blue-600 hover:underline"
          >
            Twitter
          </a>
        </div>
      </div>
    </div>
  );
}
