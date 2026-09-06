export interface BloodPressure{
    systolic: string;
    diastolic: string;
    recordedAt: string;
    pulseRate: string;
}


export type SkeletonBoxProps = {
  width: number | string;
  height: number;
  borderRadius?: number;
  className?: string;
};