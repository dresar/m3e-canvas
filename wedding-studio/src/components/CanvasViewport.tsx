import React, { useRef, useState } from "react";
import { PhoneScreen } from "./PhoneScreen";
import { WeddingProject, ScreenData } from "../types";

interface CanvasViewportProps {
  project: WeddingProject;
  selectedScreenId: string;
  onSelectScreen: (id: string) => void;
  zoom: number;
  isPreview: boolean;
}

export const CanvasViewport: React.FC<CanvasViewportProps> = ({
  project,
  selectedScreenId,
  onSelectScreen,
  zoom,
  isPreview,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  if (isPreview) {
    return (
      <main className="flex-1 bg-slate-200/60 canvas-grid flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div className="transform scale-95 transition-transform duration-200">
          {!isInvitationOpen ? (
            <PhoneScreen
              screen={project.screens[0]}
              project={project}
              isActive={true}
              isOpenState={false}
              onOpenInvitation={() => setIsInvitationOpen(true)}
            />
          ) : (
            <div className="w-[390px] h-[844px] rounded-[38px] border-[8px] border-slate-900 shadow-2xl overflow-y-auto relative bg-white">
              {project.screens.slice(1).map((s) => (
                <PhoneScreen
                  key={s.id}
                  screen={s}
                  project={project}
                  isActive={false}
                  isOpenState={true}
                  frameless={true}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main
      ref={containerRef}
      className="flex-1 bg-slate-100/70 canvas-grid relative overflow-auto p-6 sm:p-10 flex items-center"
    >
      <div
        className="flex items-center gap-10 sm:gap-12 mx-auto py-8 transition-transform duration-100 ease-out origin-center"
        style={{
          transform: `scale(${zoom})`,
        }}
      >
        {project.screens.map((screen: ScreenData, idx: number) => (
          <div key={screen.id} className="flex flex-col items-center gap-3">
            <div className="bg-white border border-slate-200/90 shadow-2xs rounded-md px-2.5 py-1 flex items-center gap-2 text-xs select-none">
              <span className="w-5 h-5 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">
                {idx + 1}
              </span>
              <span className="font-semibold text-slate-800 text-xs">{screen.title}</span>
            </div>

            <PhoneScreen
              screen={screen}
              project={project}
              isActive={selectedScreenId === screen.id}
              onSelect={() => onSelectScreen(screen.id)}
            />
          </div>
        ))}
      </div>
    </main>
  );
};
