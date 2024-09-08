import { useState, useEffect } from "react";
import { DesignLook } from "./designlaunch/DesignLook";
import { TrainingProgress } from "./designlaunch/TrainingProgress";
import { LaunchStep } from "./designlaunch/LaunchStep";

export function DesignAndLaunch({ subStep, formData, onComplete }: any) {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingComplete, setTrainingComplete] = useState(false);
  const [taskStatus, setTaskStatus] = useState<any>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    let intervalId: any;

    if (subStep === 2 && formData?.task_ids && formData.task_ids.length > 0) {
      const fetchTaskStatus = async () => {
        try {
          const response = await fetch("/api/v1/trainstatuscheck", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              task_ids: formData.task_ids,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            setTaskStatus(data.tasks);

            const allTasksCompleted = data.tasks.every(
              (task: any) => task.result === "COMPLETED"
            );
            if (allTasksCompleted) {
              setTrainingComplete(true);
              clearInterval(intervalId);
            }
          } else {
            console.error("Failed to fetch task status:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching task status:", error);
        } finally {
          setLoadingStatus(false);
        }
      };

      fetchTaskStatus();
      intervalId = setInterval(fetchTaskStatus, 5000);
    } else {
      setLoadingStatus(false);
    }

    return () => clearInterval(intervalId);
  }, [subStep, formData?.task_ids]);

  useEffect(() => {
    if (isTraining) {
      const timer = setTimeout(() => {
        setTrainingComplete(true);
        setIsTraining(false);
        onComplete();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isTraining, onComplete]);

  const renderSubStep = () => {
    switch (subStep) {
      case 1:
        return <DesignLook />;
      case 2:
        return (
          <TrainingProgress
            trainingComplete={trainingComplete}
            loadingStatus={loadingStatus}
            taskStatus={taskStatus}
          />
        );
      case 3:
        return <LaunchStep />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex-grow flex md:min-h-96">
      <div className="my-auto w-full">{renderSubStep()}</div>
    </div>
  );
}
