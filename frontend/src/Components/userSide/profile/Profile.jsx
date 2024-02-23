import NavBar from "../NavBar"
import ProfilePhoto from "./ProfilePhoto"
import ProfileSection from "./ProfileSection"

const Profile = () => {
  return (
    <>
    <NavBar/>
    <div className="flex items-center justify-center my-10 mx-10">
      <div className="bg-thirdShade rounded-lg shadow-md p-6 flex flex-col md:flex-row md:space-x-6 items-center">
        <div className="flex-shrink-0 mb-4 md:mb-0">
          <ProfilePhoto />
        </div>
        <div>
          <ProfileSection />
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile
