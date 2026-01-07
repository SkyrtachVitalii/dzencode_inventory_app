import sessionsReducer, { selectActiveSessions } from './sessionsSlice';

describe('SessionsSlice Tests', () => {

  test('should return initial state', () => {
    const result = sessionsReducer(undefined, { type: '' });

    expect(result).toEqual({
      sessionCount: 0,
    });
  });

  test('should update sessionCount when selectActiveSessions is dispatched', () => {
    const initialState = { sessionCount: 0 };
    
    const action = selectActiveSessions(5);

    const result = sessionsReducer(initialState, action);

    expect(result.sessionCount).toBe(5);
  });

  test('should overwrite existing sessionCount', () => {
    const previousState = { sessionCount: 10 };
    
    const action = selectActiveSessions(3);

    const result = sessionsReducer(previousState, action);

    expect(result.sessionCount).toBe(3);
  });

});