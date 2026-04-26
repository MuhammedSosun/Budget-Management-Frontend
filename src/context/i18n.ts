import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      dashboard_title: "Expense Trend",
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
      },

      nav: {
        features: "Features",
        how_it_works: "How It Works",
      },
      pagination: {
        previous: "Previous",
        next: "Next",
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
      new_transaction: "Yeni İşlem",
      spending_breakdown: "Harcama Dağılımı",
      edit_transaction: "İşlem Güncelle",
      new_category: "Yeni Kategori",
      edit_category: "Kategori Güncelle",
      add_transaction_this: "İşlem Ekle",
      edit_transaction_this: "İşlemi Güncelle",
      title: "Başlık",
      amount: "Miktar",
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

      categories: {
        market: "Market",
        health: "Sağlık",
        food: "Yemek & İçecek",
        transport: "Ulaşım",
      },

      nav: {
        features: "Özellikler",
        how_it_works: "Nasıl Çalışır?",
      },
      pagination: {
        previous: "Geri",
        next: "İleri",
      },

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
