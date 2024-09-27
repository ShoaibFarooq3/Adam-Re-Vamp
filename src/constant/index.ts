export const settings = {
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
