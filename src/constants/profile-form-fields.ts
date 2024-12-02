type ProfileFormField = {
  id: string;
  label: string;
  name: 'name' | 'email' | 'phone'; // Explicitly define allowed field names
  type: string;
  required: boolean;
};

export const profileFormFields: ProfileFormField[] = [
  { id: 'name', label: "Ім'я", name: 'name', type: 'text', required: true },
  {
    id: 'email',
    label: 'Електронна пошта',
    name: 'email',
    type: 'email',
    required: true,
  },
];
