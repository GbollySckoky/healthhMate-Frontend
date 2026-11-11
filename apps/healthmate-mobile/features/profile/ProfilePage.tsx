import { PageWrapper } from '@/components/ui/Primitives';
// import { useRouter } from 'expo-router';
import Profile from '@/features/profile/components/Profile';
// import SafeArea from '@/components/safeAreaView/SafeAreaView';

const ProfilePage = () => {
  // const router = useRouter();
  return (
    <PageWrapper>
      <Profile />
    </PageWrapper>
  );
};

export default ProfilePage;
