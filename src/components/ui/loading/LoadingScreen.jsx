import {  Loader, LoaderCircle } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div>
          <Loader className="h-24 w-24 text-blue-500 animate-spin" />
        </div>
      </div>
    </div>
  );
};
