"use client";
import { ReportTracker } from "@/components/report/ReportTracker";

export default function TrackReportPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] pb-5 items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-5xl z-40">
          <ReportTracker />
        </div>
      </div>
    </div>
  );
}
