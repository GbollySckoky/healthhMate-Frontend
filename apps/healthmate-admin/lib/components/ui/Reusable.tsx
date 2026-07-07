import { ReactNode } from "react";
import { Plus } from 'lucide-react';
import { CloudUpload } from 'lucide-react';


export const PageWrapper = ({children,className}:{children: ReactNode, className?:string}) => {
    return( 
        <div className={`flex min-h-screen bg-[#FAFAFA] mt-[65px] ${className}`}>
            {children}
        </div>
    )
} 

export const FlexWrapper = ({children,className}:{children: ReactNode, className?:string}) => {
    return( 
        <div className={`flex-1 p-8 ${className}`}>
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

export const Card = ({children, className}:{children: ReactNode, className?: string}) => {
    return( 
        <div className={`bg-white rounded-lg p-4 w-full border border-borderColor ${className}`}>
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
        <div className="flex items-center justify-between gap-5">
            {children}
        </div>
    )
} 

export const MinBar = ({className}:{className: string}) => {
    return( 
        <div className={`h-1 w-7 rounded-lg ${className}`} />
    )
} 

export const SmallestTitle = ({children}:{children: ReactNode}) => {
    return( 
        <p className="font-libre text-grey-900 font-medium text-[14px]">
            {children}
        </p>
    )
} 

export const MinText = ({children, className}:{children: ReactNode, className: string}) => {
    return( 
        <p className={`font-libre font-normal text-[14px] ${className}`}>
            {children}
        </p>
    )
} 

export const TableTitle = ({children, className}:{children: ReactNode, className?: string}) => {
    return( 
        <p className={`font-inter font-medium text-grey-30 text-[18px] ${className}`}>
            {children}
        </p>
    )
}

export const MinTexts = ({children, className}:{children: ReactNode, className?: string}) => {
    return( 
        <p className={`font-inter text-[#535862] font-normal text-[12px] ${className}`}>
            {children}
        </p>
    )
} 

export const CardTitle = ({children, className}:{children: ReactNode, className?: string}) => {
    return( 
        <p className={`font-inter font-medium text-[#211F1F] text-[20px] ${className}`}>
            {children}
        </p>
    )
}

export const CardText = ({children, className}:{children: ReactNode, className?: string}) => {
    return( 
        <p className={`font-lato font-medium text-grey-20 text-[16px] ${className}`}>
            {children}
        </p>
    )
}

export const Button = ({children, className, onClick}:{children: ReactNode, className?: string, onClick: () => void}) => {
    return( 
        <div className={`font-lato cursor-pointer px-4 font-medium text-white text-[16px] p-2 rounded-lg flex items-center bg-pink-600 ${className}`} onClick={onClick}>
            <span> <Plus color="white" size={18} /> </span>
            <p className="font-inter font-semibold text-[14px] ml-1">
                {children}
            </p>
        </div>
    )
}

export const UploadButton = ({text, onClick, className}:{text: ReactNode, onClick?: () => void, className?: string}) => {
    return(
        <div className={`flex bg-white border border-borderColor100 text-white items-center cursor-pointer p-3 rounded-lg ${className}`}>
        <span> <CloudUpload size={15} /></span>
        <p className='ml-2 font-semibold text-[14px] font-inter'>{text}</p>
    </div>
    )
}

export const Info = ({label, amount}:{label:string, amount: string}) => {
    return(
        <div className='flex items-center justify-between space-y-1'>
            <p className='text-[#535862] text-[16px] font-lato font-normal'>{label}</p>
            <p className='font-lato text-[18px] font-medium'>{amount}</p>
        </div>
    )
}

export const Infos = ({label, value}:{label:string, value: string}) => {
    return(
        <div className='flex items-center justify-between space-y-1'>
            <p className='text-[#535862] text-[16px] font-lato font-normal'>{label}</p>
            <p className='font-lato text-[18px] font-medium text-[#181D27]'>{value}</p>
        </div>
    )
}

export const NoteCard = ({label, value, className}:{label:string, value: string, className?: string}) => {
    return(
        <div className={`border border-borderColor rounded-lg p-3 bg-white ${className}` }>
            <p className='text-[#535862] text-[16px] font-lato font-normal'>{label}</p>
            <p className='font-lato text-[18px] font-medium text-grey-30 mt-3'>{value}</p>
        </div>
    )
}

export const StatusInfo = ({label, value}:{label:string, value: string}) => {
    return(
        <div className='flex items-center justify-between space-y-1'>
            <p className='text-[#535862] text-[16px] font-lato font-normal'>{label}</p>
            <p className='font-lato text-[14px] font-medium bg-green-100 text-green-900 rounded-full px-5 h-fit'>{value}</p>
        </div>
    )
}