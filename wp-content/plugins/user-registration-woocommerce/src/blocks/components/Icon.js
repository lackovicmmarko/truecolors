import React from "react";
import { chakra, forwardRef } from "@chakra-ui/react";
import { createElement } from "@wordpress/element";

export const Icon = () => {
	const Icon = createElement(
		"svg",
		{ width: 24, height: 24, viewBox: "0 0 32 32" },
		createElement("path", {
			fill: "currentColor",
			d: "M27.58 4a27.9 27.9 0 0 0-5.17 4 27 27 0 0 0-4.09 5.08 33.06 33.06 0 0 1 2 4.65A23.78 23.78 0 0 1 24 12.15V18a8 8 0 0 1-5.89 7.72l-.21.05a27 27 0 0 0-1.9-8.16A27.9 27.9 0 0 0 9.59 8a27.9 27.9 0 0 0-5.17-4L4 3.77V18a12 12 0 0 0 9.93 11.82h.14a11.72 11.72 0 0 0 3.86 0h.14A12 12 0 0 0 28 18V3.77zM8 18v-5.85a23.86 23.86 0 0 1 5.89 13.57A8 8 0 0 1 8 18zm8-16a3 3 0 1 0 3 3 3 3 0 0 0-3-3z",
		}),
	);
	return Icon;
};


export const CheckoutSyncFields = (props) => (
	<chakra.svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="#475BB2"
		h="6"
		w="6"
		{...props}
	>
		<path
			fillRule="evenodd"
			d="M8.545 9.273a.91.91 0 1 0 0 1.818h7.273a.91.91 0 1 0 0-1.818H8.545Zm-.909 4.545a.91.91 0 0 1 .91-.909h7.272a.91.91 0 1 1 0 1.818H8.545a.91.91 0 0 1-.909-.909Zm.909 2.728a.91.91 0 1 0 0 1.818h1.819a.91.91 0 1 0 0-1.819H8.545Z"
			clipRule="evenodd"
		></path>
		<path
			fillRule="evenodd"
			d="M7.636 3.818C7.636 2.814 8.45 2 9.455 2h5.454c1.004 0 1.818.814 1.818 1.818h.91a2.727 2.727 0 0 1 2.727 2.727v12.728A2.727 2.727 0 0 1 17.636 22H6.727A2.727 2.727 0 0 1 4 19.273V6.545a2.727 2.727 0 0 1 2.727-2.727h.91Zm7.273 3.637a1.818 1.818 0 0 0 1.818-1.819h.91a.91.91 0 0 1 .909.91v12.727a.91.91 0 0 1-.91.909H6.727a.91.91 0 0 1-.909-.91V6.546a.91.91 0 0 1 .91-.909h.908c0 1.005.814 1.819 1.819 1.819h5.454ZM9.455 5.636V3.818h5.454v1.818H9.455Z"
			clipRule="evenodd"
		></path>
	</chakra.svg>
);
