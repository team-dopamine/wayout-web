import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProblemSearch } from '@/apis/problems/problems';
import type { ProblemSearch } from '@/apis/problems/problems.type';

export default function useProblemSearch() {
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<ProblemSearch[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const trimmedKeyword = searchKeyword.trim();

    if (!trimmedKeyword) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const isNumberKeyword = /^\d+$/.test(trimmedKeyword);

    // 문자열 검색은 최소 2글자 이상일 때만 수행 (숫자 검색은 예외)
    if (!isNumberKeyword && trimmedKeyword.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // 디바운싱: 마지막 입력 후 0.3초 뒤에 API 호출
    const timer = setTimeout(async () => {
      try {
        setIsSearching(true);
        const data = await getProblemSearch(trimmedKeyword);
        setSearchResults(data);
      } catch (error) {
        console.error('문제 검색 실패:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchKeyword]);

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSelectSearchResult = (selectedProblem: ProblemSearch) => {
    setSearchKeyword('');
    setSearchResults([]);
    navigate(`/problems/${selectedProblem.platform}/${selectedProblem.problemNo}`);
  };

  const handleResetKeyword = () => {
    setSearchKeyword('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return {
    searchKeyword,
    searchResults,
    isSearching,
    handleChangeKeyword,
    handleSelectSearchResult,
    handleResetKeyword,
  };
}
