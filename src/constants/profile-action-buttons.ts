import { LogOut, UserX } from 'lucide-react';

export const profileActionButtons = [
  {
    id: 'logout',
    label: 'Вийти',
    icon: LogOut,
    variant: 'outline' as const,
  },
  {
    id: 'delete',
    label: 'Видалити акаунт',
    icon: UserX,
    variant: 'destructive' as const,
  },
];
