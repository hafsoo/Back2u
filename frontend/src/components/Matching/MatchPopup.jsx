import { useNavigate } from "react-router-dom";

const MatchPopup = ({ matches, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      
      {/* Popup container */}
      <div className="relative w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/40 p-6 sm:p-8 max-h-[85vh] overflow-y-auto transition-all duration-300 scale-100">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 text-xl font-semibold transition-all duration-200"
        >
          &times;
        </button>

        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {matches && matches.length > 0
              ? "Possible Matches Found!"
              : "No Matches Found"}
          </h3>

          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mt-3 mb-4"></div>
        </div>

        {/* Body */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center max-w-sm mx-auto">
          {matches && matches.length > 0
            ? `We've found ${matches.length} possible match${
                matches.length > 1 ? "es" : ""
              } for your report.`
            : "No possible matches found for this item."}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 active:scale-95 transition-all duration-200"
          >
            Close
          </button>

          {matches && matches.length > 0 && (
            <button
              onClick={() => navigate("/matches", { state: { matches } })}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all duration-200"
            >
              View Matches
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchPopup;
