import useFetch from './hooks/useFetch';
import { Route, Routes } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import SearchResult from './pages/SearchResult';
import { useDarkMode } from './context/DarkModeContext';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/search?' element={<SearchResult />} />
          <Route path='/details/:id' element={<MovieDetail />} />
        </Route>
      </Routes>
    </>
  );
}

// 슬라이드를 여러개 띄우기 (각각 다른 주제로 데이터를 받아와서)
// 가장 밑엔 무한 스크롤 (내릴때 로딩)
// 그럼 데이터를 여러개 fetching 해와야 하니까 Promise.all ? (그럼 useFetch 수정해야하나)
