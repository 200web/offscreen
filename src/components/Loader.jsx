import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width={100}
    height={500}
    viewBox="0 0 100% 500"
    backgroundColor="#3F3F3F"
    foregroundColor="#EEE7E7"
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="500" />
  </ContentLoader>
);

export default MyLoader;
