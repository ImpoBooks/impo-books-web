type ProfileFormField = {
  id: string;
  label: string;
  name: string;
  type: string;
  required: boolean;
};

export const profileFormFields: ProfileFormField[] = [
  { id: 'name', label: "Ім'я", name: 'name', type: 'text', required: true },
];
