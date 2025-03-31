import React from 'react'
import Link from "next/link";

const HomeSection = () => {
  return (
      <div className="flex flex-col items-center text-center">
          <div className="inline-flex h-9 items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 text-sm text-sky-400">
              <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
              </svg>
              Secure & Anonymous Reporting
          </div>

          <h1 className="mt-8 bg-gradient-to-b from-white to-white/80 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl">
              Report Incident.
              <span className="block bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                  Protect Identity.
              </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Make your community safer without compromising your safety. Our
              advanced encryption ensures your identity remains completely
              anonymous.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href={"/submit-report"}>
                  <button className="group relative flex h-12 items-center justify-center gap-2 rounded-xl bg-sky-500 px-8 text-sm font-medium text-white transition-all hover:bg-sky-400">
                      Make Anonymous Report
                      <svg
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                      >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 12h14M12 5l7 7-7 7"
                          />
                      </svg>
                  </button>
              </Link>
              <Link href={"/how-it-works"}>
                  <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white/5 px-8 text-sm font-medium text-white ring-1 ring-inset ring-white/10 transition-all hover:bg-white/10">
                      How it Works
                  </button>
              </Link>
          </div>
      </div>
  )
}

export default HomeSection