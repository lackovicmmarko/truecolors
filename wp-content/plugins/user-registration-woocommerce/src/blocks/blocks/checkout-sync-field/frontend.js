/**
 * External dependencies
 */
import { registerCheckoutBlock } from '@woocommerce/blocks-checkout';
/**
 * Internal dependencies
 */
import { Block } from './block';
import metadata from './block.json';
import "./style.scss"

registerCheckoutBlock( {
	metadata,
	component: Block,
} );
