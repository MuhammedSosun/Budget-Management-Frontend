import "./Profile.scss";
import { useProfile } from "../../hooks/useProfile";
import ProfileHero from "../../components/Profile/ProfileHero";
import ProfileInfoCard from "../../components/Profile/ProfileInfoCard";
import ProfileSecurityCard from "../../components/Profile/ProfileSecurityCard";
import WorkspaceSettings from "../../components/workspace/WorkspaceSettings/WorkspaceSettings";

function Profile() {
  const profile = useProfile();

  if (!profile.user) {
    return null;
  }

  return (
    <section className="profile">
      <div className="profile__layout">
        <div className="profile__main">
          <ProfileHero
            fullName={profile.fullName}
            email={profile.user.email}
            avatarSrc={profile.avatarSrc}
            fileInputRef={profile.fileInputRef}
            isAvatarUploading={profile.isAvatarUploading}
            onAvatarButtonClick={profile.handleAvatarButtonClick}
            onAvatarChange={profile.handleAvatarChange}
          />

          <ProfileInfoCard
            user={profile.user}
            isEditing={profile.isEditing}
            isProfileSaving={profile.isProfileSaving}
            firstName={profile.firstName}
            lastName={profile.lastName}
            onFirstNameChange={profile.setFirstName}
            onLastNameChange={profile.setLastName}
            onEdit={() => profile.setIsEditing(true)}
            onCancel={profile.handleProfileCancel}
            onSave={profile.handleProfileSave}
          />
        </div>

        <aside className="profile__side">
          <ProfileSecurityCard />
          <WorkspaceSettings />
        </aside>
      </div>
    </section>
  );
}

export default Profile;
