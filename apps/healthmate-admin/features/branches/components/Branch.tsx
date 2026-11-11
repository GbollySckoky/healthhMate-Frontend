"use client";

// import MinSelectField from "@/components/inputs/FilterSelect";
import Input from "@/components/inputs/Input";
import {
  Button,
  FlexWrapper,
  PageWrapper,
  TableTitle,
} from "@/components/ui/DetailPrimitives";
import React, { useState } from "react";
import { Search } from "lucide-react";
import BranchTable from "@/features/branches/components/BranchTable";
// import useToggle from "@/lib/hooks/useToggle";
import AddNewBranch from "@/features/branches/components/AddNewBranch";
import AssignBranch from "@/features/branches/components/AssignBranch";
import { useModal } from "@/components/modal/Modal";

const Branch = () => {
  const [inputValue, setInputValue] = useState("");
  // const [selectValue, setSelectValue] = useState<string | undefined>();

  // const { isToggle, handleToggle } = useToggle();
  const { openModal } = useModal();

  // const handleSelect = (option: string | undefined) => {
  //   setSelectValue(option);
  //   handleToggle();
  // };

  // const allStatus = {
  //   label: "Status",
  //   options: ["Active", "Inactive", "Open"],
  // };

  return (
    <PageWrapper>
      <FlexWrapper>
        <div className="w-full rounded-lg border border-borderColor bg-white">
          <div className="flex items-center justify-between border-b border-borderColor100 p-4">
            <TableTitle>All Branches</TableTitle>

            <div className="flex items-center gap-3">
              <Button
                onClick={() =>
                  openModal(<AddNewBranch />, {
                    title: "Create Branch",
                    className: "max-w-lg",
                    onClose: () => {},
                  })
                }
              >
                Add New Branch
              </Button>

              <Button
                onClick={() =>
                  openModal(<AssignBranch />, {
                    title: "Assign Branch To Doctor",
                    className: "max-w-lg",
                    onClose: () => {},
                  })
                }
              >
                Assign Branch
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-4">
            <Input
              value={inputValue}
              placeholder="Search by branch name"
              onChange={(e) => setInputValue(e.target.value)}
              icon={<Search size={17} color="#C11574" />}
            />

            {/* <MinSelectField
              {...allStatus}
              value={selectValue}
              show={isToggle}
              onSelect={handleSelect}
              onClick={handleToggle}
              className="w-fit"
            /> */}
          </div>

          <div className="p-4">
            <BranchTable searchQuery={inputValue}  />
          </div>
        </div>
      </FlexWrapper>
    </PageWrapper>
  );
};

export default Branch;