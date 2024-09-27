declare module "react-slick" {
  import { Component } from "react";

  interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
    pauseOnHover?: boolean;
  }

  export default class Slider extends Component<Settings> {
    slickGoTo(arg0: number): void;
    innerSlider: any;
  }
}
