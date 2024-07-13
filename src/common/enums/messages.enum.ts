export enum SignUpValidation {
  PasswordLength = 'Password must be between 8 - 32',
  PasswordNotEmpty = 'Password field cannot be empty',
  UsernameLength = 'Username must be between 5 - 25',
  UsernameNotEmpty = 'Username field cannot be empty',
}
export enum NotFoundMessages {
  UserNotFound = 'کاربری با این مشخصات یافت نشد',
}
export enum BadRequestMessages {
  LoginFailed = 'نام کاربری یا رمز عبور اشتباه می باشد',
}
export enum ServerErrorMessages {
  SomethingWentWrong = 'مشکلی در ارتباطات سرور بوجود آمد دوباره تلاش کنید',
}

export enum PublicMessages {
  Created = 'با موفقیت ایجاد شد',
  Updated = 'با موفقیت به روز رسانی شد',
  Deleted = 'با موفقیت حذف شد',
  LoggedIn = 'با موفقیت وارد شدید ',
}

export enum AuthMessages {
  TryAgain = 'لطفا دوباره تلاش کنید',
}
