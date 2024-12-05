'use client';

import ProfileCard from './components/profile-card';
import ProfileDataForm from './components/profile-data-form';
import SecurityForm from './components/security-form';

import { Accordion } from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import useUserStore from '@/hooks/store/use-user-store';

const ProfilePage = () => {
  const { user } = useUserStore((state) => state);
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <ProfileCard user={user!} />
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
              </Accordion>
            ) : (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
