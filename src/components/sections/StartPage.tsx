import React from "react";
import Slider from "react-slick";

import { data } from "../../utils/data";
import { settings } from "../../constant";
import HeaderIcon from "../atoms/HeaderIcon";
import { getGreeting } from "../../utils/utils";
import { Item, SpanData, StartPageProps } from "../../utils/interfaces";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StartPage = ({ showSidebar, setShowSidebar }: StartPageProps) => {
  return (
    <React.Fragment>
      <HeaderIcon
        className=""
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <div className="flex-1 flex flex-col justify-center ml-10 text-left">
        <div className="mb-6">
          <h1 className="title text-2xl font-bold text-white">
            {getGreeting()}
          </h1>
          <p className="text-base text-[#cacaca] mt-4">
            What do you want to build today ?
          </p>
        </div>
        <div className="bg-[#3b3b3b] text-white rounded-l-lg hidden sm:block">
          <h1 className="ml-10 text-[#ffffffb8] mt-5 text-sm rounded-full">
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
      </div>
    </React.Fragment>
  );
};

export default StartPage;
