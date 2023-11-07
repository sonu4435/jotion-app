"use client";

import React from "react";
import {
  AiFillLinkedin,
  AiOutlineInstagram,
  AiOutlineTwitter
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import FooLogo from "./fooLogo";

const Footer = () => {
  return (
    <>
      {/* <div className="flex items-center w-full p-6 bg-background">
        
      </div> */}
      <footer className="dark:bg-[#1f1f1f] h-full w-full text-white bg-gray-800 grid max-[640px]:grid-cols-3 grid-cols-4 gap-x-32 md:gap-x-16 md:px-10 sm:gap-x-16 sm:px-10 px-40 py-10 max-[640px]:gap-x-16 max-[640px]:px-6">
        <div className="social-icon row-span-1 space-y-7 ">
          <h1 className="text-xl text-white font-semibold">
            <a href="#!" className="flex ">
              <FooLogo />
            </a>
          </h1>
          <div className="icons max-[640px]:grid flex xl:flex-row md:hidden sm:flex-col relative right-2 text-xl xl:flex text-white xl:gap-x-0 md:gap-x-3">
            <AiOutlineInstagram className="text-xl  md:ml-4 duration-100 transition-all ease-in-out cursor-pointer hover:text-pink-600 px-2 h-10 flex items-center w-10 rounded-lg hover:bg-gray-600 md:hover:bg-transparent  sm:hover:bg-transparent " />
            <AiOutlineTwitter className="text-xl md:ml-4  duration-100 transition-all ease-in-out cursor-pointer hover:text-blue-400 px-2 h-10 flex items-center w-10 rounded-lg hover:bg-gray-600 md:hover:bg-transparent  sm:hover:bg-transparent " />
            <AiFillLinkedin className="text-xl  md:ml-4 duration-100 transition-all ease-in-out cursor-pointer hover:text-blue-400 px-2 h-10 flex items-center w-10 rounded-lg hover:bg-gray-600 md:hover:bg-transparent  sm:hover:bg-transparent " />
            <BsFacebook className="text-xl  md:ml-4 duration-100 transition-all ease-in-out cursor-pointer hover:text-blue-500 px-2 h-10 flex items-center w-10 rounded-lg hover:bg-gray-600 md:hover:bg-transparent  sm:hover:bg-transparent " />
            <FaYoutube className="text-xl  md:ml-4 duration-100 transition-all ease-in-out cursor-pointer hover:text-red-500 px-2 h-10 flex items-center w-10 rounded-lg hover:bg-gray-600 md:hover:bg-transparent  sm:hover:bg-transparent " />
          </div>
        </div>
        <div className="product flex flex-col">
          <h1 className="tracking-wider font-bold">Product</h1>
          <li className="tracking-widest list-none  py-1 mt-2 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Wikis</a>
          </li>
          <li className="tracking-widest list-none  py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Projects</a>
          </li>
          <li className="tracking-widest list-none  py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Docs</a>
          </li>
          <li className="tracking-widest list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Our Ai</a>
          </li>
          <li className="tracking-widest list-none  py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">What’s new</a>
          </li>
        </div>
        <div className="download flex flex-col">
          <h1 className="tracking-wider font-bold">Download</h1>
          <li className="tracking-widest list-none py-2 mt-4 text-gray-400 hover:text-gray-200 ">
            <a href="#!">iOS & Android</a>
          </li>
          <li className="tracking-widest list-none py-2 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Mac & Windows</a>
          </li>
          <li className="tracking-widest list-none py-2 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Web Clipper</a>
          </li>
        </div>
        <div className="get_started max-[640px]:mt-5 flex flex-col">
          <h1 className="tracking-wider font-bold">Get Started</h1>
          <li className="tracking-wide list-none py-1 mt-2 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Switch from Confluence</a>
          </li>
          <li className="tracking-wide order-3 list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Switch from Asana</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Switch from Evernote</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Compare vs Monday</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Compare vs Clickup</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Compare vs Jira</a>
          </li>
        </div>
        <div className="get_started max-[640px]:mt-5 flex row-span-3 flex-col">
          <h1 className="tracking-wider font-bold">Solution</h1>
          <li className="tracking-wide list-none py-1 mt-2 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Enterprise</a>
          </li>
          <li className="tracking-wide order-3 list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Small business</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Personal use</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Remote work</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Startups</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Education</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Nonprofits</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Engineering</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Product</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Design</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Managers</a>
          </li>
        </div>
        <div className="get_started max-[640px]:mt-5 flex flex-col">
          <h1 className="tracking-wider font-bold">Build</h1>
          <li className="tracking-wide list-none py-1 mt-2 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Integrations</a>
          </li>
          <li className="tracking-wide order-3 list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Templates</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">API docs</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Guides & tutorials</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Find a consultant</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Become an affiliate</a>
          </li>
        </div>
        <div className="learn flex max-[640px]:mt-5 flex-col">
          <h1 className="tracking-wider font-bold">Learn</h1>
          <li className="tracking-wide list-none py-1 mt-2 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Customer stories</a>
          </li>
          <li className="tracking-wide order-3 list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Help center</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Webinars</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Blog</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Community</a>
          </li>
        </div>
        <div className="Resources mt-5 max-[640px]:mt-0 flex flex-col">
          <h1 className="tracking-wider font-bold">Resources</h1>
          <li className="tracking-wide list-none py-1 mt-2 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Pricing</a>
          </li>
          <li className="tracking-wide order-3 list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">About us</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Media kit</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Email us </a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Security</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">settings</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Terms & privacy</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">California</a>
          </li>
          <li className="tracking-wide list-none py-1 text-gray-400 hover:text-gray-200 ">
            <a href="#!">Privacy Notice</a>
          </li>
        </div>
        <div className="flex w-80 flex-col gap-2">
          <h1 className=" text-gray-300 p-1 text-sm hover:underline hover:text-white font-sans font-normal tracking-wider">
            <a href="#!">Do Not Sell or Share My Info</a>
          </h1>
          <h3>
            <i>&copy; {new Date().getFullYear()}</i> By Soumya.
          </h3>
        </div>
      </footer>
    </>
  );
};

export default Footer;
