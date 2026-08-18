import "./index.css";
import { MyComposition } from "./Composition";
import { VideoExample } from "./VideoExample";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <VideoExample />
    </>
  );
};
