import React from 'react';

export default function ComingSoon() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-stone-50 via-amber-50/40 to-rose-50/60 flex items-center justify-center px-6 py-16">
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative w-full max-w-2xl text-center">
        <div className="mb-10 flex justify-center">
          <img
            src="/images/logo.png"
            alt="Knitting With Calm"
            className="h-20 w-auto opacity-90"
          />
        </div>

        <div className="mb-12 flex justify-center">
          <KnittingNeedles />
        </div>

        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-500">
          In progress
        </p>

        <h1
          className="mb-6 text-4xl sm:text-5xl md:text-6xl font-light text-stone-800 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Something beautiful
          <br />
          is being knit.
        </h1>

        <p className="mx-auto mb-12 max-w-md text-base sm:text-lg text-stone-600 leading-relaxed">
          Beautiful things take their time. We're carefully crafting every
          stitch — come back soon to see what we've made.
        </p>

        <div className="mx-auto max-w-md rounded-2xl border border-dashed border-stone-300/80 bg-white/40 backdrop-blur-sm p-8">
          <p className="text-sm text-stone-500">
            A newsletter is coming soon.
            <br />
            <span className="text-stone-400">
              Be the first to know when we launch.
            </span>
          </p>
        </div>

        <p className="mt-16 text-xs text-stone-400">
          &copy; {new Date().getFullYear()} Knitting With Calm
        </p>
      </div>
    </div>
  );
}

function KnittingNeedles() {
  return (
    <div className="relative">
      <style>{`
        @keyframes knit-left {
          0%, 100% { transform: rotate(-18deg) translateY(0); }
          50% { transform: rotate(-12deg) translateY(-4px); }
        }
        @keyframes knit-right {
          0%, 100% { transform: rotate(18deg) translateY(0); }
          50% { transform: rotate(12deg) translateY(-4px); }
        }
        @keyframes yarn-bob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(4deg); }
        }
        .needle-left {
          transform-origin: 50% 80%;
          animation: knit-left 2.4s ease-in-out infinite;
        }
        .needle-right {
          transform-origin: 50% 80%;
          animation: knit-right 2.4s ease-in-out infinite;
        }
        .yarn-ball {
          transform-origin: center;
          animation: yarn-bob 3s ease-in-out infinite;
        }
      `}</style>

      <svg
        viewBox="0 0 240 200"
        className="h-32 w-auto sm:h-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="needleGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4a574" />
            <stop offset="100%" stopColor="#8b6543" />
          </linearGradient>
          <radialGradient id="yarnGrad" cx="0.35" cy="0.35" r="0.7">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="100%" stopColor="#e11d48" />
          </radialGradient>
        </defs>

        <g className="needle-left">
          <line
            x1="80"
            y1="20"
            x2="115"
            y2="160"
            stroke="url(#needleGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="80" cy="20" r="5" fill="#8b6543" />
        </g>

        <g className="needle-right">
          <line
            x1="160"
            y1="20"
            x2="125"
            y2="160"
            stroke="url(#needleGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="160" cy="20" r="5" fill="#8b6543" />
        </g>

        <g stroke="#a78bfa" strokeWidth="2.2" fill="none" strokeLinecap="round">
          <path d="M 100 95 Q 105 88 110 95 Q 115 88 120 95" opacity="0.85" />
          <path d="M 100 108 Q 105 101 110 108 Q 115 101 120 108" opacity="0.85" />
          <path d="M 100 121 Q 105 114 110 121 Q 115 114 120 121" opacity="0.85" />
        </g>

        <path
          d="M 120 121 Q 145 140 165 165 Q 175 175 185 178"
          stroke="url(#yarnGrad)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        <g className="yarn-ball">
          <circle cx="195" cy="180" r="16" fill="url(#yarnGrad)" />
          <path
            d="M 182 178 Q 195 170 208 180 M 184 186 Q 195 178 206 186 M 186 172 Q 195 165 204 172"
            stroke="#9f1239"
            strokeWidth="1.2"
            fill="none"
            opacity="0.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
