import { ChangeEvent, useEffect, useMemo, useState } from "react";

type ValidatorFn = (value: any) => boolean;
type ValidationConfig = Record<string, [ValidatorFn, string?]>;

export const useForm = (
  initialForm: Record<string, any> = {},
  formValidations: ValidationConfig = {}
) => {
  const [formState, setFormState] = useState<Record<string, any>>(initialForm);
  const [formValidation, setFormValidation] = useState<
    Record<string, string | null>
  >({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] != null) return false;
    }

    return true;
  }, [formValidation]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues: Record<string, string | null> = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = "Errores de validacion"] =
        formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }
    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    ...formValidation,
    formState,
    onInputChange,
    onResetForm,
    isFormValid,
  };
};
