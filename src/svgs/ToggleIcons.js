import React from "react";

const Locater = ({
  style = {},
  fill = "#000",
  width = "20.323",
  className = "",
  viewBox = "0 0 20.323 23.964"
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
  <g id="Group_25" data-name="Group 25" transform="translate(-128.275 -105.88)">
    <path id="Path_212" data-name="Path 212" d="M145.453,312.814H141.48l-3.083,4.143-3.069-4.143h-3.91l-3.144,6.759H148.6Z" transform="translate(0 -189.729)" fill="#0073a7"/>
    <path id="Path_213" data-name="Path 213" d="M175.4,112.97v-.048a7.449,7.449,0,0,0-14.875,0v.032c-.006.127-.009.254-.009.376a7.438,7.438,0,0,0,1.87,4.941l.023.029,5.555,7.479,5.726-7.7.007-.008a7.515,7.515,0,0,0,.467-.621l.054-.082a7.421,7.421,0,0,0,1.193-4.046C175.411,113.212,175.409,113.092,175.4,112.97Zm-7.44,4.53a4.171,4.171,0,1,1,4.171-4.171,4.171,4.171,0,0,1-4.171,4.171h0Z" transform="translate(-29.563)" fill="#0073a7"/>
  </g>
  </svg>
);


const List = ({
    style = {},
    fill = "#000",
    width = "20.323",
    className = "",
    viewBox = "0 0 20.323 23.964"
  }) => (
    <svg
      width={width}
      style={style}
      height={width}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={`svg-icon ${className || ""}`}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
    <g id="NAV_list_icon" data-name="NAV_list icon">
        <rect id="Rectangle_23" data-name="Rectangle 23" width="21" height="2" fill="#0073a7"/>
        <rect id="Rectangle_24" data-name="Rectangle 24" width="21" height="2" transform="translate(0 7)" fill="#0073a7"/>
        <rect id="Rectangle_25" data-name="Rectangle 25" width="13" height="2" transform="translate(0 14)" fill="#0073a7"/>
    </g>
    </svg>
  );

export default Locater;
export { List };