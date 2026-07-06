import { Card } from "./Reusable";

const PatientCardSkeleton = () => {
  return (
    <Card className="flex animate-pulse">
      <div className="h-[50px] w-[50px] rounded-full bg-gray-200" />

      <div className="ml-3 flex-1 space-y-2">
        <div className="h-5 w-40 rounded bg-gray-200" />
        <div className="h-4 w-28 rounded bg-gray-100" />
        <div className="h-4 w-52 rounded bg-gray-100" />
      </div>
    </Card>
  );
};

export default PatientCardSkeleton