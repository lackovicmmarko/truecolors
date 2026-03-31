import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import ServerSideRender from "@wordpress/server-side-render";
import React, { useState, useEffect } from "react";
import {
  SelectControl,
  PanelBody,
  CheckboxControl,
  Disabled,
  Notice,
  ExternalLink,
  Spinner,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import metadata from "./block.json";
import $ from "jquery";

const {
  urwcRestApiNonce,
  checkoutFormId,
  SyncCheckoutRegistration,
  globalSettingUrl,
} = typeof _URWC_BLOCKS_ !== "undefined" && _URWC_BLOCKS_;

export const Edit = ({ attributes, setAttributes }) => {
  const useProps = useBlockProps();
  const { formId, selectedFields } = attributes;
  const [loading, setLoading] = useState(false);

  const [formList, setFormList] = useState("");
  const [fieldList, setFieldList] = useState([]);
  const blockName = metadata.name;

  useEffect(() => {
    if (checkoutFormId) {
      setAttributes({ formId: checkoutFormId });
    }
  }, [checkoutFormId]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiFetch({
        path: `urwc/blocks/get-sync-fields-details?formId=${formId}`,
        method: "GET",
        headers: {
          "X-WP-Nonce": urwcRestApiNonce,
        },
      });

      if (res.success) {
        setFormList(res.form_lists);
        setAttributes({
          selectedFields: Object.values(res.selected_form_fields),
        });
        setFieldList(
          Object.entries(res.form_fields).map(([key, value]) => ({
            key: key,
            label: value.label,
          })),
        );
        setLoading(false);
      }
    };

    if (formId) {
      setLoading(true);
      fetchData();
    }
    setTimeout(() => {
      $(document)
        .find(
          ".ur-field-item.field-select2 select, .ur-field-item.field-multi_select2 select, select.ur-field-profile-select2",
        )
        .selectWoo();
    }, 5000);
  }, [formId]);

  const formOptions = Object.keys(formList).map((index) => ({
    value: Number(index),
    label: formList[index],
  }));

  const handleFieldChange = (value) => (isChecked) => {
    const newSelectedOptions = isChecked
      ? [...selectedFields, value]
      : selectedFields.filter((item) => item !== value);

    setAttributes({ selectedFields: newSelectedOptions });
  };

  const selectRegistrationForm = (id) => {
    setAttributes({ formId: id });
  };

  if (!SyncCheckoutRegistration) {
    return (
      <div {...useProps}>
        <Notice status="error">
          <p>
            {__("Please enable the ", "user-registration-woocommerce")}
            <ExternalLink href={globalSettingUrl}>
              {__(
                "Sync Checkout Registraiton option from settings",
                "user-registration-woocommerce",
              )}
            </ExternalLink>
          </p>
        </Notice>
      </div>
    );
  }

  return (
    <>
      <div {...useProps}>
        <InspectorControls key="urwc-checkout-sync-fields-inspector-controls">
          <PanelBody
            title={__("Checkout Sync Fields", "user-registration-woocommerce")}
          >
            <div>
              <p>
                <b>
                  {__(
                    "Select Registration Form",
                    "user-registration-woocommerce",
                  )}
                </b>
              </p>
            </div>
            <SelectControl
              key="urwc-checkout-sync-fields-registration-form"
              value={formId}
              options={[
                {
                  label: __("Select a Form", "user-registration-woocommerce"),
                  value: "",
                },
                ...formOptions,
              ]}
              onChange={selectRegistrationForm}
            />
            {loading ? (
              <Spinner />
            ) : (
              formId &&
              fieldList && (
                <div>
                  <p>
                    <b>
                      {__(
                        "Check fields to sync",
                        "user-registration-woocommerce",
                      )}
                    </b>
                  </p>
                  {fieldList.map((option) => (
                    <CheckboxControl
                      key={option.key}
                      name="selectedFields[]"
                      value={option.key}
                      label={option.label}
                      checked={selectedFields.includes(option.key)}
                      onChange={handleFieldChange(option.key)}
                    />
                  ))}
                </div>
              )
            )}
          </PanelBody>
        </InspectorControls>

        {!formId && (
          <Notice status="info">
            <p>
              {__(
                "Select a form to sync fields",
                "user-registration-woocommerce",
              )}
            </p>
          </Notice>
        )}

        {selectedFields.length === 0 && (
          <Notice status="info">
            <p>
              {__("Check form fields to sync", "user-registration-woocommerce")}
            </p>
          </Notice>
        )}

        {formId && selectedFields.length > 0 && (
          <Disabled>
            <ServerSideRender
              key="urwc-checkout-sync-fields-server-side-renderer"
              block={blockName}
              attributes={attributes}
            />
          </Disabled>
        )}
      </div>
    </>
  );
};
