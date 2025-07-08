import { useAuth } from '../contexts/AuthContext.jsx';

const Perfil = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cargando perfil...</h2>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center">
        {/* Avatar */}
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center mb-6 shadow-lg">
          <span className="text-5xl text-white font-bold select-none">
            {user.nombre ? user.nombre[0].toUpperCase() : user.name[0].toUpperCase()}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-blue-900 mb-2">Mi Perfil</h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">Gestiona tu información personal y revisa tus datos de cuenta.</p>
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="w-32 font-semibold text-gray-700">Nombre:</span>
            <span className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900">{user.nombre || user.name}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="w-32 font-semibold text-gray-700">Email:</span>
            <span className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900">{user.email || user.correo || user.mail || 'No disponible'}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="w-32 font-semibold text-gray-700">Rol:</span>
            <span className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 capitalize">{user.role || 'usuario'}</span>
          </div>
        </div>
        <div className="mt-10 w-full flex flex-col items-center">
          <button className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold px-8 py-3 rounded-full shadow hover:from-blue-700 hover:to-indigo-800 transition text-lg">Editar Perfil</button>
        </div>
      </div>
    </main>
  );
};

export default Perfil; 