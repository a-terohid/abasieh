export enum ROLE  {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
}


export enum ERROR {
    SERVER_ERROR = "خطایی در سرور رخ داده است!",
    USER_EXIST = "این ادمین قبلاً وجود دارد!",
    CANT_FIND_USER = "این کاربر یافت نشد!",
    CANT_FIND_ADMIN = "این مدیر یافت نشد!",
    CANT_FIND_ZIARTNAMEH = "این زیارت نامه یافت نشد!",
    INVALID_DATA = "لطفاً داده‌های معتبر وارد کنید!",
    INVALID_YEAR = "همچین سالی وجود ندارد!",
    REPEAT_PASSWORD = "رمز عبور و تکرار آن یکسان نیستند!",
    CREATE_ACCOUNT = "لطفاً ابتدا یک حساب کاربری ایجاد کنید!",
    WRONG_PASSWORD = "ایمیل یا رمز عبور نادرست است!",
    PROBLEM = "مشکلی وجود دارد!",
    LOGIN = "لطفاً وارد حساب کاربری خود شوید!",
    NO_ADMIN = "هیچ مدیری وجود ندارد!",
    NO_ZIARTNAMEH = "هیچ زیارت نامه وجود ندارد!",
    AD_ACCESS = "دسترسی شما به این عمل محدود شده است!",
    ACCESS_DENIED = "دسترسی رد شد!",
    YEAR_EXIST = "این سال قبلا اضافه شده است!",
}

export enum MESSAGE {
    NEW_ADMIN = "مدیر با موفقیت ایجاد شد!",
    ADMIN_DELETE = "مدیر با موفقیت حذف شد!",
    NEW_ZIARTNAMEH = "زیارت‌نامه با موفقیت اضافه شد!",
    ZIARTNAMEH_DELETE = "زیارت‌نامه با موفقیت حذف شد!",
    ZIARTNAMEH_EDIT = "زیارت‌نامه با موفقیت ویرایش شد!",
    NEW_YEARS = "سال جدید ساخته شد!",
    YEAR_DELETED = "سال با موفقیت خذف شد!",
    NEW_ZEKR = "ذکر با موفقیت اضافه شد"
}