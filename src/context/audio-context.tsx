import React, { createContext, useState, useContext } from 'react';
import type { AudioContext } from '../types';

import { useLocalStorage } from '../hooks';

const AudioCtx = createContext<AudioContext | null>(null);

export const AudioProvider = (props: any) => {
  const [isMuted, setIsMuted] = useLocalStorage<boolean>('audio-mute', false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const value: AudioContext = {
    isMuted,
    toggleMute
  };

  return <AudioCtx.Provider value={value} {...props} />;
};

export const useAudioContext = () => {
  const context = useContext(AudioCtx);

  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }

  return context;
};
