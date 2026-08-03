import { PageWrapper } from '@/components/Reusable';
// import { useRouter } from 'expo-router';
import Profile from './Profile';
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
