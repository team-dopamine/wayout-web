export default function ProblemHeader() {
  return (
    <thead className="bg-[#fcfcfd]">
      <tr className="border-b border-gray-200">
        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
          문제 번호
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
          제목
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
          총 반례 찾기 횟수
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
          반례 찾은 횟수
        </th>
      </tr>
    </thead>
  );
}
