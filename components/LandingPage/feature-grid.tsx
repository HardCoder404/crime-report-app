import { Ambulance, MapPinHouse } from 'lucide-react'
import React from 'react'

const FeatureGrid = () => {
  return (
      <div className="mt-40 grid gap-6 sm:grid-cols-3">
          {[
              {
                  title: "Military-Grade Encryption",
                  description:
                      "Your identity is protected with state-of-the-art encryption protocols",
                  icon: (
                      <svg
                          className="h-6 w-6 text-sky-400"
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
                  ),
              },
              {
                  title: "Real-time Processing",
                  description:
                      "Instant verification and secure routing of all reports",
                  icon: (
                      <svg
                          className="h-6 w-6 text-sky-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                      >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                      </svg>
                  ),
              },
              {
                  title: "Secure Communication",
                  description: "Two-way anonymous channel with law enforcement",
                  icon: (
                      <svg
                          className="h-6 w-6 text-sky-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                      >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                      </svg>
                  ),
              },
              {
                  title: "Location-Based Reporting",
                  description:
                      "Automatically tag your location for faster response and accurate tracking.",
                  icon: <MapPinHouse className="h-6 w-6 text-sky-400" />,
              },
              {
                  title: "Anonymous Reporting",
                  description:
                      "Report crimes anonymously without revealing your identity.",
                  icon: (
                      <svg
                          className="h-6 w-6 text-sky-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                      >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 14l9-5-9-5-9 5 9 5z"
                          />
                      </svg>
                  ),
              },
              {
                  title: "24/7 Emergency Support",
                  description:
                      "Immediate assistance available anytime, anywhere for critical situations.",
                  icon: <Ambulance className="h-6 w-6 text-sky-400" />,
              },

          ].map((feature, i) => (
              <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-8 transition-all hover:bg-zinc-800/80"
              >
                  <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                      <div className="mb-5 inline-flex rounded-xl bg-sky-500/10 p-3">
                          {feature.icon}
                      </div>
                      <h3 className="mb-3 text-lg font-medium text-white">
                          {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-zinc-400">
                          {feature.description}
                      </p>
                  </div>
              </div>
          ))}
      </div>
  )
}

export default FeatureGrid