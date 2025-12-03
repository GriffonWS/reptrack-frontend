import React, { useState, useEffect } from 'react';
import { FiUsers, FiActivity } from 'react-icons/fi';
import './Overview.css';
import { getAllUsers } from '../../../services/user/userService';
import { getAllEquipments } from '../../../services/equipment/equipmentService';
import Loader from '../../../components/Loader/Loader';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Overview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [membersData, setMembersData] = useState([
    { label: 'Total Members', value: 0 },
    { label: 'Active Members', value: 0 },
    { label: 'Inactive Members', value: 0 }
  ]);

  const [equipmentsData, setEquipmentsData] = useState([
    { label: 'Aerobic Equipments', value: 0 },
    { label: 'Machine Equipments', value: 0 },
    { label: 'Free Weight Equipments', value: 0 }
  ]);

  const [memberChartData, setMemberChartData] = useState([]);
  const [equipmentChartData, setEquipmentChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError('');

      // Fetch both users and equipment in parallel
      const [usersResponse, equipmentResponse] = await Promise.all([
        getAllUsers(0, 1000),
        getAllEquipments()
      ]);

      // Process Users Data
      if (usersResponse.success && usersResponse.data) {
        const users = usersResponse.data.content || [];
        const totalMembers = users.length;
        const activeMembers = users.filter(user => user.active === true).length;
        const inactiveMembers = users.filter(user => user.active === false).length;

        setMembersData([
          { label: 'Total Members', value: totalMembers },
          { label: 'Active Members', value: activeMembers },
          { label: 'Inactive Members', value: inactiveMembers }
        ]);

        // Generate member chart data - group by month
        const membersByMonth = generateTimeSeriesData(users, 'dateOfJoining');
        setMemberChartData(membersByMonth);
      }

      // Process Equipment Data
      if (equipmentResponse.success && equipmentResponse.data) {
        const equipments = equipmentResponse.data || [];
        const aerobic = equipments.filter(eq => eq.category === 'Aerobic').length;
        const machine = equipments.filter(eq => eq.category === 'Machine').length;
        const freeWeight = equipments.filter(eq => eq.category === 'Free Weight').length;

        setEquipmentsData([
          { label: 'Aerobic Equipments', value: aerobic },
          { label: 'Machine Equipments', value: machine },
          { label: 'Free Weight Equipments', value: freeWeight }
        ]);

        // Generate equipment chart data - group by month
        const equipmentsByMonth = generateTimeSeriesData(equipments, 'timestamp');
        setEquipmentChartData(equipmentsByMonth);
      }

    } catch (err) {
      setError(err.message || 'Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateTimeSeriesData = (items, dateField) => {
    // Group items by month
    const monthMap = {};

    items.forEach(item => {
      const date = new Date(item[dateField]);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!monthMap[monthYear]) {
        monthMap[monthYear] = 0;
      }
      monthMap[monthYear]++;
    });

    // Convert to array and calculate cumulative count
    const sortedMonths = Object.keys(monthMap).sort();
    let cumulative = 0;

    return sortedMonths.map(month => {
      cumulative += monthMap[month];
      const [year, monthNum] = month.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      return {
        month: `${monthNames[parseInt(monthNum) - 1]} ${year}`,
        count: cumulative
      };
    });
  };

  const StatCard = ({ data, index }) => {
    return (
      <div className="overview__stat-item" style={{ animationDelay: `${index * 0.1}s` }}>
        <div className="overview__stat-value">{data.value}</div>
        <div className="overview__stat-label">{data.label}</div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="overview__wrapper">
        <Loader />
      </div>
    );
  }

  return (
    <div className="overview__wrapper">
      <div className="overview__container">
        {/* Header */}
        <div className="overview__header">
          <h1 className="overview__title">Dashboards</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="overview__error" style={{
            padding: '12px 16px',
            marginBottom: '20px',
            backgroundColor: '#fff5f5',
            color: '#c53030',
            border: '1px solid #fc8181',
            borderRadius: '8px'
          }}>
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="overview__grid">
          {/* Members Card */}
          <div className="overview__card">
            <h2 className="overview__card-title">Members</h2>
            <div className="overview__stats-container">
              {membersData.map((item, index) => (
                <StatCard key={index} data={item} index={index} />
              ))}
            </div>
          </div>

          {/* Equipments Card */}
          <div className="overview__card">
            <h2 className="overview__card-title">Equipments</h2>
            <div className="overview__stats-container">
              {equipmentsData.map((item, index) => (
                <StatCard key={index} data={item} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="overview__charts">
          {/* Members Growth Chart */}
          {memberChartData.length > 0 && (
            <div className="overview__chart-card">
              <h2 className="overview__card-title">Members Growth Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={memberChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '10px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3498db"
                    strokeWidth={2}
                    dot={{ fill: '#3498db', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Total Members"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Equipment Growth Chart */}
          {equipmentChartData.length > 0 && (
            <div className="overview__chart-card">
              <h2 className="overview__card-title">Equipment Growth Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={equipmentChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '10px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#2ecc71"
                    strokeWidth={2}
                    dot={{ fill: '#2ecc71', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Total Equipment"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>


    </div>
  );
};

export default Overview;