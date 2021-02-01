import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { convertTrackTimeToReadableString } from "../services/itunes-service";
import { Play, VolumeUp } from "heroicons-react";

const SongRow = props => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <tr
      onClick={props.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-gray-700 dark:text-gray-200 hover:bg-gray-300 hover:bg-opacity-50 dark:hover:bg-gray-800 dark:hover:bg-opacity-30"
    >
      <td className="w-10 pl-3 pr-0 py-0">
        <div className={`flex-shrink-0 h-10 w-10 ${isHovered || props.isPlaying ? "relative" : ""}`}>
          <img className="h-10 w-10 rounded" src={props.song.artworkUrl100} alt="thumbnail" />
          {
            isHovered || props.isPlaying ?
              <div className={`${props.isPlaying ? "text-blue-400" : "text-white"} absolute flex justify-center items-center top-0 left-0 h-10 w-10 bg-black rounded bg-opacity-60`}>
                {
                  props.isPlaying ?
                    <VolumeUp className="h-6 w-6" /> :
                    <Play className="h-6 w-6" />
                }
              </div>
               :
              null
          }
        </div>
      </td>
      <td className="max-w-48">
        <div className="flex">
          <span className={`${props.isPlaying ? "text-blue-500 font-semibold" : ""} whitespace-nowrap truncate`}>{props.song.trackName}</span>
          {
            props.song.trackExplicitness === "explicit" ?
              <span className="ml-3">
                <span className="text-blue-500 px-1 uppercase text-xxs border rounded border-blue-500 font-bold tracking-widest">Explicit</span>
              </span> :
              ""
          }
        </div>
      </td>
      <td className="max-w-48">
        <a href={props.song.artistViewUrl} target="_blank" rel="noreferrer">{props.song.artistName}</a>
      </td>
      <td className="max-w-48">
        <a href={props.song.collectionViewUrl} target="_blank" rel="noreferrer">{props.song.collectionName}</a>
      </td>
      <td className="text-right pr-3">
        {convertTrackTimeToReadableString(props.song.trackTimeMillis)}
      </td>
    </tr>
  );
};

SongRow.propTypes = {
  onClick: PropTypes.func,
  song: PropTypes.object,
  isPlaying: PropTypes.bool
};

export default SongRow;
