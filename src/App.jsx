import { Route, Routes } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import SearchResult from './pages/SearchResult';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import MyList from './pages/MyList';
import { useSupabaseAuth } from './hooks/useSupabaseAuth';
import { useEffect } from 'react';
import { UserContextProvider } from './context/UserContext';
import { useUser } from './context/UserContext';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function AppRoutes() {
  const { getUserInfo } = useSupabaseAuth();
  const { user, setUser } = useUser();

  useEffect(() => {
    // 리다이렉션 후 페이지에서 로그인
    getUserInfo();

    // 초기 로드 시 사용자 정보 설정
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))?.user;
    setUser(userInfo);
  }, []);

  console.log('user:', user);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/search?' element={<SearchResult />} />
        <Route path='/details/:id' element={<MovieDetail />} />

        {/* 인증이 필요한 라우트들 */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/mylist'
          element={
            <ProtectedRoute>
              <MyList />
            </ProtectedRoute>
          }
        >
          <Route path='favorites' element={<MyList />} />
          <Route path='watched' element={<MyList />} />
        </Route>

        {/* 인증 관련 페이지들 */}
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <UserContextProvider>
      <AppRoutes />
    </UserContextProvider>
  );
}

// 슬라이드를 여러개 띄우기 (각각 다른 주제로 데이터를 받아와서)
// 가장 밑엔 무한 스크롤 (내릴때 로딩)
// 그럼 데이터를 여러개 fetching 해와야 하니까 Promise.all ? (그럼 useFetch 수정해야하나)
