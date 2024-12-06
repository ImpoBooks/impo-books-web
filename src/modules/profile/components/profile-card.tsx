'use client';

import { Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import ProfileDialog from './profile-dialog';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { profileActionButtons } from '@/constants/profile-action-buttons';
import { ProfileDialogs } from '@/constants/profile-dialogs';
import Routes from '@/constants/routes';
import { toast } from '@/hooks/use-toast';
import { User } from '@/types/user';
import { getNameAbbreviation } from '@/utils/user-utils';

const ProfileCard = ({ user }: { user: User }) => {
  const nameAbbreviation = getNameAbbreviation(user?.name || '');
  const { replace } = useRouter();
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  return (
    <>
      <Card className="w-full lg:w-1/3 h-fit">
        <CardHeader>
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24">
              {user ? (
                <AvatarImage />
              ) : (
                <Skeleton className="w-full h-full rounded-full" />
              )}
              <AvatarFallback>{nameAbbreviation}</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4">
              {user ? user.name : <Skeleton className="h-6 w-32" />}
            </CardTitle>
            <CardDescription className="text-center">
              <div className="flex items-center justify-center mt-2">
                <Mail className="w-4 h-4 mr-2" />
                {user ? user.email : <Skeleton className="h-4 w-40" />}
              </div>
            </CardDescription>
          </div>
        </CardHeader>
        <CardFooter className="flex flex-col gap-4">
          {profileActionButtons.map(({ id, label, icon: Icon, variant }) => (
            <Button
              key={id}
              data-testid={id}
              variant={variant}
              onClick={() => setActiveDialog(id)}
              className="w-full"
              disabled={!user}
            >
              <Icon className="mr-2 h-4 w-4" /> {label}
            </Button>
          ))}
        </CardFooter>
      </Card>

      {ProfileDialogs.map((dialog) => (
        <ProfileDialog
          key={dialog.id}
          open={activeDialog === dialog.id}
          onOpenChange={(open) => setActiveDialog(open ? dialog.id : null)}
          title={dialog.title}
          description={dialog.description}
          confirmLabel={dialog.confirmLabel}
          confirmVariant={dialog.confirmVariant}
          onConfirm={async () => {
            const result = await dialog.handle();
            if (!result.success) {
              toast({
                title: 'Помилка',
                description: 'Щось пішло не так. Спробуйте ще раз.',
                variant: 'destructive',
              });
            } else {
              replace(Routes.CATALOG);
              setTimeout(() => {
                window.location.reload();
              }, 200);
            }
            setActiveDialog(null);
          }}
        />
      ))}
    </>
  );
};

export default ProfileCard;
