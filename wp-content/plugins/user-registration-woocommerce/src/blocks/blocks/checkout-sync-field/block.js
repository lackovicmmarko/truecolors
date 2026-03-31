import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import React from "react";
import $ from "jquery";

export const Block = (props) => {
  const { formId, checkoutExtensionData, extensions, children } = props;
  const { setExtensionData } = checkoutExtensionData;
  const [formData, setFormData] = useState({});
  const [selectedValue, setSelectedValue] = useState("");

  // Set extension data for the checkout
  useEffect(() => {
    if (formData) {
      setExtensionData("urwc-checkout-sync-field", "form-data", formData);
    }
  }, [setExtensionData, formData]);

  const validationErrorId = "checkout-sync-fields-value";

  const { setValidationErrors, clearValidationError } = useDispatch(
    "wc/store/validation",
  );
  const validationError = useSelect((select) => {
    const store = select("wc/store/validation");

    return store.getValidationError(validationErrorId);
  });

  useEffect(() => {
    const checkValidation = (input) => {
      const existingErrorDiv = document.querySelectorAll(
        ".urwc-checkout-error",
      );
      existingErrorDiv.forEach((errorDiv) => {
        errorDiv.remove();
      });

      const invalid_data = {};

      // Validation check for the specific input
      if (input.name) {
        if (input.type === "checkbox") {
          const checkboxes = document.querySelectorAll(
            `input[name='${input.name}']`,
          );
          const isChecked = Array.from(checkboxes).some(
            (checkbox) => checkbox.checked,
          );

          if (!isChecked && input.required) {
            invalid_data[input.name] = "";
          }
        } else if (input.type !== "checkbox") {
          if (input.required && input.value.trim() === "") {
            invalid_data[input.name] = input.value;
          }
        }
      }

      // If there is invalid data, show the error message
      if (Object.keys(invalid_data).length > 0) {
        Object.keys(invalid_data).forEach((key) => {
          const inputField = document.querySelector(
            `.urwc-field-input[name='${key}']`,
          );
          if (inputField) {
            const errorDiv = document.createElement("div");
            errorDiv.className =
              "urwc-checkout-error wc-block-components-validation-error";
            errorDiv.textContent =
              user_registration_params.message_required_fields;

            const parentNode =
              inputField.type === "checkbox"
                ? inputField.parentNode.parentNode
                : inputField.parentNode;

            const existingErrorDiv = parentNode.querySelector(
              ".urwc-checkout-error",
            );

            if (!existingErrorDiv) {
              parentNode.appendChild(errorDiv);
            }
          }
        });
      }
    };

    const handleSubmit = (event) => {
      const existingErrorDiv = document.querySelector(".urwc-checkout-error");

      if (existingErrorDiv) {
        existingErrorDiv.remove();
      }
      const invalidFormData = {};
      const divInputs = document.querySelectorAll(
        ".ur-form-row input, .ur-form-row select, .ur-form-row textarea",
      );

      divInputs.forEach((input) => {
        const parentElement = input.closest(".ur-field-item");

        if (input.name) {
          if (input.type === "checkbox") {
            const checkboxes = document.querySelectorAll(
              `input[name='${input.name}']`,
            );
            const isChecked = Array.from(checkboxes).some(
              (checkbox) => checkbox.checked,
            );

            if (!isChecked && input.required) {
              invalidFormData[input.name] = "";
            } else {
              const selectedValues = Array.from(checkboxes)
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.value);

              if (selectedValues.length > 0) {
                formData[input.name] = parentElement.classList.contains(
                  "field-privacy_policy",
                )
                  ? selectedValues[0]
                  : selectedValues;
              }
            }
          } else if (
            input.tagName === "SELECT" &&
            input.hasAttribute("multiple")
          ) {
            if (input.required && input.selectedOptions.length === 0) {
              invalidFormData[input.name] = "";
            } else {
              const selectedValues = Array.from(input.selectedOptions).map(
                (option) => option.value,
              );

              if (selectedValues.length > 0) {
                formData[input.name] = selectedValues;
              }
            }
          } else if (
            input.type === "hidden" &&
            input.classList.contains("urfu-uploaded-file")
          ) {
            const uploadFields = document.querySelectorAll(
              ".urfu-uploaded-file",
            );

            const uploadFieldValue = Array.from(uploadFields).map(
              (uploadField) => uploadField.value,
            );

            if (input.required && 0 === uploadFieldValue.length) {
              invalidFormData[input.name] = "";
            } else {
              formData[input.name] = uploadFieldValue;
            }
          } else if (input.type !== "checkbox") {
            if (input.required && "" == input.value) {
              invalidFormData[input.name] = input.value;
            } else {
              formData[input.name] = input.value;
            }
          }
        }
      });

      if (Object.keys(invalidFormData).length > 0) {
        event.preventDefault();

        Object.keys(invalidFormData).forEach((key) => {
          const input = document.querySelector(
            `.urwc-field-input[name='${key}']`,
          );
          if (input) {
            const errorDiv = document.createElement("div");
            errorDiv.className =
              "urwc-checkout-error wc-block-components-validation-error";
            errorDiv.textContent =
              user_registration_params.message_required_fields;

            if (input.type === "checkbox") {
              const existingErrorDiv =
                input.parentNode.parentNode.querySelector(
                  ".urwc-checkout-error",
                );

              if (!existingErrorDiv) {
                input.parentNode.parentNode.appendChild(errorDiv);
              }
            } else {
              const existingErrorDiv = input.parentNode.querySelector(
                ".urwc-checkout-error",
              );

              if (!existingErrorDiv) {
                input.parentNode.appendChild(errorDiv);
              }
            }
          }

          setValidationErrors({
            [validationErrorId]: {
              message: `${key} is invalid.`,
              hidden: false,
            },
          });
        });
      } else {
        clearValidationError(validationErrorId);
        setFormData(formData);
      }
    };
    const accountDetailsDiv = document.querySelector(
      ".urwc-sync-checkout-fields",
    );

    if (accountDetailsDiv) {
      accountDetailsDiv.style.display = "none";
    }

    setTimeout(() => {
      const formButton = document.querySelector(
        ".wc-block-components-checkout-place-order-button",
      );
      const form = document.querySelector(".wc-block-checkout__form");

      const createAccountCheckbox = document.querySelector(
        ".wc-block-checkout__create-account input",
      );

      $(
        ".ur-field-item.field-select2 select, .ur-field-item.field-multi_select2 select, select.ur-field-profile-select2",
      ).selectWoo();

      $(".ur-smart-phone-field").trigger("urwc_sync_blocks");

      createAccountCheckbox.addEventListener("change", function () {
        if (this.checked && accountDetailsDiv) {
          accountDetailsDiv.style.display = "block";
        } else {
          if (accountDetailsDiv) {
            accountDetailsDiv.style.display = "none";
          }
        }
      });

      if (form) {
        const divInputs = document.querySelectorAll(
          ".ur-form-row input, .ur-form-row select, .ur-form-row textarea",
        );

        divInputs.forEach((input) => {
          input.addEventListener("keyup", () => checkValidation(input));
          input.addEventListener("change", () => checkValidation(input));
        });
      }

      if (formButton) {
        formButton.addEventListener("click", handleSubmit);
      }

      return () => {
        if (formButton) {
          formButton.removeEventListener("click", handleSubmit);
        }

        if (form) {
          const divInputs = document.querySelectorAll(
            ".ur-form-row input, .ur-form-row select, .ur-form-row textarea",
          );

          divInputs.forEach((input) => {
            input.addEventListener("keyup", () => checkValidation(input));
            input.addEventListener("change", () => checkValidation(input));
          });
        }
      };
    }, 1000);
  }, [clearValidationError]);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const renderChildrenWithSelectHandling = (children) => {
    return React.Children.map(children, (child) => {
      if (child && child.props && child.props.children) {
        if (child.type === "select") {
          return React.cloneElement(child, {
            // value: selectedValue,
            // onChange: handleSelectChange,
            children: React.Children.map(child.props.children, (option) => {
              if (option.type === "option") {
                return React.cloneElement(option, {
                  value: option.props.defaultValue,
                });
              }
              return option;
            }),
          });
        }

        return React.cloneElement(child, {
          children: renderChildrenWithSelectHandling(child.props.children),
        });
      }
      return child;
    });
  };

  return (
    <div
      className="urwc-sync-checkout-fields user-registration ur-frontend-form urwc-form"
      data-form-id={formId}
    >
      {renderChildrenWithSelectHandling(children)}
    </div>
  );
};
