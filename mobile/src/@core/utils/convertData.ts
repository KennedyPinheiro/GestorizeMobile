export const convertObjectToFormData = (
  data: Record<string, any>,
): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, item as any);
      });
    } else {
      formData.append(key, value as any);
    }
  });
  return formData;
};
