import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import playerjs from 'player.js';

import ReactPlayer from 'react-player';

import Backdrop from '@material-ui/core/Backdrop';

import { CarouselVideo, IframePreview } from './wrapper';
import { ReactComponent as PlayIcon } from '../../images/svg/play.svg';

export default function VideoCarouselItem({ media, index, isPlaying }) {
  const [iframePlayer, setIframePlayer] = useState(null);
  const [playing, setIsPlaying] = useState(isPlaying);

  useEffect(() => {
    if (iframePlayer) {
      iframePlayer.pause();
    }
    setIsPlaying(isPlaying);
  }, [isPlaying]);

  const renderMainSwiperSlide = (video, i) => {
    switch (video.internalVideo) {
      case true:
        return (
          <CarouselVideo>
            <ReactPlayer
              playing={playing}
              height="100%"
              url={video.videoUrl}
              controls
            />
          </CarouselVideo>
        );
      case false:
        return (
          <CarouselVideo
            id={`iframe-${i}`}
            onClick={() => {
              const div = document.createElement('div');
              div.innerHTML = video.embedVideo.trim();
              const iframeContainer = document.querySelector(`#iframe-${i}`);
              const iframePreview = document.querySelector(
                `#iframe-preview-${i}`,
              );

              iframeContainer.replaceChild(div, iframePreview);

              // Create the player.
              const player = new playerjs.Player(div.querySelector('iframe'));

              // Autoplay the video when it's ready.
              player.on('ready', () => {
                setIframePlayer(player);
                player.play();
              });
            }}
          >
            <IframePreview id={`iframe-preview-${i}`}>
              <img src={video.thumbUrl} alt={video.embedVideoTitle} />

              <Backdrop className="backdrop-iframe" open>
                <PlayIcon />
              </Backdrop>
            </IframePreview>
          </CarouselVideo>
        );
      default:
        return null;
    }
  };

  return renderMainSwiperSlide(media, index);
}

VideoCarouselItem.propTypes = {
  media: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};
