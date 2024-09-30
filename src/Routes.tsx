import { useMemo, useRef } from 'react';
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
import DefaultLayout from './layout/DefaultLayout';
import { NextUIProvider } from '@nextui-org/react';
import ExerciseDataInfoModal from './components/provider/ExerciseDataModal/ExerciseDataInfoModal';
import { AlertProvider } from './components/provider/Alert/AlertProvider';


export default function useRouters() {
  const routeRef = useRef<any>(null)
  const router = useMemo(() => {
    function tempNavigate(...args: any) {
      routeRef.current?.navigate(...args)
    }
    routeRef.current = createBrowserRouter([
      {
        element:
          <NextUIProvider navigate={tempNavigate} className="app-root h-screen max-h-full flex flex-col">
            <ExerciseDataInfoModal>
              <AlertProvider>
                <DefaultLayout>
                  <BottomNaviProvider>
                    <Outlet />
                  </BottomNaviProvider>
                </DefaultLayout>
              </AlertProvider>
            </ExerciseDataInfoModal>
          </NextUIProvider>,
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

    return routeRef.current
  }, [])
  return router
}