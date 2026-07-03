type WorkVideoProps = {
  src: string;
  poster?: string;
  title: string;
};

export function WorkVideo({ src, poster, title }: WorkVideoProps) {
  return (
    <div className="work-video">
      <video
        controls
        preload="none"
        playsInline
        poster={poster}
        className="work-video-player"
        aria-label={`${title} commercial reel`}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
