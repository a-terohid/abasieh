export enum ROLE  {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
}


export enum TRUSTEES_ROLE {
    BOSS = "رئیس هیئت امنا",
    NORMAL = "عضو هیئت امنا",
    PLUS = "عضو علی‌البدل"
}

export enum ERROR {
    SERVER_ERROR = "خطایی در سرور رخ داده است!",
    USER_EXIST = "این ادمین قبلاً وجود دارد!",
    CANT_FIND_USER = "این کاربر یافت نشد!",
    CANT_FIND_ADMIN = "این مدیر یافت نشد!",
    CANT_FIND_ZIARTNAMEH = "این زیارت نامه یافت نشد!",
    CANT_FIND_ZEKR = "این ذکر نامه یافت نشد!",
    CANT_FIND_CEREMONY = "این مراسم یافت نشد!",
    CANT_FIND_TRUSTEES = "این عضو یافت نشد!",
    CANT_FIND_OLD_SLAVES = "این پیر غلام یافت نشد!",
    INVALID_DATA = "لطفاً داده‌های معتبر وارد کنید!",
    INVALID_YEAR = "همچین سالی وجود ندارد!",
    REPEAT_PASSWORD = "رمز عبور و تکرار آن یکسان نیستند!",
    CREATE_ACCOUNT = "لطفاً ابتدا یک حساب کاربری ایجاد کنید!",
    WRONG_PASSWORD = "ایمیل یا رمز عبور نادرست است!",
    PROBLEM = "مشکلی وجود دارد!",
    LOGIN = "لطفاً وارد حساب کاربری خود شوید!",
    NO_ADMIN = "هیچ مدیری وجود ندارد!",
    NO_ZIARTNAMEH = "هیچ زیارت نامه وجود ندارد!",
    NO_YEAR = "هیچ سالی نامه وجود ندارد!",
    NO_ZEKR = "هیچ ذکری وجود ندارد!",
    NO_CEREMNOY = "هیچ مراسمی وجود ندارد!",
    NO_TRUSTEES = "هیچ عضوی وجود ندارد!",
    NO_OLD_SLAVES = "هیچ پیر غلامی وجود ندارد!",
    AD_ACCESS = "دسترسی شما به این عمل محدود شده است!",
    ACCESS_DENIED = "دسترسی رد شد!",
    YEAR_EXIST = "این سال قبلا اضافه شده است!",
    ZIARTNAMEH_DONT_EXIST = "همچین زیارت نامه ای یافت نشد!",
    CEREMONY_DONT_EXIST = "همچین مراسمی یافت نشد!",
    OLD_SLAVES_EXIST = "همچین پیرغلامی یافت نشد!",
    ZEKR_DONT_EXIST = "همچین ذکری یافت نشد!"
}

export enum MESSAGE {
    NEW_ADMIN = "مدیر با موفقیت ایجاد شد!",
    NEW_TRUSTEES = " عضو با موفقیت ایجاد شد!",
    NEW_OLD_SLAVES = " پیر غلام با موفقیت ایجاد شد!",
    NEW_CERMONY = " مراسم با موفقیت ایجاد شد!",
    NEW_BLOG = " مقاله با موفقیت ایجاد شد!",
    ADMIN_DELETE = "مدیر با موفقیت حذف شد!",
    NEW_ZIARTNAMEH = "زیارت‌نامه با موفقیت اضافه شد!",
    ZIARTNAMEH_DELETE = "زیارت‌نامه با موفقیت حذف شد!",
    OLD_SLAVES_DELETE = "پیر غلام با موفقیت حذف شد!",
    CEREMONY_DELETE = "مراسم با موفقیت حذف شد!",
    TRUSTEES_DELETE = "عضو با موفقیت حذف شد!",
    ZEKR_DELETE = "ذکر با موفقیت حذف شد!",
    ZIARTNAMEH_EDIT = "زیارت‌نامه با موفقیت ویرایش شد!",
    OLD_SLAVES_EDIT = "پیر غلام با موفقیت ویرایش شد!",
    CEREMONY_EDIT = "مراسم با موفقیت ویرایش شد!",
    TRUSTEES_EDIT = "عضو با موفقیت ویرایش شد!",
    ZEKR_EDIT = "ذکر با موفقیت ویرایش شد!",
    NEW_YEARS = "سال جدید ساخته شد!",
    YEAR_DELETED = "سال با موفقیت خذف شد!",
    NEW_ZEKR = "ذکر با موفقیت اضافه شد",
    SEND_MESSAGE = "پیام با موفقیت ارسال شد!"
}