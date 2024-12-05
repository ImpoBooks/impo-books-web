import { ProfileData } from '@/modules/profile/constants';

type ProfileFormField = {
  id: keyof ProfileData;
  label: string;
  name: string;
  type: string;
  required: boolean;
};

export const profileFormFields: ProfileFormField[] = [
  {
    id: 'name',
    label: "Ім'я",
    name: 'name',
    type: 'text',
    required: true,
  },
];
