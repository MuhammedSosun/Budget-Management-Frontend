import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// birden çok dil olunca ne yapılabilir
const resources = {
  en: {
    translation: {
      dashboard_title: "Expense Trend",
      welcome_dashboard: "Welcome to your dashboard",
      new_transaction: "New Transaction",
      edit_transaction: "Edit Transaction",
      new_category: "New Category",
      edit_category: "Edit Category",
      add_transaction_this: "Add Transaction",
      edit_transaction_this: "Edit Transaction",
      title: "Title",
      amount: "Amount",
      category: "Category",
      date: "Date",
      transaction_type: "Transaction Type",
      title_placeholder: "Grocery shopping",
      amount_placeholder: "100",
      currency_label: "Currency",
      category_placeholder: "Groceries",
      date_placeholder: "2022-01-01",
      transaction_type_placeholder: "Income or Expense",
      transaction_list__title: "Last Transactions",
      spending_breakdown: "Spending Breakdown",
      login: "Login",
      register: "Register",
      logout: "Logout",
      dashboard: "Dashboard",
      total_balance: "Total Balance",
      total_income: "Total Income",
      total_expense: "Total Expense",
      transactions: "Transactions",
      edit: "Edit",
      delete: "Delete",
      settings: "Settings",
      login_subtitle: "Enter your information to access your account",
      register_subtitle: "Create an account to start managing your budget.",
      dont_have_account: "Don't have an account?",
      already_have_account: "Already have an account?",

      first_name: "First Name",
      last_name: "Last Name",
      email: "Email",
      password: "Password",

      weekly: "Weekly",
      monthly: "Monthly",
      all: "All",
      income: "Income",
      expense: "Expense",
      start_date: "Start Date",
      end_date: "End Date",
      reset: "Reset",
      no_transactions: "No transactions found.",

      confirm_delete: "Confirm Delete",
      delete_confirm:
        "Are you sure you want to delete this? This action cannot be undone.",
      yes_delete: "Yes, Delete",
      no_delete: "Cancel",

      loading: {
        keep_going: "Entering Account, Please wait...",
        register: "Creating your account...",
        register_success: "Registration successful! Please login.",
        login: "Logging in...",
      },

      categories: {
        market: "Grocery",
        health: "Health",
        food: "Food & Drink",
        transport: "Transportation",
        rent: "Rent",
        entertainment: "Entertainment",
        education: "Education",
        bills: "Billing",
        other: "Other",
        salary: "Salary",
        dividend: "Dividend Income",
        trade_profit: "Trade Profit",
        freelance: "Freelance",
        etf_investment: "ETF Investment",
        custom: "Add custom category",
        add_custom_title: "Add custom category",
        custom_placeholder: "Ex: Coffee, Sport, Education",
      },
      profile: {
        profile: "Profile",
        active_account: "Active account",
        user: "Budget Management user",

        photo_change: "Change photo",
        profile_photo_updated: "Profile photo updated",
        profile_photo_update_failed: "Profile photo update failed",

        personal_info: "Personal information",
        personal_info_description:
          "Basic user information displayed on your profile.",
        edit: "Edit",
        cancel: "Cancel",
        save: "Save",

        first_name: "First name",
        last_name: "Last name",
        email: "Email",
        email_info: "Email address cannot be changed from this screen.",
        first_name_placeholder: "Enter your first name",
        last_name_placeholder: "Enter your last name",

        profile_info_updated: "Profile information updated",
        profile_info_update_failed: "Profile information update failed",
        first_last_name_required: "First name and last name are required.",

        password: "Password",
        change_password: "Change password",
        update_info: "Update information",
        logout: "Logout",

        security: "Account security",
        security_description:
          "Manage your password and security settings here.",

        current_password: "Current password",
        current_password_placeholder: "Enter your current password",
        new_password: "New password",
        new_password_placeholder: "Enter your new password",
        confirm_password: "Confirm password",
        confirm_password_placeholder: "Confirm your new password",

        all_password_fields: "All password fields must be filled.",
        new_password_min_length: "New password must be at least 6 characters.",
        new_password_not_match: "New passwords do not match.",
        new_password_same_as_current:
          "New password cannot be the same as your current password.",

        password_updated: "Password updated",
        password_updated_desc: "Your password has been updated successfully.",
        password_update_failed: "Password update failed",
        password_update_failed_desc:
          "We could not update your password. Please check your current password.",

        session: "Session",
        session_description:
          "Your active session information is protected by the system.",
        secure: "Secure",
        password_description: "Change password or manage session settings.",
      },
      chart: {
        pzt: "Mon",
        sal: "Tue",
        çar: "Wed",
        per: "Thu",
        cum: "Fri",
        cmt: "Sat",
        paz: "Sun",
        oca: "Jan",
        şub: "Feb",
        mar: "Mar",
        nis: "Apr",
        may: "May",
        haz: "Jun",
        tem: "Jul",
        agu: "Aug",
        eyl: "Sep",
        eke: "Oct",
        kas: "Nov",
        ara: "Dec",
      },

      toast: {
        login_success: "Login successful",
        login_failed: "Login failed",
        register_success: "Account created",
        register_failed: "Registration failed",
        system_error: "Something went wrong",

        login_welcome: "Welcome back!",
        register_welcome: "Your account is ready. You can now log in.",

        general: "Could not connect to the server.",
        login_failed_description: "Please check your email and password.",
        register_failed_description: "Please review the form and try again.",
        system_error_description: "Please try again in a few moments.",

        transaction_updated: "Transaction updated",
        transaction_updated_desc:
          "Your transaction has been updated successfully.",
        transaction_created: "Transaction created",
        transaction_created_desc:
          "Your transaction has been created successfully.",
        transaction_error: "Transaction failed",
        transaction_error_desc:
          "We could not complete this transaction. Please try again.",
        transaction_deleted: "Transaction deleted",
        transaction_deleted_desc:
          "Your transaction has been deleted successfully.",
        transaction_delete_failed: "Delete failed",
        transaction_delete_failed_desc:
          "We could not delete this transaction. Please try again.",

        google_login_failed: "Google sign-in failed",
        google_login_failed_desc:
          "We could not sign you in with Google. Please try again.",

        register_success_desc:
          "Your account has been created successfully. Please log in.",

        email_or_password_failed: "Invalid email or password",
        email_or_password_failed_desc:
          "Please check your credentials and try again.",
      },
      filters: "Filters",
      newest_to_oldest: "Newest to oldest",
      oldest_to_newest: "Oldest to newest",
      last_7_days: "Last 7 days",
      last_30_days: "Last 30 days",
      search_placeholder: "Search...",
      sort_created_at: "Last Added",
      this_month: "This Month",

      nav: {
        features: "Features",
        how_it_works: "How It Works",
      },
      pagination: {
        previous: "Previous",
        next: "Next",
      },
      validation: {
        transaction_title_min_length: "Title must be at least 3 characters.",
        transaction_title_max_length: "Title can be at most 50 characters.",

        transaction_amount_invalid: "Please enter a valid number.",
        transaction_amount_positive: "Amount must be greater than 0.",
        transaction_amount_max: "Limit exceeded.",
        transaction_amount_decimal: "You can enter up to 2 decimal places.",

        transaction_category_min_length:
          "Category must be at least 3 characters.",

        transaction_date_required: "Date is required.",

        transaction_description_max_length:
          "Description can be at most 200 characters.",
      },

      errors: {
        email_required: "Email is required.",
        email_invalid: "Please enter a valid email address.",
        password_required: "Password is required.",
        password_min: "Password must be at least 6 characters.",
        first_name_required: "First name is required.",
        last_name_required: "Last name is required.",
        first_name_min: "First name must be at least 3 characters.",
        last_name_min: "Last name must be at least 3 characters.",
        general: "Server connection failed.",
        system: "A system error occurred.",
      },
    },
  },
  tr: {
    translation: {
      dashboard_title: "Harcama Trendi",
      welcome_dashboard: "Hesabınıza Hoş Geldiniz",
      new_transaction: "Yeni İşlem",
      spending_breakdown: "Harcama Dağılımı",
      edit_transaction: "İşlem Güncelle",
      new_category: "Yeni Kategori",
      edit_category: "Kategori Güncelle",
      add_transaction_this: "İşlem Ekle",
      edit_transaction_this: "İşlemi Güncelle",
      title: "Başlık",
      amount: "Miktar",
      settings: "Ayarlar",
      transaction_list__title: "Son İşlemler",
      category: "Kategori",
      date: "Tarih",
      transaction_type: "İşlem Türü",
      title_placeholder: "Market alışverişi",
      amount_placeholder: "100",
      category_placeholder: "Market",
      date_placeholder: "2022-01-01",
      transaction_type_placeholder: "Gelir veya Gider",
      login: "Giriş Yap",
      register: "Kayıt Ol",
      logout: "Çıkış Yap",
      dashboard: "Gösterge Paneli",
      total_balance: "Toplam Bakiye",
      total_income: "Toplam Gelir",
      total_expense: "Toplam Gider",
      transactions: "İşlemler",
      edit: "Düzenle",
      delete: "Sil",
      cancel: "İptal",

      login_subtitle: "Hesabınıza erişmek için bilgilerinizi girin.",
      register_subtitle:
        "Bütçenizi yönetmeye başlamak için bir hesap oluşturun.",
      dont_have_account: "Hesabınız yok mu?",
      already_have_account: "Zaten bir hesabınız var mı?",

      first_name: "Ad",
      last_name: "Soyad",
      email: "E-posta",
      password: "Şifre",

      weekly: "Haftalık",
      monthly: "Aylık",
      all: "Tümü",
      income: "Gelir",
      expense: "Gider",
      start_date: "Başlangıç Tarihi",
      end_date: "Bitiş Tarihi",
      reset: "Sıfırla",
      no_transactions: "Henüz bir işlem bulunamadı.",
      currency_label: "Para Birimi",
      confirm_delete: "Silmeyi Onayla",
      delete_confirm:
        "Bu harcamayı silmek istediğine emin misin? Bu işlem geri alınamaz.",
      yes_delete: "Evet, Sil",
      no_delete: "Vazgeç",

      loading: {
        keep_going: "Hesabınıza Giriş yapılıyor, Lütfen bekle...",
        register: "Hesabınız oluşturuluyor...",
        register_success: "Kayıt başarılı! Lütfen giriş yapın.",
        login: "Giriş yapılıyor...",
      },

      nav: {
        features: "Özellikler",
        how_it_works: "Nasıl Çalışır?",
      },
      pagination: {
        previous: "Geri",
        next: "İleri",
      },
      validation: {
        transaction_title_min_length: "Başlık en az 3 karakter olmalıdır.",
        transaction_title_max_length: "Başlık en fazla 50 karakter olabilir.",

        transaction_amount_invalid: "Lütfen geçerli bir rakam giriniz.",
        transaction_amount_positive: "Miktar 0'dan büyük olmalıdır.",
        transaction_amount_max: "Limit aşıldı.",
        transaction_amount_decimal:
          "En fazla 2 ondalık basamak girebilirsiniz.",

        transaction_category_min_length: "Kategori en az 3 karakter olmalıdır.",

        transaction_date_required: "Tarih alanı zorunludur.",

        transaction_description_max_length:
          "Açıklama en fazla 200 karakter olabilir.",
      },
      categories: {
        market: "Market",
        health: "Sağlık",
        food: "Yemek & İçecek",
        transport: "Ulaşım",
        rent: "Kira",
        entertainment: "Eğlence",
        education: "Eğitim",
        bills: "Faturalar",
        other: "Diğer",
        salary: "Maaş",
        dividend: "Temettü Geliri",
        trade_profit: "Borsa / Trade",
        freelance: "Ek İş / Freelance",
        etf_investment: "ETF Yatırımı",
        custom: "Özel Kategori Ekle",
        add_custom_title: "Özel Kategori Ekle",
        custom_placeholder: "Örn: Kahve, Spor, Eğitim",
      },
      profile: {
        profile: "Profil",
        active_account: "Aktif hesap",
        user: "Budget Management kullanıcısı",

        photo_change: "Fotoğrafı değiştir",
        profile_photo_updated: "Profil fotoğrafı güncellendi",
        profile_photo_update_failed: "Profil fotoğrafı güncellenemedi",

        personal_info: "Kişisel bilgiler",
        personal_info_description:
          "Profilinde görünen temel kullanıcı bilgilerin.",
        edit: "Düzenle",
        cancel: "İptal",
        save: "Kaydet",

        first_name: "Ad",
        last_name: "Soyad",
        email: "E-posta",
        email_info: "E-posta adresi bu ekrandan değiştirilemez.",
        first_name_placeholder: "Adını gir",
        last_name_placeholder: "Soyadını gir",

        profile_info_updated: "Profil bilgileri güncellendi",
        profile_info_update_failed: "Profil bilgileri güncellenemedi",
        first_last_name_required: "Ad ve soyad zorunludur.",

        password: "Şifre",
        change_password: "Şifre değiştir",
        update_info: "Bilgileri güncelle",
        logout: "Çıkış yap",

        security: "Hesap güvenliği",
        security_description:
          "Şifre ve güvenlik ayarlarını buradan yönetebilirsin.",

        current_password: "Mevcut şifre",
        current_password_placeholder: "Mevcut şifreni gir",
        new_password: "Yeni şifre",
        new_password_placeholder: "Yeni şifreni gir",
        confirm_password: "Şifre tekrarı",
        confirm_password_placeholder: "Yeni şifreni tekrar gir",

        all_password_fields: "Tüm şifre alanları doldurulmalıdır.",
        new_password_min_length: "Yeni şifre en az 6 karakter olmalıdır.",
        new_password_not_match: "Yeni şifreler eşleşmiyor.",
        new_password_same_as_current: "Yeni şifre mevcut şifrenle aynı olamaz.",

        password_updated: "Şifre güncellendi",
        password_updated_desc: "Şifren başarıyla güncellendi.",
        password_update_failed: "Şifre güncellenemedi",
        password_update_failed_desc:
          "Şifren güncellenemedi. Lütfen mevcut şifreni kontrol et.",

        session: "Oturum",
        session_description:
          "Aktif oturum bilgilerin sistem tarafından korunur.",
        secure: "Güvende",
        password_description: "Şifreni değiştir veya oturum ayarlarını yönet.",
      },

      chart: {
        pzt: "Pzt",
        sal: "Sal",
        çar: "Çar",
        per: "Per",
        cum: "Cum",
        cmt: "Cmt",
        paz: "Paz",
        oca: "Oca",
        şub: "Şub",
        mar: "Mar",
        nis: "Nis",
        may: "May",
        haz: "Haz",
        tem: "Tem",
        agu: "Agu",
        eyl: "Eyl",
        eke: "Eke",
        kas: "Kas",
        ara: "Ara",
      },
      toast: {
        transaction_deleted: "İşlem silindi",
        transaction_deleted_error: "İşlem silinirken hata oluştu",
        login_success: "Giriş başarılı",
        login_failed: "Giriş başarısız",
        register_success: "Kayıt başarılı",
        register_failed: "Kayıt başarısız",
        system_error: "Sistem hatası",
        login_welcome: "Tekrar hoş geldiniz!",
        register_welcome: "Artık giriş yapabilirsiniz.",
        general: "Sunucu bağlantı hatası.",
        login_failed_description:
          "Lütfen e-posta adresinizi ve şifrenizi kontrol edin.",
        register_failed_description: "Lütfen gerekli alanları kontrol edin.",
        system_error_description: "Lütfen daha sonra tekrar deneyin.",
        transaction_updated: "İşlem güncellendi",
        transaction_updated_desc: "İşlem başarıyla güncellendi.",
        transaction_created: "İşlem eklendi",
        transaction_created_desc: "İşlem başarıyla eklendi.",
        transaction_error: "İşlem hatası",
        transaction_error_desc: "İşlem hatası",
        transaction_deleted_desc: "İşlem başarıyla silindi.",
        transaction_delete_failed_desc: "İşlem silme hatası",
        transaction_updated_failed_desc: "İşlem güncelleme hatası",
        google_login_failed: "Google ile giriş başarısız",
        google_login_failed_desc:
          "Google ile giriş başarısız, Lütfen tekrar deneyin.",
        register_success_desc:
          "Hesabınız başarıyla oluşturuldu. Lütfen giriş yapın.",
        email_or_password_failed: "Kullanıcı adı veya şifre hatalı",
        email_or_password_failed_desc:
          "Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.",
      },
      filters: "Filtreler",
      newest_to_oldest: "En yeniden eskiye",
      oldest_to_newest: "En eskiden en yeniye",
      last_7_days: "Son 7 gün",
      last_30_days: "Son 30 gün",
      search_placeholder: "İşlemlerde ara...",
      sort_created_at: "Son Eklenenler",
      this_month: "Bu Ay",
      search: "Arama",
      errors: {
        email_required: "E-posta alanı zorunludur.",
        email_invalid: "Geçerli bir e-posta adresi giriniz.",
        password_required: "Şifre alanı zorunludur.",
        password_min: "Şifre en az 6 karakter olmalıdır.",
        first_name_required: "Ad alanı zorunludur.",
        last_name_required: "Soyad alanı zorunludur.",
        first_name_min: "Ad en az 3 karakter olmalıdır.",
        last_name_min: "Soyad en az 3 karakter olmalıdır.",
        general: "Sunucuyla bağlantı kurulamadı.",
        system: "Bir sistem hatası oluştu.",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "tr",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
