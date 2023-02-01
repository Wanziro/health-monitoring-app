export interface IUser {
  token: string;
  fullName: string;
  email: string;
  role: string;
}
export interface IAction {
  type: string;
  payload: any;
}

export interface IAppConfig {
  backendUrl: string;
  imageUrl: string;
  imageUploadUrl: string;
}
