import React from "react";

interface CircleProgressBarTypes {
  width?: number;
  backgroundColor?: string;
  strokeColor?: string;
  progress?: number;
  strokeWidth?: number;
}

const CircleProgressBar: React.FC<CircleProgressBarTypes> = ({
  width = 100,
  backgroundColor = "#fff",
  strokeColor = "#000",
  progress = 78,
  strokeWidth = 12,
}) => {
  const raduis = width / 2 - strokeWidth / 2;
  const strokeDasharray = 2 * Math.PI * raduis;
  const strokeDashoffset = strokeDasharray * ((100 - progress) / 100);
  return (
    <svg
      width={`${width}px`}
      height={`${width}px`}
      viewBox={`0 0 ${width} ${width}`}
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle
        r={raduis}
        cx={width / 2}
        cy={width / 2}
        fill="transparent"
        stroke={backgroundColor}
        strokeWidth={`${strokeWidth}px`}
      ></circle>
      <circle
        r={raduis}
        cx={width / 2}
        cy={width / 2}
        fill="transparent"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeWidth={`${strokeWidth}px`}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
      ></circle>
    </svg>
  );
};

export default CircleProgressBar;
