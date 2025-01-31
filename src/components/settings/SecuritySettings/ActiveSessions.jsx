const sessions = [
    {
      deviceName: "Chrome on Windows",
      location: "City, Country",
      status: "Active",
      lastActive: "5 minutes ago",
      ipAddress: "190.213.161.20",
      teams: ["Design", "Product", "Marketing"],
    },
    {
      deviceName: "Safari on Mac",
      location: "City, Country",
      status: "Active",
      lastActive: "Yesterday at 3:15 PM",
      ipAddress: "123.152.99.118",
      teams: ["Design", "Product", "Marketing"],
    },
    // Add more sessions as needed
  ]
  
  const ActiveSessions = () => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Device Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Address
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teams</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sessions.map((session, index) => (
              <tr key={index}>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{session.deviceName}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{session.location}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {session.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{session.lastActive}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{session.ipAddress}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    {session.teams.slice(0, 3).map((team, i) => (
                      <span key={i} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                        {team}
                      </span>
                    ))}
                    {session.teams.length > 3 && (
                      <span className="text-xs text-gray-500">+{session.teams.length - 3}</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  
  export default ActiveSessions
  
  