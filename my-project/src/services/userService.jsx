export async function getProfile(token) {
    const res = await fetch("/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Non authentifié");
    return res.json();
  }