import React from 'react'

function button({
    children,
    type = "button",
    className = "",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    ...props

}) {
  return (
    <button className={`${className} ${bgColor} ${textColor} py-2 px-4 `}  {...props} type={type}  >{children}</button>
  );
}

export default button