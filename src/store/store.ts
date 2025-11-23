
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import projectsReducer from './projectsSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['projects'], // Only persist the projects state
};

const persistedReducer = persistReducer(persistConfig, projectsReducer);

export const store = configureStore({
    reducer: {
        projects: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;