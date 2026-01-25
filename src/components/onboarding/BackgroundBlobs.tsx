/** 온보딩 페이지 배경의 흐릿한 컬러 블롭 효과를 렌더링한다 */

export default function BackgroundBlobs() {
  return (
    <>
      {/** 상단 파란색 Blob */}
      <div className="pointer-events-none absolute left-[10%] top-[10%] z-0 h-[500px] w-[500px] animate-pulse rounded-full bg-blue-500/20 blur-[120px] dark:bg-blue-500/15" />

      {/** 하단 보라색 Blob */}
      <div
        className="pointer-events-none absolute bottom-[10%] right-[10%] z-0 h-[500px] w-[500px] animate-pulse rounded-full bg-purple-500/20 blur-[120px] dark:bg-purple-500/15"
        style={{ animationDelay: '1s' }}
      />
    </>
  );
}
