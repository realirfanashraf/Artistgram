

const EventManagementTable = () => {
  return (
    <>
    <div className="bg-gray-300 p-4 rounded-md mx-10 my-10">
    <table className="min-w-full divide-y divide-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="tableHeading">
                                Event Name
                            </th>
                            <th className="tableHeading">
                                Event Date
                            </th>
                            <th className="tableHeading">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="text-sm font-protest text-gray-900">asdfas</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="text-sm text-gray-900 font-protest">khand</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <button
                                        // onClick={() => handleViewReport(report?._id)}
                                        className="px-2 py-1 bg-primary hover:bg-secondary text-white text-sm font-protest rounded-md focus:outline-none"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        
                    </tbody>
                </table>

    </div>
    </>
  )
}

export default EventManagementTable