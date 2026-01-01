import { useLocation } from 'react-router-dom';

export function ThankYou() {
  const location = useLocation();
  const { buyerEmail, patterns = [] } = location.state || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Thank you for your purchase!</h1>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
          <p className="text-lg mb-2">🎉 Payment completed successfully!</p>
          <p className="text-gray-600">
            We've sent your patterns to:
            <br />
            <span className="font-medium text-gray-900">{buyerEmail}</span>
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Your Downloads</h2>
          {patterns.map((pattern) => (
            <div key={pattern.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={pattern.main_image || pattern.images?.[0]}
                  alt={pattern.title}
                  className="w-16 h-16 rounded-lg object-cover border"
                />
                <div>
                  <h3 className="font-bold text-lg">{pattern.title}</h3>
                  <p className="text-sm text-gray-500">You can download the pattern in any of the following languages:</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pattern.pdf_files && pattern.pdf_files.length > 0 ? (
                  pattern.pdf_files.map((pdf, idx) => (
                    <a
                      key={idx}
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-primary hover:text-white rounded-lg border border-gray-100 transition-all group"
                    >
                      <span className="font-medium">Instructions ({pdf.language})</span>
                      <svg className="w-5 h-5 opacity-50 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                  ))
                ) : pattern.pdf_url ? (
                  <a
                    href={pattern.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-primary hover:text-white rounded-lg border border-gray-100 transition-all group"
                  >
                    <span className="font-medium">Download Pattern</span>
                    <svg className="w-5 h-5 opacity-50 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                ) : (
                  <p className="text-sm text-amber-600 italic">No files available for this pattern currently.</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Please also check your inbox (and spam folder).</p>
          <p>If you have any issues with the download, contact us.</p>
        </div>
      </div>
    </div>
  );
}

export default ThankYou; 