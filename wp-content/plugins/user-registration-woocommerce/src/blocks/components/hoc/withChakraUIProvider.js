import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

const withChakraUIProvider = (WrappedComponent) => {
	const Component = (props) => (
		<ChakraProvider>
			<div className="urwc-block">
				<WrappedComponent {...props} />
			</div>
		</ChakraProvider>
	);
	Component.displayName = `withChakraUIProvider`;
	return Component;
};

export default withChakraUIProvider;
