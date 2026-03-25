import { authStorage, api } from '@configs/axios'
import auth from '@configs/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginData, RefreshData } from '@context/requestTypes';
import { ResponseType } from '@context/types';

const unwrap = (responseData: any) => responseData?.data ?? responseData



export async function postLogin(
  email: string,
  password: string
): Promise<LoginData> {
  const { data } = await api.post<ResponseType<LoginData>>(
    "/login",
    { email, password }
  );

  return data.data;
}

export const postRefreshToken = async (): Promise<RefreshData> => {
  const { data } = await api.post<ResponseType<RefreshData>>(
    auth.refreshEndpoint
  );
  const payload = data.data;
  await authStorage.set(payload.token);
  await AsyncStorage.setItem(
    auth.userDataKeyName,
    JSON.stringify(payload.user)
  );

  return payload;
};

export const postLogout = async (): Promise<void> => {
  await api.post(auth.logoutEndpoint);
  await authStorage.set(null);
  await AsyncStorage.removeItem(auth.userDataKeyName);
};
