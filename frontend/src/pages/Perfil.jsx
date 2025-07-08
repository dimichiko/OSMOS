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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
              Mi Perfil
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <div className="mt-1 p-3 bg-gray-50 border border-gray-300 rounded-md">
                  <span className="text-gray-900">{user.nombre}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 p-3 bg-gray-50 border border-gray-300 rounded-md">
                  <span className="text-gray-900">{user.email}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rol
                </label>
                <div className="mt-1 p-3 bg-gray-50 border border-gray-300 rounded-md">
                  <span className="text-gray-900 capitalize">{user.role || 'usuario'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil; 