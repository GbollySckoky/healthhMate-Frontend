"use client";

import MinSelectField from "@/lib/components/Inputs/MinSelectField";
import Input from "@/lib/components/Inputs/Input";
import {
  Button,
  FlexWrapper,
  PageWrapper,
  TableTitle,
} from "@/lib/components/ui/Reusable";
import React, { useState } from "react";
import { Search } from "lucide-react";
import BranchTable from "./BranchTable";
import useToggle from "@/lib/hooks/useToggle";
import AddNewBranch from "./AddNewBranch";
import AssignBranch from "./AssignBranch";
import { useModal } from "@/components/Modal/Modal";

const Branch = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState<string | undefined>();

  const { isToggle, handleToggle } = useToggle();
  const { openModal } = useModal();

  const handleSelect = (option: string | undefined) => {
    setSelectValue(option);
    handleToggle();
  };

  const allStatus = {
    label: "Status",
    options: ["Active", "Inactive", "Open"],
  };

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

            <MinSelectField
              {...allStatus}
              value={selectValue}
              show={isToggle}
              onSelect={handleSelect}
              onClick={handleToggle}
              className="w-fit"
            />
          </div>

          <div className="p-4">
            <BranchTable searchQuery={inputValue} status={selectValue} />
          </div>
        </div>
      </FlexWrapper>
    </PageWrapper>
  );
};

export default Branch;