import { useEffect, useState } from "react";
import { Axios } from '../../axios/adminInstance.js'
import { IoSearch } from "react-icons/io5";
import ReportModal from "../../modal/adminModal/ReportModal.jsx";

const ReportManagementTable = () => {
    const [reports, setReports] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showReportModal, setShowReportModal] = useState(false)
    const [reportedPost, setReportedPost] = useState('')
    const [currentReportId, setCurrentReportId] = useState('')

    const handleViewReport = async (reportId) => {
        try {
            const response = await Axios.get(`/api/getReportData/${reportId}`);
            setReportedPost(response.data.post);
            setCurrentReportId(reportId)
            setShowReportModal(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseReportModal = (e) => {
        setShowReportModal(false)
        setCurrentReportId('')
    }


    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        Axios.get('/api/getReports')
            .then((response) => {
                const allReports = response.data;
                if (value.trim() === "") {
                    setReports(allReports);
                } else {
                    const filteredReports = allReports.filter(report =>
                        report?.user?.name.toLowerCase().includes(value.toLowerCase())
                    );
                    setReports(filteredReports);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        Axios.get('/api/getReports')
            .then((response) => {
                setReports(response.data);

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div className="bg-gray-300 p-4 rounded-md mx-10 my-10">
                <div className='flex justify-center mb-4'>
                    <div className="flex items-center rounded-md bg-gray-100 shadow-sm sm:px-2 sm:py-1" style={{ width: '50%' }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="flex-grow outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md px-2 py-1"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <div className="ml-1 p-1 rounded-md hover:bg-gray-200 focus:outline-none sm:h-8 sm:w-8" style={{ height: '24px' }}>
                            <IoSearch size={16} className="text-gray-500" />
                        </div>
                    </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="tableHeading">
                                PostedBy
                            </th>
                            <th className="tableHeading">
                                Remark
                            </th>
                            <th className="tableHeading">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {reports.map((report, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="text-sm font-protest text-gray-900">{report?.user?.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="text-sm text-gray-900 font-protest">{report?.message}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <button
                                        onClick={() => handleViewReport(report?._id)}
                                        className="px-2 py-1 bg-primary hover:bg-secondary text-white text-sm font-protest rounded-md focus:outline-none"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showReportModal && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className=" rounded-lg shadow-md">
                    <ReportModal isOpen={showReportModal} post={reportedPost} onClose={handleCloseReportModal} reportId={currentReportId} />
                </div>
            </div>}
        </>
    );
};

export default ReportManagementTable;
