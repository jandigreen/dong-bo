const Arrow = ({ color = "#000", isOpendeg = "0" }) => (
  <svg width={16} height={17} fill="none">
    <g clipPath="url(#a)" transform={`rotate(${isOpendeg}, 8, 8.5)`}>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="m2.617 6.5 4.73 4.73a.922.922 0 0 0 1.3 0l4.736-4.73"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 .5h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default Arrow;
