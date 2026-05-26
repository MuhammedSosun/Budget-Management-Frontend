import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      no_active_workspace: "No active workspace found.",
      errors: {
        email_required: "Email is required.",
        email_invalid: "Please enter a valid email address.",
        password_required: "Password is required.",
        password_min: "Password must be at least 6 characters.",
        emailNotFound: "Email information not found.",
        invalidCodeLength: "Please enter a 6-digit verification code.",
        wrongCode: "Verification code is incorrect or expired.",
        resendFailed: "Could not resend the code.",
        notRegistered:
          "You need to complete the registration process before coming to the verification screen.",
        general: "Something went wrong.",
        system: "A system error occurred.",
        firstName_min: "First name must be at least 2 characters.",
        lastName_min: "Last name must be at least 2 characters.",
      },
      dashboard_title: "Expense Trend",
      welcome_dashboard: "Welcome to your dashboard",
      new_transaction: "New Transaction",
      edit_transaction: "Edit Transaction",
      new_category: "New Category",
      edit_category: "Edit Category",
      add_transaction_this: "Add Transaction",
      edit_transaction_this: "Edit Transaction",
      last_transactions: "Last Transactions",
      last_transactions_description:
        "Recent transaction movements can be viewed here.",
      view_all: "View All",
      no_transactions: "No transactions yet.",
      transactions_subtitle:
        "Income and expense movements can be managed here.",
      server_errors: {
        USER_NOT_FOUND: "Kullanıcı bulunamadı.",
        INVALID_CREDENTIALS: "E-posta veya şifre hatalı.",
        EMAIL_NOT_VERIFIED: "Lütfen önce e-posta adresinizi doğrulayın.",
        USER_ALREADY_EXISTS: "Bu kullanıcı zaten mevcut.",

        UNAUTHORIZED: "Yetkisiz istek.",
        FORBIDDEN: "Erişim engellendi.",
        NOT_FOUND: "İstenen kaynak bulunamadı.",
        INTERNAL_SERVER_ERROR: "Sunucu hatası oluştu.",
        VALIDATION_ERROR: "Geçersiz veri gönderildi.",

        TOKEN_NOT_FOUND: "Token bulunamadı.",
        INVALID_OR_EXPIRED_TOKEN: "Token geçersiz veya süresi dolmuş.",
        ACCESS_TOKEN_EXPIRED:
          "Oturum süreniz doldu. Lütfen tekrar giriş yapın.",
        ACCESS_TOKEN_INVALID: "Oturum bilginiz geçersiz.",
        REFRESH_TOKEN_NOT_FOUND: "Refresh token bulunamadı.",
        REFRESH_TOKEN_INVALID: "Refresh token geçersiz.",
        REFRESH_TOKEN_EXPIRED:
          "Refresh token süresi doldu. Lütfen tekrar giriş yapın.",

        RATE_LIMIT_EXCEEDED:
          "Çok fazla istek gönderdiniz. Lütfen biraz bekleyin.",
        RATE_LIMIT_GENERAL:
          "Çok fazla istek gönderdiniz. Lütfen biraz bekleyin.",
        RATE_LIMIT_TOO_FAST:
          "Çok hızlı işlem yapıyorsunuz. Lütfen biraz bekleyin.",
        RATE_LIMIT_EMAIL_RESEND:
          "Yeni doğrulama kodu istemeden önce lütfen 1 dakika bekleyin.",
        RATE_LIMIT_REFRESH:
          "Çok fazla oturum yenileme isteği gönderildi. Lütfen daha sonra tekrar deneyin.",

        IDEMPOTENCY_KEY_REUSED:
          "Bu istek daha önce işlendi. Lütfen yeni bir istek anahtarı kullanın.",
        IDEMPOTENCY_KEY_CONFLICT:
          "Bu istek anahtarı farklı bir veriyle kullanılmış. Lütfen yeni bir istek anahtarı kullanın.",

        WORKSPACE_NOT_FOUND: "Workspace bulunamadı.",
        WORKSPACE_ALREADY_EXISTS: "Bu workspace zaten mevcut.",
        WORKSPACE_ACCESS_DENIED: "Bu workspace için yetkiniz yok.",
        WORKSPACE_CREATE_FAILED: "Workspace oluşturulamadı.",
        DEFAULT_WORKSPACE_CREATE_FAILED: "Varsayılan workspace oluşturulamadı.",
        WORKSPACE_OWNER_MEMBER_CREATE_FAILED:
          "Workspace sahibi üye olarak eklenemedi.",

        WORKSPACE_MEMBER_NOT_FOUND: "Workspace üyesi bulunamadı.",
        WORKSPACE_MEMBER_NOT_IN_WORKSPACE:
          "Bu üye seçili workspace'e ait değil.",
        WORKSPACE_MEMBER_ROLE_UPDATE_FAILED: "Üye rolü güncellenemedi.",
        WORKSPACE_MEMBER_USER_NOT_FOUND: "Bu üyeye bağlı kullanıcı bulunamadı.",
        OWNER_ROLE_CANNOT_BE_CHANGED: "OWNER rolü değiştirilemez.",
        OWNER_CANNOT_BE_REMOVED: "OWNER workspace'ten çıkarılamaz.",
        CANNOT_REMOVE_YOURSELF_FROM_WORKSPACE:
          "Kendinizi workspace'ten çıkaramazsınız.",

        WORKSPACE_INVITATION_USER_NOT_FOUND:
          "Bu e-posta adresine sahip kullanıcı bulunamadı.",
        CANNOT_INVITE_YOURSELF: "Kendinize davet gönderemezsiniz.",
        USER_ALREADY_WORKSPACE_MEMBER: "Bu kullanıcı zaten workspace üyesi.",
        WORKSPACE_INVITATION_ALREADY_PENDING:
          "Bu kullanıcı için zaten bekleyen bir davet var.",
        WORKSPACE_INVITATION_NOT_FOUND: "Davet bulunamadı.",
        WORKSPACE_INVITATION_NOT_VALID: "Bu davet artık geçerli değil.",
        WORKSPACE_INVITATION_EXPIRED: "Bu davetin süresi dolmuş.",
        WORKSPACE_INVITATION_NOT_OWNED_BY_USER:
          "Bu davet bu kullanıcıya ait değil.",
        WORKSPACE_INVITATION_REJECT_FAILED: "Davet reddedilemedi.",
        WORKSPACE_INVITATION_WORKSPACE_NOT_FOUND:
          "Bu davete bağlı workspace bulunamadı.",

        GOOGLE_ACCOUNT_PASSWORD_NOT_AVAILABLE:
          "Bu hesap Google ile oluşturulmuş. Lütfen önce şifre belirleyin.",
        PASSWORD_MISMATCH: "Mevcut şifreniz hatalı.",
        PASSWORD_UPDATE_FAILED: "Şifre güncellenemedi.",
        PROFILE_UPDATE_FAILED: "Profil bilgileri güncellenemedi.",
        AVATAR_UPDATE_FAILED: "Profil fotoğrafı güncellenemedi.",

        TRANSACTION_CREATE_FAILED: "İşlem oluşturulamadı.",
        TRANSACTION_UPDATE_FAILED: "İşlem güncellenemedi.",
        TRANSACTION_DELETE_FAILED: "İşlem silinemedi.",
        TRANSACTION_NOT_FOUND: "İşlem bulunamadı.",
        TRANSACTION_ALREADY_EXISTS: "İşlem zaten mevcut.",
        INVALID_TRANSACTION_CURRENCY: "Geçersiz işlem para birimi.",
        INVALID_TRANSACTION_DATE_RANGE: "Geçersiz tarih aralığı.",

        EMAIL_ALREADY_VERIFIED: "E-posta adresi zaten doğrulanmış.",
        EMAIL_VERIFICATION_CODE_INVALID: "Doğrulama kodu geçersiz.",
        EMAIL_VERIFICATION_CODE_EXPIRED: "Doğrulama kodunun süresi dolmuş.",
        EMAIL_VERIFICATION_TOO_MANY_ATTEMPTS:
          "Çok fazla hatalı deneme yaptınız. Lütfen yeni kod isteyin.",
        TOO_MANY_ATTEMPTS: "Çok fazla hatalı deneme yaptınız.",

        GOOGLE_LOGIN_FAILED: "Google ile giriş başarısız.",
        GOOGLE_SIGNUP_FAILED: "Google ile kayıt başarısız.",
        GOOGLE_ACCOUNT_IS_NOT_VERIFIED: "Google hesabı doğrulanmamış.",
        GOOGLE_EMAIL_ACCOUNT_IS_NOT_VERIFIED:
          "Google e-posta hesabı doğrulanmamış.",
        GOOGLE_USER_ALREADY_EXISTS_EMAIL:
          "Bu e-posta Google girişi ile kullanılmalıdır.",
        GOOGLE_USER_NOT_FOUND: "Lütfen önce Google ile kayıt olun.",

        INVALID_IMAGE_FORMAT:
          "Sadece JPEG, PNG veya WEBP formatları desteklenir.",
        AVATAR_REQUIRED: "Profil fotoğrafı zorunludur.",
      },
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
      description: "Description",
      description_placeholder: "Write a description",
      weekly: "Weekly",
      monthly: "Monthly",
      all: "All",
      income: "Income",
      expense: "Expense",
      start_date: "Start Date",
      end_date: "End Date",
      reset: "Reset",
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
        too_many_requests: "Too many requests",
        too_many_requests_desc:
          "You have made too many requests. Please try again later.",
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
        active_workspace_not_found: "Active workspace not found",
        active_workspace_not_found_desc:
          "You need to select an active workspace to perform this action.",
      },
      created_by: "Created by",
      workspace_overview: "Workspace Overview",
      workspace: {
        workspaces: "Workspaces",
        update_success: "Workspace updated successfully",
        update_error: "Workspace update failed",
        updating: "Updating...",
        edit: "Edit",
        name: "Name",

        description: "Description",
        name_placeholder: "Enter workspace name",
        description_placeholder: "Enter workspace description",
        save: "Save",
        cancel: "Cancel",
        leave: "Leave",
        loading: "Workspace loading...",
        save_changes: "Save Changes",
        edit_workspace: "Edit Workspace",
        empty: "Workspace not found",
        roles: {
          owner: "Owner",
          editor: "Editor",
          viewer: "Viewer",
        },
        delete: "Delete",
        delete_workspace: "Delete Workspace",
        delete_workspace_confirm:
          "Do you want to delete this workspace? This action cannot be undone. Related transactions, members, and invitations will also be deleted.",
        delete_workspace_success: "Workspace deleted successfully.",
        delete_workspace_error:
          "An error occurred while deleting the workspace.",
        default_workspace_cannot_be_deleted:
          "The default workspace cannot be deleted.",
        only_owner_can_delete_workspace:
          "You must be an OWNER to delete this workspace.",
        deleting: "Deleting...",
        role_info: {
          editor:
            "Can add, edit, and delete transactions. Cannot manage workspace members.",
          viewer:
            "Can only view workspace data. Cannot add or edit transactions.",
        },
        invitation_create_success_desc:
          "{{email}} has been invited with the {{role}} role.",
        actions: {
          create: "Create workspace",
          manageMembers: "Manage members",
          invitations: "Invitations",
        },
        management_title: "Workspace Management",
        management_description:
          "You can create workspaces, manage members, and track invitations.",
        active_workspace: "Active workspace",
        no_active_workspace: "No active workspace found.",
        create_workspace: "Create workspace",
        invite_member: "Invite member",
        members: "Workspace members",
        manage_members: "Manage members",
        sent_invitations: "Sent invitations",
        my_pending_invitations: "My pending invitations",
        owner_permission_required:
          "You cannot manage members or invitations because you are not the OWNER of this workspace.",
        members_description:
          "You can manage users and their roles in this workspace.",
        refresh: "Refresh",
        user: "User",
        email: "Email",
        role: "Role",
        action: "Action",
        remove: "Remove",

        members_loading: "Loading members...",
        members_empty: "No members found in this workspace.",
        members_fetch_failed: "Members could not be loaded.",
        members_fetch_failed_desc:
          "An error occurred while loading workspace members.",

        role_updated: "Role updated.",
        role_updated_desc:
          "The member's workspace role was updated successfully.",
        role_update_failed: "Role could not be updated.",
        role_update_failed_desc:
          "The OWNER role cannot be changed or you may not have permission.",

        remove_member_confirm:
          "Are you sure you want to remove this user from the workspace?",
        member_removed: "Member removed.",
        member_removed_desc: "The user was removed from the workspace.",
        member_remove_failed: "Member could not be removed.",
        member_remove_failed_desc:
          "The OWNER cannot be removed from the workspace or you may not have permission.",
        invitations_description:
          "You can track the invitations sent for this workspace and their current status.",
        invitations_loading: "Loading invitations...",
        invitations_empty:
          "No invitations have been created for this workspace yet.",
        invitations_fetch_failed: "Invitations could not be loaded.",
        invitations_fetch_failed_desc:
          "An error occurred while loading workspace invitations.",

        status: "Status",
        expires_at: "Expires At",

        invitation_status: {
          pending: "Pending",
          accepted: "Accepted",
          rejected: "Rejected",
          expired: "Expired",
        },
        workspace: "Workspace",
        accept: "Accept",
        reject: "Reject",

        pending_invitations_loading: "Loading invitations...",
        pending_invitations_empty: "You have no pending workspace invitations.",

        pending_invitations_fetch_failed: "Invitations could not be loaded.",
        pending_invitations_fetch_failed_desc:
          "An error occurred while loading pending workspace invitations.",

        invitation_accepted: "Invitation accepted.",
        invitation_accepted_desc: "Your workspace list has been updated.",

        invitation_accept_failed: "Invitation could not be accepted.",
        invitation_accept_failed_desc:
          "The invitation may have expired or become invalid.",

        invitation_rejected: "Invitation rejected.",
        invitation_rejected_desc:
          "The invitation has been removed from your pending list.",

        invitation_reject_failed: "Invitation could not be rejected.",
        invitation_reject_failed_desc:
          "The invitation may have expired or become invalid.",

        create: "Create",

        create_name_validation: "Workspace name must be at least 2 characters.",

        create_success: "Workspace created.",
        create_success_desc: "The new workspace was created successfully.",

        create_failed: "Workspace could not be created.",
        create_failed_desc: "Please check the information and try again.",
        invitation_email: "Email to invite",
        invitation_email_placeholder: "example@mail.com",
        invitation_email_validation: "Please enter a valid email address.",
        send_invitation: "Send Invitation",

        invitation_create_success: "Invitation sent successfully.",

        invitation_create_failed: "Invitation could not be sent.",
        invitation_create_failed_desc:
          "This user may already have a pending invitation or the operation failed.",

        remove_member_title: "Remove Member",
        remove_member_message:
          "Are you sure you want to remove this user from the workspace?",
        name_required: "Workspace name is required.",
        name_min_length: "Workspace name must be at least 2 characters.",
        name_max_length: "Workspace name can be at most 80 characters.",
        description_max_length: "Description can be at most 250 characters.",
        form_invalid: "Please check the workspace information.",
        page_title: "Your workspaces",
        page_description:
          "View your workspaces, switch the active workspace, manage members, and track invitation processes from one screen.",
        select_workspace_description:
          "Select the workspace you want to work with.",
        no_description: "No description available.",
        active_workspace_description:
          "Members, invitations, and workspace settings are managed in this area.",
        total_workspace: "Total workspaces",
        active_role: "Active role",
        management_permission: "Management permission",
        permission_available: "Available",
        permission_unavailable: "Unavailable",
        overview: "Overview",
        overview_ready_title: "Workspace panel is ready.",
        overview_no_workspace_title: "No workspace selected.",
        overview_no_workspace_description:
          "Select a workspace to view your role and available actions.",

        overview_owner_title: "You manage this workspace.",
        overview_owner_description:
          "As the owner, you can edit the workspace, manage members, send invitations, and delete non-default workspaces.",

        overview_editor_title: "You can work with transactions here.",
        overview_editor_description:
          "As an editor, you can add, update, and manage transactions in this workspace, but you cannot manage members or invitations.",

        overview_viewer_title: "You have read-only access.",
        overview_viewer_description:
          "As a viewer, you can only view workspace data. Member management and invitations are not available for your role.",
        overview_ready_description:
          "You can select a workspace from the left, create a new workspace, invite members, or view your pending invitations.",
      },
      filters: "Filters",
      newest_to_oldest: "Newest to oldest",
      oldest_to_newest: "Oldest to newest",
      last_7_days: "Last 7 days",
      last_30_days: "Last 30 days",
      search_placeholder: "Search...",
      sort_created_at: "Last Added",
      this_month: "This Month",
      nav: { features: "Features", how_it_works: "How It Works" },
      pagination: { previous: "Previous", next: "Next" },
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
      verifyEmail: {
        title: "Verify your email",
        description:
          "Before you start using your account, you need to enter the 6-digit verification code sent to your email address.",
        emailLabel: "Email sent to",
        inputLabel: "Verification Code",
        inputPlaceholder: "6-digit code",
        codeHint: "Code is valid for 5 minutes.",
        buttonVerify: "Verify",
        resendCode: "Resend code",
        resending: "Sending code...",
        alreadyVerified: "Already verified?",
        loginLink: "Login",
        badges: {
          verification: "Email Verification",
          required: "Verification Required",
        },
        errors: {
          email_required: "Email is required.",
          email_invalid: "Please enter a valid email address.",
          password_required: "Password is required.",
          password_min: "Password must be at least 6 characters.",
          emailNotFound: "Email information not found.",
          invalidCodeLength: "Please enter a 6-digit verification code.",
          wrongCode: "Verification code is incorrect or expired.",
          resendFailed: "Could not resend the code.",
          notRegistered:
            "You need to complete the registration process before coming to the verification screen.",
          general: "Something went wrong.",
          system: "A system error occurred.",
        },
        success: {
          verified: "Email address verified successfully.",
          codeSent: "New verification code has been sent.",
        },
        emptyState: {
          title: "Email information not found",
          backToRegister: "Back to register",
          backToLogin: "Already have an account? Login",
        },
      },
    },
  },
  tr: {
    translation: {
      no_active_workspace: "Aktif workspace bulunamadı.",
      dashboard_title: "Harcama Trendi",
      welcome_dashboard: "Hesabınıza Hoş Geldiniz",
      new_transaction: "Yeni İşlem",
      spending_breakdown: "Harcama Dağılımı",
      edit_transaction: "İşlem Güncelle",
      new_category: "Yeni Kategori",
      edit_category: "Kategori Güncelle",
      transactions_subtitle:
        "Gelir ve gider hareketlerini buradan yönetebilirsin.",
      server_errors: {
        USER_NOT_FOUND: "User not found.",
        INVALID_CREDENTIALS: "Invalid email or password.",
        EMAIL_NOT_VERIFIED: "Please verify your email address first.",
        USER_ALREADY_EXISTS: "This user already exists.",

        UNAUTHORIZED: "Unauthorized request.",
        FORBIDDEN: "Access denied.",
        NOT_FOUND: "Requested resource was not found.",
        INTERNAL_SERVER_ERROR: "A server error occurred.",
        VALIDATION_ERROR: "Invalid data was sent.",

        TOKEN_NOT_FOUND: "Token not found.",
        INVALID_OR_EXPIRED_TOKEN: "Invalid or expired token.",
        ACCESS_TOKEN_EXPIRED: "Your session has expired. Please log in again.",
        ACCESS_TOKEN_INVALID: "Your session information is invalid.",
        REFRESH_TOKEN_NOT_FOUND: "Refresh token not found.",
        REFRESH_TOKEN_INVALID: "Refresh token is invalid.",
        REFRESH_TOKEN_EXPIRED:
          "Refresh token has expired. Please log in again.",

        RATE_LIMIT_EXCEEDED: "Too many requests. Please wait a moment.",
        RATE_LIMIT_GENERAL: "Too many requests. Please wait a moment.",
        RATE_LIMIT_TOO_FAST:
          "You are acting too quickly. Please wait a moment.",
        RATE_LIMIT_EMAIL_RESEND:
          "Please wait 1 minute before requesting a new verification code.",
        RATE_LIMIT_REFRESH:
          "Too many session refresh attempts. Please try again later.",

        IDEMPOTENCY_KEY_REUSED:
          "This request has already been processed. Please use a new request key.",
        IDEMPOTENCY_KEY_CONFLICT:
          "This request key was used with different data. Please use a new request key.",

        WORKSPACE_NOT_FOUND: "Workspace not found.",
        WORKSPACE_ALREADY_EXISTS: "This workspace already exists.",
        WORKSPACE_ACCESS_DENIED:
          "You do not have permission for this workspace.",
        WORKSPACE_CREATE_FAILED: "Workspace could not be created.",
        DEFAULT_WORKSPACE_CREATE_FAILED:
          "Default workspace could not be created.",
        WORKSPACE_OWNER_MEMBER_CREATE_FAILED:
          "Workspace owner could not be added as a member.",

        WORKSPACE_MEMBER_NOT_FOUND: "Workspace member not found.",
        WORKSPACE_MEMBER_NOT_IN_WORKSPACE:
          "This member does not belong to the selected workspace.",
        WORKSPACE_MEMBER_ROLE_UPDATE_FAILED:
          "Member role could not be updated.",
        WORKSPACE_MEMBER_USER_NOT_FOUND:
          "The user linked to this member could not be found.",
        OWNER_ROLE_CANNOT_BE_CHANGED: "The OWNER role cannot be changed.",
        OWNER_CANNOT_BE_REMOVED:
          "The OWNER cannot be removed from the workspace.",
        CANNOT_REMOVE_YOURSELF_FROM_WORKSPACE:
          "You cannot remove yourself from the workspace.",

        WORKSPACE_INVITATION_USER_NOT_FOUND:
          "No user was found with this email address.",
        CANNOT_INVITE_YOURSELF: "You cannot invite yourself.",
        USER_ALREADY_WORKSPACE_MEMBER:
          "This user is already a workspace member.",
        WORKSPACE_INVITATION_ALREADY_PENDING:
          "There is already a pending invitation for this user.",
        WORKSPACE_INVITATION_NOT_FOUND: "Invitation not found.",
        WORKSPACE_INVITATION_NOT_VALID: "This invitation is no longer valid.",
        WORKSPACE_INVITATION_EXPIRED: "This invitation has expired.",
        WORKSPACE_INVITATION_NOT_OWNED_BY_USER:
          "This invitation does not belong to this user.",
        WORKSPACE_INVITATION_REJECT_FAILED: "Invitation could not be rejected.",
        WORKSPACE_INVITATION_WORKSPACE_NOT_FOUND:
          "The workspace linked to this invitation could not be found.",

        GOOGLE_ACCOUNT_PASSWORD_NOT_AVAILABLE:
          "This account was created with Google. Please set a password first.",
        PASSWORD_MISMATCH: "Your current password is incorrect.",
        PASSWORD_UPDATE_FAILED: "Password could not be updated.",
        PROFILE_UPDATE_FAILED: "Profile could not be updated.",
        AVATAR_UPDATE_FAILED: "Profile photo could not be updated.",

        TRANSACTION_CREATE_FAILED: "Transaction could not be created.",
        TRANSACTION_UPDATE_FAILED: "Transaction could not be updated.",
        TRANSACTION_DELETE_FAILED: "Transaction could not be deleted.",
        TRANSACTION_NOT_FOUND: "Transaction not found.",
        TRANSACTION_ALREADY_EXISTS: "Transaction already exists.",
        INVALID_TRANSACTION_CURRENCY: "Invalid transaction currency.",
        INVALID_TRANSACTION_DATE_RANGE: "Invalid date range.",

        EMAIL_ALREADY_VERIFIED: "Email address is already verified.",
        EMAIL_VERIFICATION_CODE_INVALID: "Verification code is invalid.",
        EMAIL_VERIFICATION_CODE_EXPIRED: "Verification code has expired.",
        EMAIL_VERIFICATION_TOO_MANY_ATTEMPTS:
          "Too many failed attempts. Please request a new code.",
        TOO_MANY_ATTEMPTS: "Too many failed attempts.",

        GOOGLE_LOGIN_FAILED: "Google login failed.",
        GOOGLE_SIGNUP_FAILED: "Google signup failed.",
        GOOGLE_ACCOUNT_IS_NOT_VERIFIED: "Google account is not verified.",
        GOOGLE_EMAIL_ACCOUNT_IS_NOT_VERIFIED:
          "Google email account is not verified.",
        GOOGLE_USER_ALREADY_EXISTS_EMAIL:
          "This email should be used with Google login.",
        GOOGLE_USER_NOT_FOUND: "Please sign up with Google first.",

        INVALID_IMAGE_FORMAT: "Only JPEG, PNG, or WEBP formats are supported.",
        AVATAR_REQUIRED: "Profile photo is required.",
      },
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
      description: "Açıklama",
      description_placeholder: "Açıklama yaz",
      weekly: "Haftalık",
      monthly: "Aylık",
      all: "Tümü",
      income: "Gelir",
      expense: "Gider",
      start_date: "Başlangıç Tarihi",
      end_date: "Bitiş Tarihi",
      reset: "Sıfırla",
      no_transactions: "Henüz bir işlem bulunamadı.",
      last_transactions: "Son İşlemler",
      last_transactions_description:
        "Son işlem hareketleri burada görüntülenebilir.",
      view_all: "Tümünü Görüntüle",
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
      nav: { features: "Özellikler", how_it_works: "Nasıl Çalışır?" },
      pagination: { previous: "Geri", next: "İleri" },
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
        too_many_requests: "Çok fazla istek",
        too_many_requests_desc:
          "Çok fazla istek yaptınız. Lütfen daha sonra tekrar deneyin.",
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
        active_workspace_not_found: "Aktif workspace bulunamadı",
        active_workspace_not_found_desc:
          "Bu işlemi yapmak için aktif bir workspace seçmelisiniz.",
      },
      created_by: "Oluşturan kişi",
      workspace_overview: "workspace genel bakışı",
      workspace: {
        edit: "Düzenle",
        name: "Workspace adı",
        save_changes: "Değişiklikleri kaydet",
        update_success: "Workspace başarıyla güncellendi",
        update_error: "Workspace güncelleme hatası",
        updating: "Güncelleniyor...",
        name_placeholder: "Workspace adını gir",
        description: "Workspace açıklaması",
        description_placeholder: "Workspace açıklamasını gir",
        save: "Kaydet",
        cancel: "İptal",
        leave: "Ayrıl",
        edit_workspace: "Workspace düzenle",
        workspaces: "Çalışma Alanları",
        loading: "Workspace yükleniyor...",
        empty: "Workspace bulunamadı",
        delete: "Sil",
        delete_workspace: "Workspace Sil",
        delete_workspace_confirm:
          "Bu workspace silinsin mi? Bu işlem geri alınamaz. Workspace'e ait işlemler, üyeler ve davetler de silinir.",
        delete_workspace_success: "Workspace başarıyla silindi.",
        delete_workspace_error: "Workspace silinirken bir hata oluştu.",
        default_workspace_cannot_be_deleted: "Varsayılan workspace silinemez.",
        only_owner_can_delete_workspace:
          "Workspace silmek için OWNER yetkisine sahip olmalısınız.",
        deleting: "Siliniyor...",
        roles: {
          owner: "Sahip",
          editor: "Editör",
          viewer: "Görüntüleyici",
        },
        role_info: {
          editor:
            "Transaction ekleyebilir, düzenleyebilir ve silebilir. Workspace üyelerini yönetemez.",
          viewer:
            "Sadece workspace verilerini görüntüleyebilir. Transaction ekleyemez veya düzenleyemez.",
        },

        actions: {
          create: "Workspace oluştur",
          manageMembers: "Üyeleri yönet",
          invitations: "Davetler",
        },
        management_title: "Workspace Yönetimi",
        management_description:
          "Workspace oluşturabilir, üyeleri yönetebilir ve davetleri takip edebilirsin.",
        active_workspace: "Aktif workspace",
        no_active_workspace: "Henüz aktif workspace bulunamadı.",
        create_workspace: "Workspace oluştur",
        invite_member: "Üye davet et",
        members: "Workspace üyeleri",
        manage_members: "Üyeleri yönet",
        sent_invitations: "Gönderilen davetler",
        my_pending_invitations: "Bana gelen davetler",
        owner_permission_required:
          "Bu workspace üzerinde OWNER olmadığın için üye ve davet yönetimi yapamazsın.",
        members_description:
          "Bu workspace içindeki kullanıcıları ve rollerini yönetebilirsin.",
        refresh: "Yenile",
        user: "Kullanıcı",
        email: "Email",
        role: "Rol",
        action: "İşlem",
        remove: "Çıkar",

        members_loading: "Üyeler yükleniyor...",
        members_empty: "Bu workspace içinde üye bulunamadı.",
        members_fetch_failed: "Üyeler getirilemedi.",
        members_fetch_failed_desc:
          "Workspace üyeleri yüklenirken bir hata oluştu.",

        role_updated: "Rol güncellendi.",
        role_updated_desc: "Üyenin workspace rolü başarıyla değiştirildi.",
        role_update_failed: "Rol güncellenemedi.",
        role_update_failed_desc:
          "OWNER rolü değiştirilemez veya işlem yetkin olmayabilir.",

        remove_member_confirm:
          "Bu kullanıcıyı workspace'ten çıkarmak istediğine emin misin?",
        member_removed: "Üye çıkarıldı.",
        member_removed_desc: "Kullanıcı workspace üyeliğinden kaldırıldı.",
        member_remove_failed: "Üye çıkarılamadı.",
        member_remove_failed_desc:
          "OWNER workspace'ten çıkarılamaz veya yetkin olmayabilir.",
        invitations_description:
          "Bu workspace için gönderilmiş davetleri ve durumlarını buradan takip edebilirsin.",
        invitations_loading: "Davetler yükleniyor...",
        invitations_empty: "Bu workspace için henüz davet oluşturulmamış.",
        invitations_fetch_failed: "Davetler getirilemedi.",
        invitations_fetch_failed_desc:
          "Workspace davetleri yüklenirken bir hata oluştu.",

        status: "Durum",
        expires_at: "Son Geçerlilik",

        invitation_status: {
          pending: "Bekliyor",
          accepted: "Kabul edildi",
          rejected: "Reddedildi",
          expired: "Süresi doldu",
        },
        workspace: "Workspace",
        accept: "Kabul Et",
        reject: "Reddet",

        pending_invitations_loading: "Davetler yükleniyor...",
        pending_invitations_empty: "Bekleyen workspace davetin yok.",

        pending_invitations_fetch_failed: "Davetler getirilemedi.",
        pending_invitations_fetch_failed_desc:
          "Bekleyen workspace davetleri yüklenirken bir hata oluştu.",

        invitation_accepted: "Davet kabul edildi.",
        invitation_accepted_desc: "Workspace listen güncellendi.",

        invitation_accept_failed: "Davet kabul edilemedi.",
        invitation_accept_failed_desc:
          "Davet süresi dolmuş veya geçersiz olabilir.",

        invitation_rejected: "Davet reddedildi.",
        invitation_rejected_desc: "Davet bekleyenler listesinden kaldırıldı.",

        invitation_reject_failed: "Davet reddedilemedi.",
        invitation_reject_failed_desc:
          "Davet süresi dolmuş veya geçersiz olabilir.",
        create: "Oluştur",

        create_name_validation: "Workspace adı en az 2 karakter olmalıdır.",

        create_success: "Workspace oluşturuldu.",
        create_success_desc: "Yeni workspace başarıyla oluşturuldu.",

        create_failed: "Workspace oluşturulamadı.",
        create_failed_desc: "Lütfen bilgileri kontrol edip tekrar deneyin.",

        invitation_email: "Davet edilecek email",
        invitation_email_placeholder: "ornek@mail.com",
        invitation_email_validation: "Geçerli bir email adresi giriniz.",

        send_invitation: "Davet Gönder",

        invitation_create_success: "Davet başarıyla gönderildi.",
        invitation_create_success_desc:
          "{{email}} kullanıcısına {{role}} rolüyle davet gönderildi.",

        invitation_create_failed: "Davet gönderilemedi.",
        invitation_create_failed_desc:
          "Bu kullanıcıya zaten bekleyen bir davet olabilir veya işlem başarısız oldu.",

        remove_member_title: "Üyeyi çıkar",
        remove_member_message:
          "adlı kullanıcıyı bu workspace'ten çıkarmak istediğine emin misin?",

        name_required: "Workspace adı zorunludur.",
        name_min_length: "Workspace adı en az 2 karakter olmalıdır.",
        name_max_length: "Workspace adı en fazla 80 karakter olabilir.",
        description_max_length: "Açıklama en fazla 250 karakter olabilir.",
        form_invalid: "Lütfen workspace bilgilerini kontrol edin.",
        page_title: "Çalışma alanların",
        page_description:
          "Workspace’leri görüntüle, aktif workspace’i değiştir, üyeleri yönet ve davet süreçlerini tek ekrandan kontrol et.",
        select_workspace_description:
          "Aktif olarak çalışmak istediğin alanı seç.",
        no_description: "Açıklama bulunmuyor.",
        active_workspace_description:
          "Bu alanda üyeler, davetler ve workspace ayarları yönetilir.",
        total_workspace: "Toplam Workspace",
        active_role: "Aktif Rol",
        management_permission: "Yönetim Yetkisi",
        permission_available: "Var",
        permission_unavailable: "Yok",
        overview: "Genel Bakış",
        overview_ready_title: "Workspace paneli hazır.",
        overview_no_workspace_title: "Seçili workspace yok.",
        overview_no_workspace_description:
          "Rolünü ve yapabileceğin işlemleri görmek için bir workspace seç.",

        overview_owner_title: "Bu workspace'i sen yönetiyorsun.",
        overview_owner_description:
          "Owner olarak workspace'i düzenleyebilir, üyeleri yönetebilir, davet gönderebilir ve varsayılan olmayan workspace'leri silebilirsin.",

        overview_editor_title: "Bu workspace içinde işlem yapabilirsin.",
        overview_editor_description:
          "Editor olarak bu workspace içinde gelir-gider işlemleri ekleyebilir ve düzenleyebilirsin. Ancak üye yönetimi ve davet işlemleri yapamazsın.",

        overview_viewer_title:
          "Bu workspace için sadece görüntüleme yetkin var.",
        overview_viewer_description:
          "Viewer olarak workspace verilerini görüntüleyebilirsin. Üye yönetimi ve davet işlemleri bu rol için kullanılamaz.",
        overview_ready_description:
          "Sol taraftan workspace seçebilir, üstteki butonlardan yeni workspace oluşturabilir, üye davet edebilir veya gelen davetlerini görüntüleyebilirsin.",
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
        firstName_min: "Ad en az 2 karakter olmalıdır.",
        lastName_min: "Soyad en az 2 karakter olmalıdır.",
      },
      verifyEmail: {
        title: "E-posta adresini doğrula",
        description:
          "Hesabını kullanmaya başlamadan önce e-posta adresine gönderilen 6 haneli doğrulama kodunu girmen gerekiyor.",
        emailLabel: "Kod gönderilen e-posta",
        inputLabel: "Doğrulama Kodu",
        inputPlaceholder: "6 haneli kod",
        codeHint: "Kod geçerlilik süresi 5 dakikadır.",
        buttonVerify: "Doğrula",
        resendCode: "Kodu tekrar gönder",
        resending: "Kod gönderiliyor...",
        alreadyVerified: "Hesabın zaten doğrulandı mı?",
        loginLink: "Giriş yap",
        badges: {
          verification: "E-posta Doğrulama",
          required: "Doğrulama Gerekli",
        },

        success: {
          verified: "E-posta adresi başarıyla doğrulandı.",
          codeSent: "Yeni doğrulama kodu gönderildi.",
        },
        emptyState: {
          title: "E-posta bilgisi bulunamadı",
          backToRegister: "Kayıt sayfasına dön",
          backToLogin: "Zaten hesabın var mı? Giriş yap",
        },
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
