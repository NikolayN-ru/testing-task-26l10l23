import React from "react";

const NewsItem = () => {
  const currentPath = window.location.pathname.split("/")[2];
  console.log(currentPath);
  return <div>{currentPath}</div>;
};

export default NewsItem;
