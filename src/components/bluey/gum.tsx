"use client";
import type { SvgProps } from "./types";

export const Gum = ({ style, ...props }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 1.5,
      ...style,
    }}
    viewBox="0 0 121 94"
    {...props}
  >
    <path
      d="M8.8 38.4S11 33.7 18 27.2C23 22.7 34.6 13.5 41.7 8c3.6-2.8 8.1-4.4 12.7-4.4 14.7-.1 47.9.2 54.4 5.2 8.5 6.6 8.8 25.5 6.6 37.7-2.2 12.2-37.4 36-46.6 41.6C59.5 94 14.9 57 14.9 57L8.8 38.4Z"
      style={{ fill: "#fcb0e3" }}
    />
    <path
      d="m73.7 85.4-16.2-11 7.2-31.5 44.6-33.7c8 7.3 8.2 25.3 6 37.3-1.8 10.6-28 31.7-41.6 38.9Z"
      style={{ fill: "#f481ab" }}
    />
    <path
      d="M8.8 38.4S11 33.7 18 27.2C23 22.7 34.6 13.5 41.7 8c3.6-2.8 8.1-4.4 12.7-4.4 14.7-.1 47.9.2 54.4 5.2 8.5 6.6 8.8 25.5 6.6 37.7-2.2 12.2-36.6 34.8-45.8 40.5-9.3 5.8-54.7-30-54.7-30L8.8 38.4Z"
      style={{ fill: "none", stroke: "#a8569c", strokeWidth: "7.11px" }}
    />
    <path
      d="M11.2 34.5s-5.5 4.2-7 19.9C2.8 70.1 2 79.7 19.2 83.8c24.2 5.8 40 6.3 40 6.3s16.4 0 17.3-15c1-15-2.4-30.2-17.3-35.2-15-5-48-5.5-48-5.5Z"
      style={{ fill: "#e564b7", stroke: "#a8569c", strokeWidth: "7.11px" }}
    />
    <path
      d="M68.8 88.1 50.6 62.5 29 60.6 8.8 77.1"
      style={{ fill: "none", stroke: "#d25aaa", strokeWidth: "5px" }}
    />
    <path
      d="M11.2 34.5 29 60.6l21.6 2 15.8-18.3"
      style={{ fill: "none", stroke: "#d25aaa", strokeWidth: "5px" }}
    />
    <path
      fill="none"
      d="M11.2 34.5s-5.5 4.2-7 19.9C2.8 70.1 2 79.7 19.2 83.8c24.2 5.8 40 6.3 40 6.3s16.4 0 17.3-15c1-15-2.4-30.2-17.3-35.2-15-5-48-5.5-48-5.5Z"
      style={{ fillOpacity: 0, stroke: "#a8569c", strokeWidth: "7.11px" }}
    />
  </svg>
);
