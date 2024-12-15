import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const CVPage = () => {
  const cvRef = useRef(null);

  const handleDownload = async () => {
    if (cvRef.current) {
      const canvas = await html2canvas(cvRef.current);
      const link = document.createElement('a');
      link.download = 'CV.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* Bouton Télécharger */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded shadow-lg hover:from-blue-600 hover:to-blue-700"
        >
          Télécharger le CV en Image
        </button>
      </div>

      {/* CV Content */}
      <div
        className="p-6 bg-white border-4 border-blue-500 rounded-lg shadow-xl"
        ref={cvRef}
      >
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-blue-400 shadow-md">
            <img
              src="src/assets/test.PNG"
              alt="Profil"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-blue-600 mt-4">John Doe</h1>
          <p className="text-gray-700">Développeur Full Stack</p>
          <p className="text-gray-700">johndoe@example.com | +123 456 789</p>
        </div>

        {/* Divider */}
        <hr className="border-blue-300 mb-6" />

        {/* Description Section */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Passionné par le développement web, je suis spécialisé dans la
            création d'applications modernes et performantes. Mon expertise
            repose sur une solide compréhension des technologies frontend et
            backend.
          </p>
        </div>

        {/* Divider */}
        <hr className="border-blue-300 mb-6" />

        {/* Experience Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-500 text-center mb-4">
            Expériences
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded shadow-sm">
              <h3 className="text-lg font-bold text-gray-800">
                Développeur Web
              </h3>
              <p className="text-sm text-gray-600">2020 - Présent</p>
              <p className="text-gray-700 mt-2">
                Entreprise XYZ - Développement d'applications web modernes avec
                React et Node.js.
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow-sm">
              <h3 className="text-lg font-bold text-gray-800">
                Stagiaire Développement
              </h3>
              <p className="text-sm text-gray-600">2018 - 2019</p>
              <p className="text-gray-700 mt-2">
                Startup ABC - Assistance au développement de fonctionnalités
                backend et frontend.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-blue-300 mb-6" />

        {/* Education Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-500 text-center mb-4">
            Formation
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded shadow-sm">
              <h3 className="text-lg font-bold text-gray-800">
                Master Informatique
              </h3>
              <p className="text-sm text-gray-600">2016 - 2018</p>
              <p className="text-gray-700 mt-2">Université Paris-Saclay</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow-sm">
              <h3 className="text-lg font-bold text-gray-800">
                Licence Informatique
              </h3>
              <p className="text-sm text-gray-600">2013 - 2016</p>
              <p className="text-gray-700 mt-2">Université Lyon 1</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-blue-300 mb-6" />

        {/* Skills Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-500 text-center mb-4">
            Compétences
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded shadow-sm">
              <h3 className="font-bold text-gray-800">Langages</h3>
              <p className="text-gray-700">JavaScript, Python, Java</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow-sm">
              <h3 className="font-bold text-gray-800">Frameworks</h3>
              <p className="text-gray-700">React, Node.js, Django</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow-sm">
              <h3 className="font-bold text-gray-800">Outils</h3>
              <p className="text-gray-700">Git, Docker, Webpack</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-blue-300 mb-6" />

        {/* Languages Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-500 text-center mb-4">
            Langues
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded shadow-sm">
              <h3 className="font-bold text-gray-800">Français</h3>
              <p className="text-gray-700">Courant</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow-sm">
              <h3 className="font-bold text-gray-800">Anglais</h3>
              <p className="text-gray-700">Professionnel</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-blue-300 mb-6" />

        {/* Interests Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-500 text-center mb-4">
            Centres d'intérêt
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Développement web</li>
            <li>Voyages</li>
            <li>Lecture</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CVPage;
