// src/lib/hooks.ts

import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from './store';
import { useEffect } from 'react';
import { selectActiveSessions } from '@/lib/features/sessions/sessionsSlice';
import { getSocket } from "./socketClient";


export const useSocket = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = getSocket();

    function onSessionUpdate(count: number) {
      dispatch(selectActiveSessions(count));
    }

    if (!socket.connected) {
      socket.connect();
    }
    
    socket.on("session-update", onSessionUpdate);

    socket.emit("ask-session-count");

    return () => {
      socket.off("session-update", onSessionUpdate);
    };
  }, [dispatch]);
};

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();