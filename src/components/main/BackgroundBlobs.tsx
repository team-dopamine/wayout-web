export default function BackgroundBlobs() {
  return (
    <>
      {/* 상단 왼쪽 파란색 Blob */}
      <div className="absolute left-[10%] top-[10%] -z-10 h-[500px] w-[500px] animate-pulse rounded-full bg-blue-400/5 blur-[100px] dark:bg-blue-500/10" />
      {/* 하단 오른쪽 보라색 Blob */}
      <div
        className="absolute bottom-[10%] right-[10%] -z-10 h-[500px] w-[500px] animate-pulse rounded-full bg-purple-400/5 blur-[100px] dark:bg-purple-500/10"
        style={{ animationDelay: '1s' }}
      />
    </>
  );
}
