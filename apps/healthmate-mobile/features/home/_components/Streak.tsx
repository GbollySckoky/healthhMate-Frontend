import Image from "next/image";
import { SubTitle } from "@/components/Reusable";
import streakImage from "@/assets/Group 19153.png";

export default function Streak() {
  return (
    <div className="p-[15px] border border-[#BAAEED] rounded-[10px] bg-[#F4ECFF] mb-[10px] mt-[25px] relative overflow-hidden min-h-[100px]">
      <SubTitle>3 days Streak!</SubTitle>
      <SubTitle>Consistency is key – you&apos;re doing great!</SubTitle>
      <p className="font-inter text-xs text-[#414651] font-normal mt-[3px] mb-0">Every log brings you closer to better health.</p>
      <Image src={streakImage} alt="" className="absolute right-0 top-0 w-[100px] h-[100px] object-contain" priority={false} />
    </div>
  );
}
