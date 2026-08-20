import { patientService } from '@/service/patientService';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react'

const useGetAllHospitals = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchDebounceQuery, setSearchDebounceQuery] = useState('');
    const [page, setPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        const timer = setTimeout(() => {
          setSearchDebounceQuery(searchInput);
          setPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchInput]);

    const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getAllHospitals', page, limit, searchDebounceQuery],
    queryFn: () =>
      patientService.getHospitals(page, limit, searchDebounceQuery),
  });

  const hospitals = data?.data ?? [];
  const meta = data?.meta;
  const canGoPrevious = meta ? meta.page > 1 : page > 1;
  const canGoNext = meta ? meta.page < meta.totalPages : false;


  return { searchInput,setSearchInput,isLoading,isError, error, hospitals, canGoPrevious, canGoNext, meta, setPage }
}

export default useGetAllHospitals