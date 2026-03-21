import { getAxios, authStorage } from '@configs/axios'
import auth from '@configs/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

const unwrap = (responseData: any) => responseData?.data ?? responseData


export const postLogin = async (email: string, password: string) => {
  const { data } = await getAxios().post("/login", { email, password });
  return data?.data ?? data;
};


export const postRefreshToken = async () => {
  const { data } = await getAxios().post(auth.refreshEndpoint)
  const payload = unwrap(data)
  await authStorage.set(payload?.token ?? null)
  if (payload?.user) {
    await AsyncStorage.setItem(auth.userDataKeyName, JSON.stringify(payload.user))
  }
  return payload
}

export const postLogout = async () => {
  await getAxios().post(auth.logoutEndpoint)
  await authStorage.set(null)
  await AsyncStorage.removeItem(auth.userDataKeyName)
}

