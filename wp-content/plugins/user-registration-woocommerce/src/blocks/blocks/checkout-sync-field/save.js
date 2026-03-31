import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

export const Save = (props) => {
	const blockProps = useBlockProps.save();

        return (
            <div { ...blockProps }>
                <InnerBlocks.Content />
            </div>
        );
};
