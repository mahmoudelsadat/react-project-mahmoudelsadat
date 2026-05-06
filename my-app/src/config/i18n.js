import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav_sleep": "SLEEP ARCHITECTURE",
      "nav_kinetic": "KINETIC LONGEVITY",
      "nav_checkout": "SECURE ALLOCATION",
      "nav_logout": "EXIT VAULT",
      "nav_login": "LOGIN",
      "nav_register": "REGISTER",
      
      "auth_init_profile": "INITIALIZE PROFILE",
      "auth_join_eco": "JOIN THE 2M ECOSYSTEM",
      "auth_exec_login": "EXECUTIVE LOGIN",
      "auth_access_alloc": "ACCESS YOUR ALLOCATIONS",
      "auth_email": "Corporate Email",
      "auth_pass_min": "Secure Password (Min. 6 Characters)",
      "auth_pass": "Secure Password",
      "auth_btn_create": "CREATE VAULT ACCESS",
      "auth_btn_auth": "AUTHORIZE ACCESS",
      "auth_btn_google_reg": "REGISTER VIA GOOGLE",
      "auth_btn_google_log": "AUTHENTICATE VIA GOOGLE",
      "auth_existing": "Existing profile?",
      "auth_access_portal": "Access portal",
      
      "assessment": "CLINICAL ASSESSMENT",
      "vault": "YOUR PROTOCOL VAULT",
      "sleep_q1": "Identify your primary friction point.",
      "sleep_q1_o1": "Onset Difficulty (Falling Asleep)",
      "sleep_q1_o2": "Maintenance (Waking Up Mid-Night)",
      "sleep_q1_o3": "Early Awakening",
      "sleep_q2": "Assess your evening cognitive state.",
      "sleep_q2_o1": "Hyper-aroused / Racing Thoughts",
      "sleep_q2_o2": "Physical Exhaustion, Mental Alertness",
      "sleep_q2_o3": "Complete Fatigue"
    }
  },
  ar: {
    translation: {
      "nav_sleep": "هندسة النوم",
      "nav_kinetic": "إطالة العمر الحركي",
      "nav_checkout": "تأكيد الحصة",
      "nav_logout": "خروج آمن",
      "nav_login": "تسجيل الدخول",
      "nav_register": "حساب جديد",
      
      "auth_init_profile": "إنشاء ملف شخصي",
      "auth_join_eco": "انضم لنظام 2M",
      "auth_exec_login": "دخول كبار العملاء",
      "auth_access_alloc": "الوصول لحصتك الخاصة",
      "auth_email": "البريد الإلكتروني للعمل",
      "auth_pass_min": "كلمة مرور آمنة (٦ أحرف كحد أدنى)",
      "auth_pass": "كلمة المرور",
      "auth_btn_create": "تفعيل الحساب",
      "auth_btn_auth": "تأكيد الدخول",
      "auth_btn_google_reg": "تسجيل عبر جوجل",
      "auth_btn_google_log": "دخول عبر جوجل",
      "auth_existing": "عندك حساب؟",
      "auth_access_portal": "ادخل للبوابة",
      
      "assessment": "التقييم السريري",
      "vault": "خزنتك الخاصة للبروتوكول",
      "sleep_q1": "حدد مشكلة النوم الأساسية.",
      "sleep_q1_o1": "صعوبة البداية (أرق أولي)",
      "sleep_q1_o2": "الاستمرار (الصحو المتكرر)",
      "sleep_q1_o3": "الصحو المبكر",
      "sleep_q2": "قيم نشاطك الذهني المسائي.",
      "sleep_q2_o1": "إفراط في التفكير / نشاط زائد",
      "sleep_q2_o2": "إرهاق بدني مع يقظة ذهنية",
      "sleep_q2_o3": "إرهاق كامل"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false, 
    interpolation: {
      escapeValue: false, 
    }
  });

export default i18n;