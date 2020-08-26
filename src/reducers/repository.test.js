import repositoryReducer from './repository';
import { REPOSITORIES_FILTERED, REPOSITORIES_LOADED } from '../actions/types';

const mockReposTest = [
  {
    name: 'Test',
    id: 0,
  },
  {
    name: 'Test2',
    id: 1,
  },
];

const mockRepoName = {
  name: 'Name',
  id: 2,
};

describe('REPOSITORIES_LOADED type', () => {
  const type = REPOSITORIES_LOADED;
  const payload = mockReposTest;
  const initialState = {
    repositories: [],
    displayed_repositories: [],
    loading: true,
  };

  it('loaded loads repositories', () => {
    const newState = repositoryReducer(initialState, { type, payload });

    expect(JSON.stringify(newState.repositories)).toEqual(
      JSON.stringify(payload)
    );
    expect(JSON.stringify(newState.displayed_repositories)).toEqual(
      JSON.stringify(payload)
    );
    expect(newState.loading).toEqual(false);
  });

  it('loaded returns new object', () => {
    const newState = repositoryReducer(initialState, { type, payload });

    expect(newState).not.toBe(initialState);
  });
});

describe('REPOSITORIES_FILTERED type', () => {
  const type = REPOSITORIES_FILTERED;
  const initialState = {
    repositories: [...mockReposTest, mockRepoName],
    displayed_repositories: [...mockReposTest, mockRepoName],
    loading: true,
  };

  it('filter removes all when none match', () => {
    const newState = repositoryReducer(initialState, {
      type,
      payload: 'No repository name matches',
    });

    expect(newState.displayed_repositories).not.toContain(mockReposTest[0]);
    expect(newState.displayed_repositories).not.toContain(mockReposTest[1]);
    expect(newState.displayed_repositories).not.toContain(mockRepoName);
    expect(newState.displayed_repositories.length).toBe(0);
  });

  it('filter removes only ones that do not match', () => {
    const newState = repositoryReducer(initialState, {
      type,
      payload: mockReposTest[0].name,
    });

    expect(newState.displayed_repositories).toContain(mockReposTest[0]);
    expect(newState.displayed_repositories).toContain(mockReposTest[1]);
    expect(newState.displayed_repositories).not.toContain(mockRepoName);
    expect(newState.displayed_repositories.length).toBe(mockReposTest.length);
  });

  it('filter does not remove any when it is empty string', () => {
    const newState = repositoryReducer(initialState, {
      type,
      payload: '',
    });

    expect(newState.displayed_repositories).toContain(mockReposTest[0]);
    expect(newState.displayed_repositories).toContain(mockReposTest[1]);
    expect(newState.displayed_repositories).toContain(mockRepoName);
    expect(newState.displayed_repositories.length).toBe(
      newState.repositories.length
    );
  });

  it('filter does not modify repositories list', () => {
    const repositoriesCopy = [...initialState.repositories];
    const newState = repositoryReducer(initialState, {
      type,
      payload: 'Not matching query',
    });

    expect(JSON.stringify(newState.repositories)).toEqual(
      JSON.stringify(repositoriesCopy)
    );
  });

  it('filter works with empty displayed_repositories', () => {
    const state = { ...initialState, displayed_repositories: [] };
    const newState = repositoryReducer(state, {
      type,
      payload: '',
    });

    expect(JSON.stringify(newState.displayed_repositories)).toEqual(
      JSON.stringify(state.repositories)
    );
  });

  it('filter does not modify loading', () => {
    const loadingTrue = true;
    const stateTrue = { ...initialState, loading: loadingTrue };
    const newStateTrue = repositoryReducer(stateTrue, {
      type,
      payload: '',
    });

    expect(newStateTrue.loading).toBe(loadingTrue);

    const loadingFalse = false;
    const stateFalse = { ...initialState, loading: loadingFalse };
    const newStateFalse = repositoryReducer(stateFalse, {
      type,
      payload: '',
    });

    expect(newStateFalse.loading).toBe(loadingFalse);
  });

  it('filter returns new object', () => {
    const newState = repositoryReducer(initialState, {
      type,
      payload: '',
    });

    expect(newState).not.toBe(initialState);
  });
});

describe('default case', () => {
  const initialState = {
    repositories: [...mockReposTest, mockRepoName],
    displayed_repositories: [...mockReposTest, mockRepoName],
    loading: true,
  };

  it('default case returns same state', () => {
    const initialStateCopy = { ...initialState };
    const newState = repositoryReducer(initialState, {
      type: 'INVALID_TYPE',
    });

    /** Ensure the state does not change */
    expect(JSON.stringify(newState)).toEqual(JSON.stringify(initialStateCopy));
    /** Ensure the returned object is the initial one */
    expect(newState).toBe(initialState);
  });
});
