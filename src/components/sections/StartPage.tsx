import React from "react";

import { data } from "../../utils/data";
import HeaderIcon from "../atoms/HeaderIcon";
import { getGreeting } from "../../utils/utils";
import { Item, SpanData, StartPageProps } from "../../utils/interfaces";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PromptBar from "../atoms/PromptBar";
// import { settings } from "../../constant";
import Slider from "react-slick";
var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 2000,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 1536,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        dots: false,
      },
    },
  ],
};

const StartPage = ({ showSidebar, setShowSidebar }: StartPageProps) => {
  return (
    <React.Fragment>
      <HeaderIcon
        className=""
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <div className="flex-1 flex flex-col justify-center ml-10 text-left h-[100svh] relative">
        <div>
          <h1 className="title text-2xl font-bold text-white">
            {getGreeting()}
          </h1>
          <p className="text-base text-[#cacaca] mt-4">
            What do you want to build today ?
          </p>
        </div>
        <div className="bg-[#3b3b3b] text-white rounded-l-lg hidden sm:block mt-5">
          <h1 className="ml-10 text-[#ffffffb8] mt-5 rounded-full">
            Start with an Object
          </h1>
          <div>
            <Slider {...settings}>
              {data?.map((item: Item, index: number) => (
                <div key={index} className="rounded-lg px-5 py-5 my-4 ml-10">
                  <div className="bg-[#2a2a2a] rounded-lg">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className={`rounded-t-lg w-full bg-[#F9D3B7]`}
                    />
                    <div className="py-5">
                      <div className="mb-5 ml-5">
                        <h4 className="mb-2 text-sm tracking-tight text-[#F3F3F3]">
                          {item.title}
                        </h4>
                      </div>
                      <div className="mt-3 ml-3">
                        {item.spanData.map(
                          (data: SpanData, spanIndex: number) => (
                            <span
                              key={spanIndex}
                              className={`${data.color} rounded-full p-2 text-white text-xs mr-1 mt-10`}
                            >
                              {data.name}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="absolute bottom-10 lg:bottom-0 w-full">
          <PromptBar />
        </div>
      </div>
    </React.Fragment>
  );
};

export default StartPage;
