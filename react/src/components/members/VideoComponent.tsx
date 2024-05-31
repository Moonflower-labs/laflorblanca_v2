import type { VideoLink } from "../../utils/definitions";
import { formatDate } from "../../utils/format";

const VideoComponent = ({ link }: { link: VideoLink }) => {
  return (
    <div className="flex flex-col items-center">
      <iframe
        className="aspect-video w-[85%] rounded-md mb-6"
        src={link.url}
        title={link.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
        allowFullScreen
      />
      <p className="text-xl mb-4">
        La Flor Blanca el {formatDate(link.uploaded_on)}
      </p>

      <p>{link.description}</p>
    </div>
  );
};

export default VideoComponent;
