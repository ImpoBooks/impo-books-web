'use client';

import { Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ProfileDataForm from './components/profile-data-form';
import ProfileDialog from './components/profile-dialog';
import PurchaseHistory from './components/purchase-history';
import SecurityForm from './components/security-form';

import { Accordion } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { profileActionButtons } from '@/constants/profile-action-buttons';
import { ProfileDialogs } from '@/constants/profile-dialogs';
import Routes from '@/constants/routes';
import useUserStore from '@/hooks/store/use-user-store';
import { getNameAbbreviation } from '@/utils/user-utils';

const ProfilePage = () => {
  const { replace } = useRouter();
  const { user } = useUserStore((state) => state);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const nameAbbreviation = getNameAbbreviation(user?.name || '');
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
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

        <Card className="w-full lg:w-2/3">
          <CardHeader>
            <CardTitle>Налаштування профілю</CardTitle>
            <CardDescription>
              Керуйте своїми особистими даними та переглядайте історію покупок
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user ? (
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="personal-info"
              >
                <ProfileDataForm user={user} />
                <SecurityForm />
                <PurchaseHistory />
              </Accordion>
            ) : (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

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
            await dialog.handle();
            setActiveDialog(null);
            replace(Routes.CATALOG);
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }}
        />
      ))}
    </div>
  );
};

export default ProfilePage;
