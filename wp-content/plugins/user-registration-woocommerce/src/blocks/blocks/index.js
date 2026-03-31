import { registerBlockType } from "@wordpress/blocks";
import { checkoutSyncFieldSettings } from './checkout-sync-field';

let blocks = [
	checkoutSyncFieldSettings
];
export const registerBlocks = () => {
	for (const block of blocks) {
		registerBlockType(block.metadata, block.setting );
	}
};

export default registerBlocks;
