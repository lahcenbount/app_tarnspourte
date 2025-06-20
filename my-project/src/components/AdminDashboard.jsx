import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const AdminDashboard = () => {
  const statsData = {
    users: 1240,
    activeUsers: 890,
    trips: 560,
    acceptanceRate: 78.4
  };

  const chartData = {
    labels: ['Utilisateurs', 'Utilisateurs actifs', 'Trajets', 'Taux d\'acceptation'],
    datasets: [
      {
        label: 'Statistiques',
        data: [statsData.users, statsData.activeUsers, statsData.trips, statsData.acceptanceRate],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Administration</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Utilisateurs" value={statsData.users} />
        <StatCard title="Utilisateurs actifs" value={statsData.activeUsers} />
        <StatCard title="Trajets publiés" value={statsData.trips} />
        <StatCard title="Taux d'acceptation" value={`${statsData.acceptanceRate}%`} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <Bar 
          data={chartData} 
          options={{ responsive: true }} 
          height={400}
        />
      </div>

      {/* Gestion des utilisateurs et annonces... */}
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default AdminDashboard;