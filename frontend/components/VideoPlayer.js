import ReactHlsPlayer from "react-hls-player";

const VideoPlayer = (props) => {
  return (
    <div className="ml-[1%] mt-5 w-[98%]">
      <ReactHlsPlayer
        src={`https://rtmp.gammarotors.com/live/${props?.room}/index.m3u8`}
        autoPlay={false}
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
