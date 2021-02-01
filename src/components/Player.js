import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Pause, Play } from "heroicons-react";
import { useDarkModeStatus } from "../services/dark-mode-service";

const Player = props => {
  const audio = useMemo(() => new Audio(), []);
  const isDarkModeEnabled = useDarkModeStatus();
  const [paused, setPaused] = useState(true);

  audio.onloadeddata = () => {
    audio.volume = 0.5;
    audio.play();
    setPaused(false);
  }

  useEffect(() => {
    audio.src = props.song.previewUrl;
  }, [audio, props.song])
  
  return (
    <div className="z-30 px-6 flex overflow-hidden items-center justify-center fixed h-24 bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-800">
      <div className="flex-1 flex items-center truncate">
        {
          props.song.artworkUrl100 ?
            <div className="flex-shrink-0 h-16 w-16">
              <img className="h-16 w-16 rounded" src={props.song.artworkUrl100} alt="thumbnail" />
            </div> :
            null
        }
        <span className="ml-4 flex flex-col mr-auto overflow-hidden max-w-lg">
          <span className="text-blue-500 font-semibold mb-1 truncate">{props.song.trackName}</span>
          <span className="text-sm text-gray-700 dark:text-gray-200 truncate ">{props.song.artistName}</span>
        </span>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <button
          onClick={() => {
            if (paused) {
              audio.play();
              setPaused(false);
            } else {
              audio.pause();
              setPaused(true);
            }
          }}
          className="focus:outline-none"
        >
          {
            paused ?
              <Play className="h-12 w-12 text-blue-500" /> :
              <Pause className="h-12 w-12 text-blue-500" />
          }
        </button>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <div id="volume-slider">
          <input
            type="range"
            onInput={(e) => {
              audio.volume = e.target.value / 100;
              e.target.style.background = `linear-gradient(90deg, #3B82F6 0% ${e.target.value}%, ${isDarkModeEnabled ? "#37373b" : "#E6E6EA"} ${e.target.value}% 100%)`
            }}
            style={{
              background: `linear-gradient(90deg, #3B82F6 0% 50%, ${isDarkModeEnabled ? "#37373b" : "#E6E6EA"} 50% 100%)`
            }}
          />
        </div>
      </div>
    </div>
  );
}

Player.propTypes = {
  song: PropTypes.object
};

export default Player;
