import { ReactNode } from "react";

export const PageWrapper = ({children}:{children: ReactNode}) => {
    return( 
        <div className="pt-[80px] w-[95%] mx-auto">
            {children}
        </div>
    )
} 

export const Title = ({children}:{children: ReactNode}) => {
    return( 
        <p className="font-lato text-black font-semibold text-[28px]">
            {children}
        </p>
    )
} 

export const Text = ({children}:{children: ReactNode}) => {
    return( 
        <p className="font-libre text-grey-600 font-normal text-[16px]">
            {children}
        </p>
    )
} 

export const Card = ({children}:{children: ReactNode}) => {
    return( 
        <div className="bg-white rounded-lg p-4 w-full border border-borderColor ">
            {children}
        </div>
    )
} 

export const SmallText = ({children}:{children: ReactNode}) => {
    return( 
        <p className="font-inter text-grey-600 font-normal text-[11.74px]">
            {children}
        </p>
    )
} 

export const SmallTitle = ({children}:{children: ReactNode}) => {
    return( 
        <p className="font-inter text-grey-700 font-semibold text-[15.65px]">
            {children}
        </p>
    )
} 

export const MediumTitle = ({children}:{children: ReactNode}) => {
    return( 
        <h5 className="font-libre text-grey-800 font-semibold text-[16px]">
            {children}
        </h5>
    )
} 

export const MediumText = ({children}:{children: ReactNode}) => {
    return( 
        <h5 className="font-lato text-grey-200 font-normal text-[14px]">
            {children}
        </h5>
    )
} 

export const Value = ({children}:{children: ReactNode}) => {
    return( 
        <h5 className="font-libre text-grey-200 font-bold text-[20px]">
            {children}
        </h5>
    )
} 

export const SmallestText = ({children}:{children: ReactNode}) => {
    return( 
        <p className="font-libre text-grey-500 font-normal text-[12px]">
            {children}
        </p>
    )
} 

export const SmallestTexts = ({children}:{children: ReactNode}) => {
    return( 
        <p className="font-libre text-grey-100 font-normal text-[12px]">
            {children}
        </p>
    )
} 

export const DisplayFlex = ({children}:{children: ReactNode}) => {
    return( 
        <p className="flex items-center justify-between">
            {children}
        </p>
    )
} 