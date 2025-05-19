import type { Metadata } from "next";
import { KeylogDetail } from "@/components/keylogs/keylog-detail";

export const metadata: Metadata = {
  title: "Keylog Details | Network Monitoring",
  description: "Detailed view of keylog entry",
};

export default function KeylogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Keylog Details</h2>
      </div>
      <div className="grid gap-4">
        <KeylogDetail id={params.id} />
      </div>
    </div>
  );
}
