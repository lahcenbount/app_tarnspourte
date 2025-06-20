import { useState, useEffect } from "react";
import { getDemandes } from "../services/demandeService";
import { useAuth } from "../context/AuthContext";

export default function Demandes() {
  const [demandes, setDemandes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;  // إذا لم يكن هناك مستخدم، لا تفعل شيء
    // نفترض أن token موجود في user.token أو user.accessToken حسب التطبيق
    const token = user.token || user.accessToken || localStorage.getItem("token");
    
    getDemandes(token)
      .then(setDemandes)
      .catch(err => {
        console.error("Erreur lors de la récupération des demandes:", err);
      });
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl mb-4">Mes demandes</h1>
      <ul>
        {demandes.map(d => (
          <li key={d._id} className="mb-4 p-4 border rounded bg-white">
            <div className="font-bold">{d.annonce?.titre}</div>
            <div>{d.annonce?.description}</div>
            <div className="text-sm text-gray-600">Statut : {d.statut}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
