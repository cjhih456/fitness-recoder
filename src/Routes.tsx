import { useMemo } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import { baseURL } from './components/utils'
import Main from './pages/Main';
import CalanderPage from './pages/CalanderPage';
import FitnessList from './pages/FitnessList';
import CreateSchedule from './pages/:selectDate/schedule/create';
import DisplaySchedule from './pages/:selectDate/schedule/:id';
import DisplayWorkout from './pages/:selectDate/workout/:id';
import PresetListPage from './pages/preset';
import PresetDetailPage from './pages/preset/:id';
import { BottomNaviProvider } from './components/provider/BottomNavi/BottomNaviProvider';

export default function useRouters() {
  const router = useMemo(() => {
    return createBrowserRouter([
      {
        element: <BottomNaviProvider>
          <Outlet />
        </BottomNaviProvider>,
        children: [
          {
            index: true,
            element: <Main />
          },
          {
            path: 'calander',
            element: <CalanderPage />
          },
          {
            path: 'fitnessList',
            element: <FitnessList />
          },
          {
            path: ':selectDate',
            children: [
              {
                path: 'schedule',
                children: [
                  {
                    path: 'create',
                    element: <CreateSchedule />
                  },
                  {
                    path: ':id',
                    element: <DisplaySchedule />
                  }
                ]
              },
              {
                path: 'workout',
                children: [
                  {
                    path: ':id',
                    element: <DisplayWorkout />
                  }
                ]
              }
            ]
          },
          {
            path: 'preset',
            children: [
              {
                index: true,
                element: <PresetListPage />
              },
              {
                path: ':id',
                element: <PresetDetailPage />
              }
            ]
          }
        ]
      },

    ], {
      basename: baseURL()
    })
  }, [])
  return router
}