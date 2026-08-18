import {
  AbsoluteFill,
  CalculateMetadataFunction,
  Composition,
  OffthreadVideo,
  Sequence,
  staticFile,
} from "remotion";
import { getVideoMetadata } from "@remotion/media-utils";

// Nombre del archivo que debés colocar en la carpeta `public/`.
const VIDEO_FILE_NAME = "sample-video.mp4";

type Props = {
  title: string;
};

// Calcula la duración real del video para que la composición
// dure exactamente lo mismo que el archivo importado.
const calculateMetadata: CalculateMetadataFunction<Props> = async () => {
  const { durationInSeconds } = await getVideoMetadata(
    staticFile(VIDEO_FILE_NAME),
  );

  return {
    durationInFrames: Math.floor(durationInSeconds * 30),
  };
};

const VideoWithTitle: React.FC<Props> = ({ title }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <OffthreadVideo src={staticFile(VIDEO_FILE_NAME)} />

      {/* El título se muestra solo durante los primeros 90 frames (~3s a 30fps) */}
      <Sequence durationInFrames={90}>
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 60,
          }}
        >
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 64,
              fontWeight: "bold",
              color: "white",
              textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            }}
          >
            {title}
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

export const VideoExample = () => {
  return (
    <Composition
      id="VideoExample"
      component={VideoWithTitle}
      // durationInFrames se sobreescribe en calculateMetadata
      // una vez que se lee el archivo real de public/sample-video.mp4
      durationInFrames={150}
      fps={30}
      width={1280}
      height={720}
      calculateMetadata={calculateMetadata}
      defaultProps={{
        title: "Mi video",
      }}
    />
  );
};
