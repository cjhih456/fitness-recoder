import { useCallback, useMemo } from 'react';
import { createBrowserRouter } from 'react-router-dom';
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
  const BottomNaviProviderCallback = useCallback((args: { children: any }) => {
    return <BottomNaviProvider key="bottom-navi" {...args} />
  }, [])
  const router = useMemo(() => {
    return createBrowserRouter([
      {
        index: true,
        element: <BottomNaviProviderCallback>
          <Main />
        </BottomNaviProviderCallback>,
      },
      {
        path: 'calander',
        element: <BottomNaviProviderCallback>
          <CalanderPage />
        </BottomNaviProviderCallback>
      },
      {
        path: 'fitnessList',
        element: <BottomNaviProviderCallback>
          <FitnessList />
        </BottomNaviProviderCallback>
      },
      {
        path: ':selectDate',
        children: [
          {
            path: 'schedule',
            children: [
              {
                path: 'create',
                element: <BottomNaviProviderCallback>
                  <CreateSchedule />
                </BottomNaviProviderCallback>
              },
              {
                path: ':id',
                element: <BottomNaviProviderCallback>
                  <DisplaySchedule />
                </BottomNaviProviderCallback>
              }
            ]
          },
          {
            path: 'workout',
            children: [
              {
                path: ':id',
                element: <BottomNaviProviderCallback>
                  <DisplayWorkout />
                </BottomNaviProviderCallback>
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
            element: <BottomNaviProviderCallback>
              <PresetListPage />
            </BottomNaviProviderCallback>
          },
          {
            path: ':id',
            element: <BottomNaviProviderCallback>
              <PresetDetailPage />
            </BottomNaviProviderCallback>
          }
        ]
      }
    ], {
      basename: baseURL()
    })
  }, [])
  return router
}