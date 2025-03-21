"use client"

import { useState, useEffect } from "react"
import { Clipboard, Check } from "lucide-react"

interface ReportSubmittedProps {
  data: any
  onComplete?: (data: any) => void
}

export function ReportSubmitted({ data, onComplete }: ReportSubmittedProps) {
  const reportId = data?.reportId || "ERROR-ID-NOT-FOUND"
  const [copied, setCopied] = useState(false)
  const [animationState, setAnimationState] = useState<"loading" | "success">("loading")

  const handleCopy = () => {
    navigator.clipboard.writeText(reportId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    // Toggle between loading and success states
    const interval = setInterval(() => {
      setAnimationState((prev) => (prev === "loading" ? "success" : "loading"))
    }, 2000) // Switch every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center space-y-6">
      <div className="flex flex-col items-center">
        <div className="relative bg-green-500/10 rounded-full p-3 w-24 h-24 flex items-center justify-center">
          {/* Circular loading animation */}
          <svg
            className={`absolute w-16 h-16 ${animationState === "loading" ? "opacity-100" : "opacity-0"}`}
            viewBox="0 0 50 50"
            style={{ transition: "opacity 0.5s ease" }}
          >
            <circle
              className="text-green-500"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="125"
              strokeDashoffset="125"
              style={{
                animation: "dash 1.5s ease-in-out infinite",
                transformOrigin: "center",
              }}
            />
          </svg>

          {/* Checkmark that appears after loading */}
          <svg
            className={`absolute w-16 h-16 text-green-500 ${animationState === "success" ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
              style={{
                strokeDasharray: 30,
                strokeDashoffset: animationState === "success" ? 0 : 30,
                transition: "stroke-dashoffset 0.5s ease-in-out",
              }}
            />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-medium text-white">Report Successfully Submitted</h3>
        <p className="mt-2 text-sm text-zinc-400">Your report has been securely transmitted to law enforcement</p>
      </div>

      <div className="bg-zinc-800/50 rounded-lg p-6 max-w-md mx-auto">
        <h4 className="text-white font-medium mb-2">Your Report ID</h4>
        <div className="bg-zinc-900 rounded p-3 flex justify-center gap-2 items-center">
          <code className="text-sky-400">{reportId}</code>
          <button onClick={handleCopy} className="relative group p-2 rounded-lg hover:bg-zinc-700 transition">
            {copied ? (
              <Check size={18} className="text-green-400" />
            ) : (
              <Clipboard size={18} className="text-zinc-400" />
            )}
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              {copied ? "Copied!" : "Copy"}
            </span>
          </button>
        </div>
        <p className="mt-2 text-sm text-zinc-400">
          Save this ID to check your report status or communicate securely with law enforcement
        </p>
      </div>

      <div className="pt-4">
        <button
          onClick={() => (window.location.href = "/")}
          className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400"
        >
          Return to Home
        </button>
      </div>

      <style jsx global>{`
        @keyframes dash {
          0% {
            stroke-dashoffset: 125;
            transform: rotate(0deg);
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 125;
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

