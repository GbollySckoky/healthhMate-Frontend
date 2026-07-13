"use client";

import { CloudUpload, Search, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";
import image from "@/assets/Image.png";
import Image from "next/image";
import { Button, TableTitle } from "@/lib/components/ui/Reusable";
import Input from "@/lib/components/Inputs/Input";
import { useState } from "react";
import Paginate from "@/lib/components/ui/paginate";
import { useRouter } from "next/navigation";
import Calendar from "@/lib/components/calendar/Calendar";
import DeleteModal from "../../settings/_components/DeleteModal";
import AddNewDoctor from "./AddNewDoctor";
import { useQuery } from "@tanstack/react-query";
import { Hospital_Admin } from "@/lib/service/service";
import DoctorTableSkeleton from "@/components/ui/DoctorPageSkeleton";
import { useModal } from "@/components/Modal/Modal";

const All = () => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const { openModal } = useModal();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getAllDoctor"],
    queryFn: () => Hospital_Admin.getAllDoctor(),
  });

  const doctors = data?.data ?? [];

  const filteredDoctors = doctors.filter((doctor: any) => {
    const search = searchInput.toLowerCase();

    const fullName = `${doctor.firstName || ""} ${doctor.lastName || ""}`.toLowerCase();

    return (
      fullName.includes(search) ||
      doctor.email?.toLowerCase().includes(search) ||
      doctor.phoneNumber?.toLowerCase().includes(search) ||
      doctor.profile?.specialization?.toLowerCase().includes(search)
    );
  });

  const handleAppointmentClick = (doctorId: string | number) => {
    router.push(`/doctors/${doctorId}`);
  };

  const handleAddDoctorClick = () => {
    openModal(<AddNewDoctor />, {
      title: "Add New Doctor",
      className: "max-w-lg",
      onClose: () => {},
    });
  };

  const handleDeactivateClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    openModal(
      <DeleteModal text="Are you sure you want to deactivate this doctor? They won't be able to access their dashboard or consult patients." />,
      {
        title: "Deactivate this Doctor?",
        className: "max-w-lg",
        onClose: () => {},
        // confirmDelete() {},
      }
    );
  };

  return (
    <div className="w-full rounded-lg border border-borderColor bg-white">
      <div className="flex items-center justify-between border-b border-borderColor100 p-4">
        <TableTitle>All Doctors</TableTitle>

        <div className="flex items-center space-x-3">
          <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-borderColor100 px-3 py-2 transition-colors hover:bg-gray-50">
            <CloudUpload size={15} />
            <p className="font-inter text-[14px] font-medium text-[#414651]">
              Export
            </p>
          </button>

          <Button onClick={handleAddDoctorClick}>Add Doctor</Button>
        </div>
      </div>

      <div className="my-4 flex space-x-3 px-4">
        <Input
          value={searchInput}
          placeholder="Search by name, specialty"
          onChange={(e) => setSearchInput(e.target.value)}
          icon={<Search size={17} color="#C11574" />}
        />

        <Calendar />
      </div>

      <Table>
        <TableHeader className="border-t border-borderColor text-grey-20">
          <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium">
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>License Number</TableHead>
            <TableHead>Consultation Fee</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <DoctorTableSkeleton />
        ) : (
          <TableBody>
            {isError ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-8 text-center text-sm text-red-600"
                >
                  {error?.message || "Something went wrong"}
                </TableCell>
              </TableRow>
            ) : filteredDoctors.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-8 text-center text-sm text-gray-500"
                >
                  No doctor found
                </TableCell>
              </TableRow>
            ) : (
              filteredDoctors.map((doctor: any) => (
                <TableRow
                  key={doctor.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleAppointmentClick(doctor.id)}
                >
                  <TableCell className="font-inter text-[14px] font-normal text-grey-30">
                    <div className="flex items-center">
                      <Image
                        src={image}
                        alt="Doctor"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />

                      <div className="ml-2">
                        <p className="font-inter text-[12px] font-normal text-grey-20">
                          {`${doctor.firstName || ""} ${
                            doctor.lastName || ""
                          }`.trim() || "-"}
                        </p>

                        <p className="font-inter text-[12px] font-normal text-grey-20">
                          {doctor.hospital?.hospitalName || "-"}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="font-inter text-[12px] font-normal text-grey-20">
                    {doctor.email || "-"}
                  </TableCell>

                  <TableCell className="font-inter text-[12px] font-normal text-grey-20">
                    {doctor.phoneNumber || "-"}
                  </TableCell>

                  <TableCell className="font-inter text-[14px] font-normal text-grey-20">
                    {doctor.gender || "-"}
                  </TableCell>

                  <TableCell className="font-inter text-[12px] font-normal text-grey-20">
                    {doctor.profile?.specialization || "-"}
                  </TableCell>

                  <TableCell className="font-inter text-[12px] font-normal text-grey-20">
                    {doctor.profile?.licenseNumber || "-"}
                  </TableCell>

                  <TableCell className="font-inter text-[12px] font-normal text-grey-20">
                    {doctor.profile?.consultationFee
                      ? `₦${doctor.profile.consultationFee.toLocaleString()}`
                      : "-"}
                  </TableCell>

                  <TableCell>
                    <button type="button" onClick={handleDeactivateClick}>
                      <Trash2 color="#F04438" size={15} />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        )}
      </Table>

      <Paginate />
    </div>
  );
};

export default All;