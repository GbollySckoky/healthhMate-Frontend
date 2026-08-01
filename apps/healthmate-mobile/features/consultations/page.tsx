"use client";

import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { patientService } from "@/service/patientService";
import { Wrapper } from "@/components/Reusable";
import SearchInput from "@/components/SearchInput";
import Consultation from "./_components/Consultation";
import TopRated from "./_components/TopRated";

const filtersData = [
  "General",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
];

const ConsultationPage = () => {
  const [searchInput, setSearchInput] =
    useState("");
  const [searchDebounceQuery, setSearchDebounceQuery] =
    useState("");

  const page = 1;
  const limit = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounceQuery(
        searchInput.trim()
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const hospitalSearchQuery =
    searchDebounceQuery || undefined;

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "getAllHospitals",
      page,
      limit,
      hospitalSearchQuery,
    ],
    queryFn: () =>
      patientService.getHospitals(
        page,
        limit,
        hospitalSearchQuery
      ),
  });

  return (
    <Wrapper>
      {/* Search */}
      <div className="mb-3 flex items-center">
        <SearchInput
          placeholder="Search for a doctor, specialty, or hospital..."
          value={searchInput}
          onChange={setSearchInput}
        />

        <button
          type="button"
          className="ml-3 rounded-md border border-gray-300 p-2 hover:bg-gray-50"
        >
          <Filter size={20} />
        </button>
      </div>

      <div className="mb-3 flex gap-3">
        {filtersData.map((filter) => (
          <button
            key={filter}
            type="button"
            className="rounded-md bg-white px-4 py-2 text-sm text-gray-800 shadow-sm border border-gray-200 hover:bg-gray-50"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Hospital List */}
      <Consultation
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        searchQuery={searchDebounceQuery}
      />

      {/* Top Rated */}
      <TopRated />
    </Wrapper>
  );
};

export default ConsultationPage;
