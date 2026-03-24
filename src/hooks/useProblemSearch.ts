import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProblemSearch } from '@/apis/problems/problems';
import type { ProblemSearch } from '@/apis/problems/problems.type';

export default function useProblemSearch() {
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<ProblemSearch[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 검색 실행 가능 여부 판단
  const isValidKeyword = (keyword: string) => {
    const trimmed = keyword.trim();
    if (!trimmed) return false;
    const isNumber = /^\d+$/.test(trimmed);
    return isNumber || trimmed.length >= 2;
  };

  useEffect(() => {
    const trimmed = searchKeyword.trim();

    // 유효하지 않은 키워드 처리
    if (!isValidKeyword(trimmed)) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    let isCurrentRequest = true;

    setIsSearching(true);

    const timer = setTimeout(async () => {
      try {
        const data = await getProblemSearch(trimmed);

        if (isCurrentRequest) {
          setSearchResults(data);
        }
      } catch (error) {
        if (isCurrentRequest) {
          console.error('문제 검색 실패:', error);
          setSearchResults([]);
        }
      } finally {
        if (isCurrentRequest) {
          setIsSearching(false);
        }
      }
    }, 300);

    return () => {
      isCurrentRequest = false;
      clearTimeout(timer);
    };
  }, [searchKeyword]);

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSelectSearchResult = useCallback(
    (selectedProblem: ProblemSearch) => {
      setSearchKeyword('');
      setSearchResults([]);
      navigate(`/problems/${selectedProblem.platform}/${selectedProblem.problemNo}`);
    },
    [navigate],
  );

  const handleResetKeyword = useCallback(() => {
    setSearchKeyword('');
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  return {
    searchKeyword,
    searchResults,
    isSearching,
    handleChangeKeyword,
    handleSelectSearchResult,
    handleResetKeyword,
  };
}
