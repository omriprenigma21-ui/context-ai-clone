"use client";

interface TaskAnnotationsProps {
  duration?: string;
  startTime?: string;
  endTime?: string;
  additionalInfo?: string[];
}

export const TaskAnnotations = ({
  duration = "670.03s",
  startTime = "5:44:38 PM",
  endTime = "5:55:48 PM",
  additionalInfo = []
}: TaskAnnotationsProps) => {
  return (
    <div className="border-t border-gray-200 mt-4 pt-4">
      <div className="mb-2">
        <div className="text-xs font-medium tracking-wide uppercase text-gray-500 mb-1">Annotations</div>
        <div className="flex flex-col gap-1">
          <div className="text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span>Duration:</span>
              <span className="font-mono">{duration}</span>
              <span className="text-gray-400">({startTime} - {endTime})</span>
            </div>
          </div>
          {additionalInfo.map((info, index) => (
            <div key={index} className="text-xs text-gray-500">
              {info}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
