const DownaloadButton = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <button className="custom-button mt-2 z-[10]">
      <svg
        className="normal-svg"
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g filter="url(#filter0_d_5375_14052)">
          <rect
            x="2.5"
            y="1.5"
            width="39"
            height="39"
            rx="7.5"
            stroke="#FF5EAB"
          />
          <path
            d="M22 25L17 20L18.4 18.55L21 21.15V13H23V21.15L25.6 18.55L27 20L22 25ZM16 29C15.45 29 14.9792 28.8042 14.5875 28.4125C14.1958 28.0208 14 27.55 14 27V24H16V27H28V24H30V27C30 27.55 29.8042 28.0208 29.4125 28.4125C29.0208 28.8042 28.55 29 28 29H16Z"
            fill="#ECECF1"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_5375_14052"
            x="0"
            y="0"
            width="44"
            height="44"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_5375_14052"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_5375_14052"
              result="shape"
            />
          </filter>
        </defs>
      </svg>

      <svg
        className="hover-svg"
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g filter="url(#filter0_d_5375_14054)">
          <rect x="2" y="1" width="40" height="40" rx="8" fill="#FF5EAB" />
          <rect
            x="2.5"
            y="1.5"
            width="39"
            height="39"
            rx="7.5"
            stroke="#FF5EAB"
          />
          <path
            d="M22 25L17 20L18.4 18.55L21 21.15V13H23V21.15L25.6 18.55L27 20L22 25ZM16 29C15.45 29 14.9792 28.8042 14.5875 28.4125C14.1958 28.0208 14 27.55 14 27V24H16V27H28V24H30V27C30 27.55 29.8042 28.0208 29.4125 28.4125C29.0208 28.8042 28.55 29 28 29H16Z"
            fill="#212121"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_5375_14054"
            x="0"
            y="0"
            width="44"
            height="44"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_5375_14054"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_5375_14054"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </button>
  );
};

export default DownaloadButton;
