import { useNavigate } from 'react-router-dom';

interface HomeInfoProps {
  currentStage: number | null;
}

const HomeInfo = ({ currentStage }: HomeInfoProps) => {
  // Navigation hook for page routing
  const navigate = useNavigate();

  // Handle navigation to different pages
  const handleStageClick = (stage: number) => {
    switch (stage) {
      case 2:
        navigate('/about');
        break;
      case 3:
        navigate('/projects');
        break;
      case 4:
        navigate('/contact');
        break;
      default:
        // Stage 1 stays on home page
        break;
    }
  };

  // Stage-based information display with click navigation
  const renderStageInfo = () => {
    if (!currentStage) return null;

    const stageContent = {
      1: {
        title: "Welcome to My World",
        description: "Explore this interactive 3D space",
        clickable: false
      },
      2: {
        title: "About Me",
        description: "Passionate developer creating immersive experiences",
        clickable: true
      },
      3: {
        title: "My Projects",
        description: "Innovative solutions and creative implementations",
        clickable: true
      },
      4: {
        title: "Get In Touch",
        description: "Let's collaborate on something amazing",
        clickable: true
      }
    };

    const content = stageContent[currentStage as keyof typeof stageContent];
    if (!content) return null;

    return (
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10 text-center">
        <div 
          className={`bg-black/20 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto border border-gray-500/30 shadow-xl transition-all duration-300 ${
            content.clickable 
              ? 'cursor-pointer hover:bg-gray-700/30 hover:border-blue-400/50 hover:shadow-2xl hover:scale-105' 
              : ''
          }`}
          onClick={() => content.clickable && handleStageClick(currentStage)}
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-2">{content.title}</h2>
          <p className="text-gray-200 mb-3 font-bold">{content.description}</p>
          <p className={`text-sm ${content.clickable ? 'text-blue-300' : 'text-gray-300'}`}>
            {content.action}
          </p>
          {content.clickable && (
            <div className="mt-3 flex items-center justify-center">
              <span className="text-blue-300 text-xs"></span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return renderStageInfo();
}

export default HomeInfo