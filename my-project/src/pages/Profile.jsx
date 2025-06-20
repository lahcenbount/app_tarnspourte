import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Mon profil</h2>
      <div><b>Nom :</b> {user.nom}</div>
      <div><b>Prénom :</b> {user.prenom}</div>
      <div><b>Email :</b> {user.email}</div>
      <div><b>Rôle :</b> {user.role}</div>
    </div>
  );
}