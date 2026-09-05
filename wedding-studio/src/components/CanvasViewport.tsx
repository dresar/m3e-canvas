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
      <main className="flex-1 bg-slate-950 flex items-center justify-center p-6 overflow-y-auto">
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
            <div className="w-[412px] h-[892px] rounded-[36px] border-4 border-slate-800 shadow-2xl overflow-y-auto relative bg-slate-900">
              {project.screens.slice(1).map((s) => (
                <div key={s.id} className="min-h-[892px] flex items-center justify-center">
                  <PhoneScreen
                    screen={s}
                    project={project}
                    isActive={false}
                    isOpenState={true}
                  />
                </div>
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
      className="flex-1 bg-slate-950 canvas-grid relative overflow-auto p-12 flex items-center"
    >
      <div
        className="flex items-center gap-12 mx-auto py-8 transition-transform duration-100 ease-out origin-center"
        style={{
          transform: `scale(${zoom})`,
        }}
      >
        {project.screens.map((screen: ScreenData, idx: number) => (
          <div key={screen.id} className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-5 h-5 rounded bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] text-slate-300">
                {idx + 1}
              </span>
              <span className="font-sans font-medium text-slate-300">{screen.title}</span>
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
