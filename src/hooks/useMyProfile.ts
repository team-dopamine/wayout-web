import { useState, useEffect, useCallback, useMemo } from 'react';
import { getMyProfile, updateMyNickname } from '@/apis/members/members';
import { getMySolutionsApi } from '@/apis/solutions/solutions';
import { withdraw } from '@/apis/auth/withdraw';
import { toContribution, toSubmission } from '@/utils/profile';
import { validateNickname, MAX_LENGTH } from '@/constants/nickname';
import { type TabKey } from '@/components/profile/ContributionsSection';
import { getMySubmissions } from '@/apis/submissions/submissions';

export function useMyProfile() {
  const [pageState, setPageState] = useState<{
    data: any | null;
    isLoading: boolean;
    error: string | null;
  }>({ data: null, isLoading: true, error: null });

  const [nickname, setNickname] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('contributions');
  const [isSaving, setIsSaving] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = useCallback((type: 'success' | 'error', text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    const fetchAll = async () => {
      try {
        const [profileRes, solRes, subRes] = await Promise.all([
          getMyProfile(),
          getMySolutionsApi({ page: 0, size: 100, sort: ['createdAt,DESC'] }),
          getMySubmissions({ page: 0, size: 100, sort: ['createdAt,DESC'] }),
        ]);

        if (!isCancelled) {
          setPageState({
            data: {
              profile: { nickname: profileRes.nickname, email: profileRes.email },
              contributions: {
                solutions: solRes.content.map(toContribution),
                submissions: subRes.content.map(toSubmission),
              },
            },
            isLoading: false,
            error: null,
          });
          setNickname(profileRes.nickname);
        }
      } catch {
        if (!isCancelled) {
          setPageState((prev) => ({
            ...prev,
            isLoading: false,
            error: '데이터를 불러오지 못했습니다.',
          }));
        }
      }
    };
    fetchAll();
    return () => {
      isCancelled = true;
    };
  }, []);

  const displayContributions = useMemo(() => {
    const conts = pageState.data?.contributions;
    if (!conts) return [];
    return activeTab === 'contributions' ? conts.solutions : conts.submissions;
  }, [activeTab, pageState.data?.contributions]);

  const handleSaveNickname = useCallback(async () => {
    const trimmed = nickname.trim();
    if (!validateNickname(trimmed)) {
      showToast('error', `영문, 숫자만 ${MAX_LENGTH}자 이내로 입력해주세요.`);
      return;
    }
    try {
      setIsSaving(true);
      await updateMyNickname({ nickname: trimmed });
      setPageState((prev) =>
        prev.data
          ? {
              ...prev,
              data: { ...prev.data, profile: { ...prev.data.profile, nickname: trimmed } },
            }
          : prev,
      );
      showToast('success', '닉네임이 성공적으로 변경되었습니다.');
    } catch {
      showToast('error', '닉네임 변경에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  }, [nickname, showToast]);

  const handleWithdraw = useCallback(async () => {
    if (!window.confirm('정말로 탈퇴하시겠습니까?')) return;
    try {
      setIsWithdrawing(true);
      await withdraw();
      window.location.replace('/');
    } catch {
      setIsWithdrawing(false);
      showToast('error', '탈퇴 처리에 실패했습니다.');
    }
  }, [showToast]);

  return {
    pageState,
    nickname,
    setNickname,
    activeTab,
    setActiveTab,
    displayContributions,
    isSaving,
    isWithdrawing,
    toast,
    handleSaveNickname,
    handleWithdraw,
  };
}
