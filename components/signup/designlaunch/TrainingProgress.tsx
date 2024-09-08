import { Loader } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

export function TrainingProgress({ trainingComplete, loadingStatus, taskStatus }: any) {
  return (
    <div className="w-full flex justify-between items-center h-full">
      <div className="w-1/2 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-4 text-white">
          {trainingComplete ? "Training complete!" : "Training in progress..."}
        </h1>
        <p className="mb-6 text-sm text-gray-300">
          {loadingStatus ? "Fetching task status..." : ""}
        </p>
      </div>

      {/* Right side - Circular Progress */}
      <div className="w-1/2 flex justify-center items-center relative">
        <div style={{ width: 120, height: 120 }}>
          <CircularProgressbar
            value={loadingStatus ? 0 : taskStatus?.[0]?.details?.percent || 0}
            text={`${loadingStatus ? '' : `${taskStatus?.[0]?.details?.percent || 0}%`}`}
            styles={buildStyles({
              pathColor: `rgba(62, 152, 199, ${(taskStatus?.[0]?.details?.percent || 0) / 100})`,
              textColor: '#fff',
              trailColor: '#d6d6d6',
              strokeLinecap: 'round',
            })}
          />
        </div>

        {/* Loader overlay */}
        {loadingStatus && (
          <div className="absolute inset-0 flex justify-center items-center">
            <Loader className="animate-spin h-8 w-8 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
}
