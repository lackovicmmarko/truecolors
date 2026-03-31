/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { Edit } from "./edit";
import { Save } from "./save";
import metadata from "./block.json";
import RegistrationForm from "./icon";

export const checkoutSyncFieldSettings = {
  metadata,
  setting: {
    icon: <RegistrationForm />,
    edit: Edit,
    save: Save,
  },
};
