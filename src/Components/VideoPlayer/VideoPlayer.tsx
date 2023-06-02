import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactPlayer from 'react-player'

interface VideoPlayerProps {
  channelUrl: string,
  clipLength: number;
}

export default function VideoPlayer({ channelUrl, clipLength } : VideoPlayerProps) {

  const playerRef = useRef<ReactPlayer>(null);
  const [ videos, setVideos ] = useState<any[]>([]);
  const [ getErrorMessage, setErrorMessage ] = useState("");
  const [ getStatusMessage, setStatusMessage ] = useState("");

  const [ playing, setPlaying ] = useState(false);
  const [ videoUrl, setVideoUrl ] = useState('');
  const [ startTime, setStartTime ] = useState(30);
  const [ endTime, setEndTime ] = useState(90);

  const friendlyName = channelUrl.replace(/^a-zA-Z0-9 ]/g, '');
  const autoPlay = false;

  useEffect(() => {
    // Check local storage for videos and load those to reduce API key usage
    const savedVideos = localStorage.getItem(friendlyName);
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    } else {
      fetchVideos();
    }
  }, []);

  const fetchVideos = async () => {
    setStatusMessage("Fetching Videos...");
    try {
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
      const maxResults = 50; 
      let nextPageToken = ''; 

      // Get the channel ID from the channel URL
      const channelIdResponse = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${channelUrl}&type=channel&key=${apiKey}`
      );
      const channelId = channelIdResponse.data.items[0].id.channelId;

      // Fetch all videos from the channel
      const allVideos = [];
      do {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}&pageToken=${nextPageToken}`
        );

        const videos = response.data.items.map((item: { id: { videoId: any; }; snippet: { title: any; }; }) => ({
          videoId: item.id.videoId,
          title: item.snippet.title,
        }));

        allVideos.push(...videos);

        nextPageToken = response.data.nextPageToken;
      } while (nextPageToken);

      setVideos(allVideos);

      // Reset error message
      if (allVideos) {
        setErrorMessage("");
        setStatusMessage("");
      }

      // Add video list to local storage
      localStorage.setItem(friendlyName, JSON.stringify(allVideos));
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      setErrorMessage("Error fetching YouTube videos. Check your browser console for details.");
    }
  };

  const refreshVideoCache = () => {
    confirmAlert({
      message: 'Are you sure you want refresh the video cache?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            localStorage.removeItem(friendlyName);
            fetchVideos();
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }

  const onReady = (event: any) => {
    // Set random time
    updateTime();
  };

  // Triggered when the video's time changes or when video is paused/played
  const onProgressChange = (event: any) => {
    const currentTime = event.playedSeconds;

    if (playerRef.current) {
      // Pause the video if set before the start time
      if (currentTime < startTime) {
        setPlaying(false);
        playerRef.current.seekTo(startTime);
      }

      // Pause the video when it reaches the end time
      if (currentTime >= endTime) {
        setPlaying(false);
        playerRef.current.seekTo(endTime);
      }
    }
  };

  // Get new video
  const findNext = () => {
    const randomVideoId = videos[Math.floor(Math.random() * videos.length)];
    var videoID = randomVideoId?.videoId;
    console.log(randomVideoId)

    setVideoUrl("https://www.youtube.com/watch?v=" + videoID);

    setTimeout(() => {
      updateTime();
    }, 500);
  }

  // Set random time
  const updateTime = () => {
    if (playerRef.current) {
      const duration = playerRef.current.getDuration();

      var start = getRandomArbitrary(0, duration);
      setStartTime(start);
      setEndTime(start + clipLength);
      if (endTime > duration) setEndTime(duration);

      setPlaying(autoPlay);
      playerRef.current.seekTo(start);
    }
  }

  // Restarts the video
  const rewatch = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(startTime);
      setPlaying(autoPlay);
    }
  }

  // Get a random number
  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  
  
  return (
    <div>
      <h4 className="text-info ">{getStatusMessage}</h4>
      <p className="text-danger">{getErrorMessage}</p>

      <ReactPlayer ref={playerRef} className='react-player' width="16" playing={playing} controls={true} url={videoUrl} onReady={onReady} onPlay={() => setPlaying(true)} onProgress={onProgressChange} />
      
      <button className="btn btn-primary btn-lg" disabled={videoUrl ? false : true} onClick={rewatch}>Restart</button>
      <button className="btn btn-primary btn-lg" onClick={findNext}>New Video</button>

      <p className='mt-5 mb-0'>Loaded Videos: {videos.length}</p>
      <button className="btn btn-secondary btn-sm mt-0" onClick={refreshVideoCache}>Refresh Videos</button>
    </div>
  );
};