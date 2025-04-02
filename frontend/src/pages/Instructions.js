import { Link } from "react-router-dom";
import { useState } from "react";

function Instructions() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 max-w-2xl shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Mock Test Instructions</h2>
        
        <ul className="list-disc list-inside text-gray-700">
          <li>Read all instructions carefully before starting the test.</li>
          <li>Total duration of the test is 60 minutes.</li>
          <li>Once started, test cannot be paused or restarted.</li>
          <li>Negative marking is applicable for wrong answers.</li>
        </ul>

        <div className="mt-4">
          <label className="inline-flex items-center">
            <input type="checkbox" className="mr-2" onChange={() => setChecked(!checked)} />
            I have read and agree to the instructions
          </label>
        </div>

        <div className="mt-6 flex justify-between">
          <Link to="/" className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</Link>
          <Link to={checked ? "/mocktest" : "#"} 
            className={`px-4 py-2 rounded ${checked ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
          >
            Start Test
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Instructions;
