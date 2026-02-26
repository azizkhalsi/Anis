import { useContext } from 'react';
import { ScrollPositionContext } from '../contexts/scrollPositionContextValue';

export function useScrollPosition() {
  return useContext(ScrollPositionContext);
}
