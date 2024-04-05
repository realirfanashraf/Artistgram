import { useEffect, useState } from 'react'
import NavBar from '../../Components/userSide/NavBar'
import { Axios } from '../../axios/userInstance.js'
import { useParams,useNavigate } from 'react-router-dom';

const RemoteUserProfile = () => {
    const navigate = useNavigate()
    const { userId } = useParams();
    const [remoteUserData, setRemoteUserData] = useState('')
    const [posts, setPosts] = useState('')
    useEffect(() => {
        const getUserDetails = async (userId) => {
            try {
                const response = await Axios.get(`/api/remoteUserDetails/${userId}`);
                if (response.status === 200) {
                    setRemoteUserData(response.data.userData);
                    setPosts(response.data.postsData)

                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        getUserDetails(userId);
    }, [userId]);

    const handleMessageClick = () => {
        navigate('/inbox', { state: { data: remoteUserData } });
    }

    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center justify-center my-8 sm:mx-28 mx-4">
                <div className="bg-thirdShade rounded-lg shadow-md p-6 relative">
                    <div className="absolute top-0 right-0 mt-4 mr-4">
                    </div>
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="flex-shrink-0 mb-4 md:mb-0">
                            <div className="relative inline-block">
                                <img
                                    src={remoteUserData?.ProfilePicture}
                                    alt="Profile"
                                    className="rounded-full w-32 h-32 object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <div>
                                <div className="p-4 sm:p-6 rounded-lg">
                                    <div className="mb-2 sm:mb-4">
                                        <h2 className="text-xl sm:text-2xl font-protest">{remoteUserData?.name}</h2>
                                        <p className="text-sm sm:text-base text-gray-600 font-protest">{remoteUserData?.bio}</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-between mb-2 sm:mb-4">
                                        <div className="text-gray-600 font-protest ml-3">
                                            <button className="mr-2 rounded-lg border bg-primary hover:bg-secondary text-white py-1 px-2" onClick={()=>{handleMessageClick(remoteUserData._id)}}>Message</button>
                                        </div>
                                        <div className="text-gray-600 font-protest">{remoteUserData?.location}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-primary w-full h-8 block">
                        <p className="text-center font-protest text-white p-1">Gallery</p>
                    </div>
                    {posts?.length > 0 ? (
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {posts?.map((post) => (
                                <div key={post?._id} className="relative">
                                    <div className="bg-thirdShade rounded-lg shadow-md overflow-hidden" style={{ width: '250px', height: '200px' }}> {/* Set fixed dimensions */}
                                        <img src={post?.image} alt="" className="w-full h-full object-cover" />

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No posts</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default RemoteUserProfile