import { createClient } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';
import { useUser } from '../context/UserContext';

// localStorage Key
const USER_INFO_KEY = 'userInfo';

// supabase 설정
const supabaseEnv = {
  apiKey: import.meta.env.VITE_SUPABASE_API_KEY,
  projectURL: import.meta.env.VITE_SUPABASE_PROJECT_URL,
};

const supabaseClient = createClient(supabaseEnv.projectURL, supabaseEnv.apiKey);

const SUPABASE = createContext(null);

// supabase client를 사용하기 위한 provider 생성
export const SupabaseProvider = ({ children }) => {
  return (
    <SUPABASE.Provider value={supabaseClient}>{children}</SUPABASE.Provider>
  );
};

export const useSupabase = () => {
  const supabase = useContext(SUPABASE);
  if (!supabase) {
    new Error('supabase가 초기화 되지 않았습니다.');
    return;
  }
  return supabase;
};

const DTO_TYPE = {
  error: 'error',
  user: 'user',
};

// User data 매핑용 함수 (이메일 가입용은 아이디 확인 안하고 만든듯)
const dto = ({ type, rawData }) => {
  switch (type) {
    case DTO_TYPE.user:
      const userInfo = rawData?.data.user;
      return {
        user: {
          id: userInfo.id,
          email: userInfo.email,
          userName: userInfo.user_metadata.userName
            ? userInfo.user_metadata.userName
            : userInfo.email.slice(0, userInfo.email.indexOf('@')),
          profileImageUrl: userInfo.user_metadata.avatar_url
            ? userInfo.user_metadata.avatar_url
            : null,
        },
      };

    case DTO_TYPE.error:
      const { error: rawError } = rawData;
      return {
        error: {
          status: rawError.status,
          message: rawError.message,
        },
      };

    default:
      new Error('wrong type accessed');
      return;
  }
};

// 로컬 스토리지 사용 함수
const localStorageUtils = () => {
  const setItemToLocalStorage = (itemKey, item) => {
    const strItem = JSON.stringify(item);
    localStorage.setItem(itemKey, strItem);
  };
  const removeItemFromLocalStorage = (itemKey) => {
    localStorage.removeItem(itemKey);
  };
  return { setItemToLocalStorage, removeItemFromLocalStorage };
};

// 제공할 함수
export const useSupabaseAuth = () => {
  const supabase = useSupabase();
  const { setItemToLocalStorage, removeItemFromLocalStorage } =
    localStorageUtils();
  const { setUser } = useUser();

  // 회원가입
  const signUp = async ({ email, password, ...userData }) => {
    try {
      const data = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            avatar_url:
              'https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295396_1280.png',
            ...userData,
          },
          emailRedirectTo: import.meta.env.VITE_REDIRECT_URL,
        },
      });

      if (data.error) {
        throw new Error(data.error.message);
      }

      const { user } = dto({
        type: !data.error ? DTO_TYPE.user : DTO_TYPE.error,
        rawData: data,
      });

      setItemToLocalStorage(USER_INFO_KEY, { user });
      setUser(user);
    } catch (error) {
      throw new Error(error);
    }
  };

  // 로그인 (💩)
  const login = async ({ email, password }) => {
    try {
      const data = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      // console.log(data);
      const { user } = dto({
        type: !data.error ? DTO_TYPE.user : DTO_TYPE.error,
        rawData: data,
      });
      // console.log(user);
      setItemToLocalStorage(USER_INFO_KEY, { user });
      setUser(user);
    } catch (error) {
      throw new Error(error);
    }
  };

  // 로그아웃
  const logout = async () => {
    removeItemFromLocalStorage(USER_INFO_KEY);
    setUser(null);
    return await supabase.auth.signOut();
  };

  // 유저 정보 가져오기 (에러 처리 다시)
  const getUserInfo = async () => {
    try {
      const data = await supabase.auth.getUser();
      console.log(data);
      if (data.error) {
        console.log(data.error.name);
        console.log(data.error.message);
        // throw new Error(data.error);
      }

      const { user } = dto({
        type: !data.error ? DTO_TYPE.user : DTO_TYPE.error,
        rawData: data,
      });
      setItemToLocalStorage(USER_INFO_KEY, { user });
      setUser(user);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  // 카카오 로그인
  const loginWithKakao = async (redirectTo = null, ...otherOptions) => {
    try {
      const { _, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: redirectTo || import.meta.env.VITE_REDIRECT_URL,
          ...otherOptions,
        },
      });
      if (error) throw new Error(error);
      // 리턴문에 도달할 수 없음.
      // return await getUserInfo();
    } catch (error) {
      throw new Error(error);
    }
  };

  // 구글 로그인
  const loginWithGoogle = async (redirectTo = null, ...otherOptions) => {
    console.log(import.meta.env.VITE_REDIRECT_URL);
    try {
      // 여기서 리다이렉션?
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectTo || import.meta.env.VITE_REDIRECT_URL,
          ...otherOptions,
        },
      });
      if (error) throw new Error(error);
      // 리턴문에 도달할 수 없음.
      // return await getUserInfo();
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    signUp,
    login,
    logout,
    loginWithKakao,
    loginWithGoogle,
    getUserInfo,
  };
};
