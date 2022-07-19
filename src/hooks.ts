import { useEffect, useState, useRef, SyntheticEvent } from 'react';
import { useAudioContext } from './context/audio-context';

//
// ** USE AUDIO **
//
export function useAudio(url: string, { volume = 1, playBackRate = 1 }) {
  const audio = useRef(new Audio());

  const { isMuted } = useAudioContext();

  audio.current.volume = volume;
  audio.current.muted = isMuted;

  const play = () => {
    if (audio.current.paused) {
      audio.current.src = url;
      audio.current.play();
    }
  };

  const pause = () => {
    if (!audio.current.paused) {
      audio.current.pause();
      audio.current.src = '';
    }
  };

  useEffect(() => {
    audio.current.addEventListener('ended', () => audio.current.pause());

    return () => {
      audio.current.addEventListener('ended', () => audio.current.pause());
    };
  }, []);

  return { play, pause };
}

//
// ** USE OUTSIDE CLICK **
//
export function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  handler: (e: any) => void
) {
  useEffect(() => {
    const listener = (e: any) => {
      if (!ref.current || ref.current.contains(e.target)) return;

      handler(e);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

//
// ** USE LOCAL STORAGE **
//

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? deserialize(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      window.localStorage.setItem(key, serialize(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
