"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { adminQueryKeys } from "../constant/query-keys";
import { Hospital_Admin } from "../service/service";

const useGetDoctor = () => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    total: 0,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: adminQueryKeys.doctors(
      debouncedSearch,
      pagination.page,
      pagination.limit,
    ),
    queryFn: () =>
      Hospital_Admin.getAllDoctor(
        debouncedSearch,
        pagination.page,
        pagination.limit,
      ),
  });

  useEffect(() => {
    if (data?.meta) {
      setPagination((prev) => ({
        ...prev,
        total: data.meta.total,
        totalPages: data.meta.totalPages,
      }));
    }
  }, [data]);

  const doctors = data?.data ?? [];
  return {
    pagination,
    doctors,
    isLoading,
    isError,
    error,
    setPagination,
    searchInput,
    setSearchInput,
  };
};

export default useGetDoctor;
