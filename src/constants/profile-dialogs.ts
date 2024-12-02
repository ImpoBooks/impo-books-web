export const ProfileDialogs = [
  {
    id: 'logout',
    title: 'Підтвердження виходу',
    description: 'Ви впевнені, що хочете вийти з облікового запису?',
    confirmLabel: 'Вийти',
    confirmVariant: 'default' as const,
  },
  {
    id: 'delete',
    title: 'Підтвердження видалення',
    description:
      'Ви впевнені, що хочете видалити свій обліковий запис? Ця дія є незворотною.',
    confirmLabel: 'Видалити',
    confirmVariant: 'destructive' as const,
  },
];
